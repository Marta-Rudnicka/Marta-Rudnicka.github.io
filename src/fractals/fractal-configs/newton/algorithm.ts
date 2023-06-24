import { Complex, PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";
import { convertKernelToImgData, getComplexPartsForPixels, getMultiplier } from "../../gpu-utils";
import { parse, simplify } from "mathjs";
import { Solution, Solutions } from "../../../types-algebrite";
import { c, cByC, lengthNumArray, plusZero, pow2, pow3, pow4, pow5, rp, rxC, sum2Complex } from "./maths-helpers";
import { findNewtonAttractorTestable, newtonIterationTestable, findIndexOfAttractor } from "./duplicates";
import { compareToAttractors, evaluateDerivative, evaluatePolynomial, solve } from "./newton-algorithm";
const Algebrite = require('algebrite');

export type FunctionCallback = (x: Complex) => Complex;
export type NewtonInputs = {
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number, 
}

function getNewtonColour(i: number): PixelValue {
  if (i ===0 ) return [0, 250, 0, 255];
  if (i ===1 ) return [250, 0, 0, 255];
  if (i === 2) return [0, 0, 250, 255];
  if (i === 3) return [250, 250, 0, 255];
  if (i === 4) return [250, 0, 250, 255];
  return [0, 0, 0, 0]
};

function checkTestAreValid(kernelFunction: string, duplicate: string): void {
  if(kernelFunction !== duplicate.replaceAll('Testable', '')) {
    throw new Error(`${kernelFunction} out of sync with the unit tests`);
  }
}

export function getKernel(
  size: number,
  xReal: number,
  xImaginary: number,
  evaluate: FunctionCallback,
  getDerivative: FunctionCallback,
): IKernelRunShortcut {
  const gpu = new GPU();
  gpu.addFunction(lengthNumArray);
  gpu.addFunction(getComplexPartsForPixels);
  gpu.addFunction(evaluate);
  gpu.addFunction(getDerivative);
  gpu.addFunction(compareToAttractors);
  gpu.addFunction(getNewtonColour);
  gpu.addFunction(getMultiplier);
  gpu.addFunction(sum2Complex);
  gpu.addFunction(findIndexOfAttractor);
  gpu.addFunction(newtonIterationTestable);
  gpu.addFunction(compareToAttractors);
  gpu.addFunction(findNewtonAttractorTestable);
  gpu.addFunction(evaluatePolynomial);
  gpu.addFunction(evaluateDerivative);
  gpu.addFunction(rxC);
  gpu.addFunction(cByC);
  gpu.addFunction(pow2);
  gpu.addFunction(pow3);
  gpu.addFunction(pow4);
  gpu.addFunction(pow5);
  gpu.addFunction(plusZero);
  gpu.addFunction(c);
  gpu.addFunction(rp);

  const kernel = gpu.createKernel(function (
    startValueX: number,
    startValueY: number,
    inc: number,
    xReal: number,
    xImaginary: number,
    attractors: Complex[],
    constant: number,
    co1: number,
    co2: number,
    co3: number,
    co4: number,
    co5: number
  ) {
    const values = getComplexPartsForPixels(
      this.thread.x,
      this.thread.y,
      startValueX,
      startValueY,
      inc
    );

    // function newtonIteration(
    //   // evaluate: FunctionCallback, 
    //   // getDerivative: FunctionCallback, 
    //   val: Complex
    // ): Complex {
    //   // const num = evaluate(val);
    //   // const den = getDerivative(val);
    //   // const div = rxC(-1, cByC(num, den));
    //   console.log('val:', val)
    //   // const res = sumComplex([[1, 2], div]);
    //   // return [rp(real, 4), rp(imaginary, 4)];
    //   return [666, 666]
    // }

    // newtonIteration([3, 0])

    // function findNewtonAttractor(
    //   attractors: Complex[],
    //   input: Complex,
    //   evaluate: FunctionCallback,
    //   getDerivative: FunctionCallback
    // ): number {

    //   const res = newtonRecursion(attractors, input, evaluate, getDerivative, -1)
    //   return res;
    // }

    // function newtonRecursion(
    //   attractors: Complex[],
    //   input: Complex,
    //   evaluate: FunctionCallback,
    //   getDerivative: FunctionCallback,
    //   index: number
    // ): number {
    //   if (index !== -1) {
    //     return index;
    //   }
    //   let val = input;
    //   val = newtonIteration(evaluate, getDerivative, val);
    //   index = compareToAttractors(val, attractors);
    //   return newtonRecursion(attractors, val, evaluate, getDerivative, index);
    // }

    // checkTestAreValid(newtonIteration.toString(), newtonIterationTestable.toString());
    // checkTestAreValid(newtonRecursion.toString(), newtonRecursionTestable.toString());
    // checkTestAreValid(findNewtonAttractor.toString(), findNewtonAttractorTestable.toString());


    const index = findNewtonAttractorTestable(
      // attractors,
      values,
      constant,
      co1,
      co2,
      co3,
      co4,
      co5
    );

    const res = getNewtonColour(index);
    return res;
  }).setOutput([size, size]);
  return kernel;
}

function placeholderCallback(input: Complex): Complex {
  return input;
}

const placeholderInput = {
    constant: 0,
    co1: 0,
    co2: 0,
    co3: 0,
    co4: 0,
    co5: 1, 
}

export function createImageData(
  size: number,
  startValue: Complex,
  range: number,
  xReal: number,
  xImaginary: number,
  polnoymialFunction?: FunctionCallback,
  polynomialDerivative?: FunctionCallback,
  input?: NewtonInputs,
) {
  // to make TypeScript happy
  const poly = polnoymialFunction || placeholderCallback;
  const der = polynomialDerivative || placeholderCallback;
  const i = input || placeholderInput;
  const spreadInput = [i.constant, i.co1, i.co2, i.co3, i.co4, i.co5];
  const inc = range / size;
  const startReal = startValue[0];
  const startImaginary = startValue[1];
  const kernel = getKernel(size, xReal, xImaginary, poly, der);
  const polynomialString = `${i.co5}x^5+${i.co4}x^4+${i.co3}x^3+${i.co2}x^2+${i.co1}x+${i.constant}`;
  console.log({polynomialString})
  const attractors = solve(polynomialString);
  const kernelDump = kernel(
    startValue[0],
    startValue[1],
    inc,
    1,
    2,
    attractors,
    ...spreadInput) as number[][][];
  // const kernelDump = [[[0,0,0,0]]]
  return convertKernelToImgData(kernelDump, size)
}
