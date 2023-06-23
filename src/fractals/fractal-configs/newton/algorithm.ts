import { Complex, PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";
import { convertKernelToImgData, distanceSq, getColor, getComplexPartsForPixels, getMultiplier, xSqrPlusY } from "../../gpu-utils";
import { parse, simplify } from "mathjs";
import { Solution, Solutions } from "../../../types-algebrite";
import { c, cByC, pow2, pow3, pow4, pow5, rp, rxC, sumComplex } from "./maths-helpers";
const Algebrite = require('algebrite');

export function processPixel(
  x: number[],
  iterations: number,
  cReal: number,
  cImaginary: number,
): PixelValue {

  let val = xSqrPlusY(x, [cReal, cImaginary]);
  for (let i = 0; i <= iterations; i++) {
    val = xSqrPlusY(val, [cReal, cImaginary])
    const cr = distanceSq(val, x);
    if (cr > 4) {
      return getColor(i);
    }
  }
  return [255, 255, 255, 255];
}

export function getKernel(
  size: number,
  xReal: number,
  xImaginary: number,
  ): IKernelRunShortcut {
  const gpu = new GPU();

  gpu.addFunction(getComplexPartsForPixels);
  gpu.addFunction(xSqrPlusY);
  gpu.addFunction(processPixel);
  gpu.addFunction(distanceSq);
  gpu.addFunction(getColor);
  gpu.addFunction(getMultiplier);

  const kernel = gpu.createKernel(function (
    startValueX: number,
    startValueY: number,
    inc: number,
    xReal: number,
    xImaginary: number,
  ) {
    const values = getComplexPartsForPixels(
      this.thread.x,
      this.thread.y,
      startValueX,
      startValueY,
      inc);

    const res = processPixel(values, 200, xReal, xImaginary)
    return res;
  }).setOutput([size, size]);
  return kernel;
}

export function createImageData(
  size: number,
  // startValue: Complex,
  // range: number,
  // xReal: number,
  // xImaginary: number,
) {
  // const inc = range / size;
  // const startReal = startValue.re;
  // const startImaginary = startValue.im;
  // const kernel = getKernel(size, xReal, xImaginary);
  const kernelDump = [[[100, 100, 100, 100]]];
  return convertKernelToImgData(kernelDump, size)
}

export function removeZeroMultipliers(polynomial: string): string {
  const f = parse(polynomial);
  return simplify(f).toString();
}

type FunctionCallback = (x: Complex) => Complex;

export function getDerivativeAsCallback(
  co1: number, 
  co2: number, 
  co3: number, 
  co4: number, 
  co5: number, 
): FunctionCallback {

  // the obvious return vaue would be '(x) => d.evaluate({ 'x': x }) but this would not work on GPUjs'
//  console.dir(d, {depth:10})
  return (x: Complex) => {
    const deg2 = rxC(2 * co2, x);
    const deg3 = rxC(3 * co3, pow2(x));
    const deg4 = rxC(4 * co4, pow3(x));
    const deg5 = rxC(5 * co5, pow4(x));

    // return 4* co4*Math.pow(x, 3) + 5*co5*Math.pow(x, 4);
    return sumComplex([
      c(co1),
      deg2,
      deg3,
      deg4,
      deg5
    ])
  };
}

export function getPolyFunction(
  constant: number,
  co1: number, 
  co2: number, 
  co3: number, 
  co4: number, 
  co5: number, 
): FunctionCallback {

  // the obvious return vaue would be '(x) => d.evaluate({ 'x': x }) but this would not work on GPUjs'
//  console.dir(d, {depth:10})

  return (x: Complex) => {
    const deg1 = rxC(co1, x);
    const deg2 = rxC(co2, pow2(x));
    const deg3 = rxC(co3, pow3(x));
    const deg4 = rxC(co4, pow4(x));
    const deg5 = rxC(co5, pow5(x));

    return sumComplex([
      c(constant),
      deg1,
      deg2,
      deg3,
      deg4,
      deg5
    ])
  };
}

export function parseSolution(solutionObject: Solution ): Complex {
  // real
  if (solutionObject.d) {
    return [ parseFloat(solutionObject.d.toPrecision(4)), 0];
  }
  //complex
  if (solutionObject.cons.cdr.cons.cdr?.cons?.car?.cons?.cdr?.cons?.car?.d) {
    const solutions = solutionObject.cons.cdr.cons;
    const real = solutions.car.d;
    const imaginary = solutions.cdr.cons.car.cons.cdr.cons.car.d;
    return [parseFloat(real.toPrecision(4)), parseFloat(imaginary.toPrecision(4))];
  }
  //imaginary
  const imaginary = solutionObject.cons.cdr.cons.car.d
  return [0, parseFloat(imaginary.toPrecision(4))]; 
}

export function solve(equation: string): Complex[] {
  const eq = Algebrite.run(equation)
  const sol: Solutions = Algebrite.nroots(eq)  
  return sol.tensor.elem.map((e) => parseSolution(e));
}

export function newtonIteration(evaluate: FunctionCallback, getDerivative: FunctionCallback, val: Complex): Complex {
  const num = evaluate(val);
  const den = getDerivative(val);
  const div = rxC(-1, cByC(num, den));
  const [real, imaginary] =  sumComplex([val, div]);
  return [rp(real, 4), rp(imaginary,4)];
}

function compareToAttractors(input: Complex, attractors: Complex[]): number {
  for (const a of attractors) {
    if (
      rp(input[0], 4) === rp(a[0], 4)
      && rp(input[1], 4) === rp(a[1], 4)
      ) {
      return attractors.indexOf(a)
    }
  }
  return -1;
}

export function findNewtonAttractor(
  attractors: Complex[], 
  input: Complex,
  evaluate: FunctionCallback, 
  getDerivative: FunctionCallback
  ) : number {

  const res = newtonRecursion(attractors, input, evaluate, getDerivative, -1)
  return res;
}

function newtonRecursion(
  attractors: Complex[],
  input: Complex,
  evaluate: FunctionCallback,
  getDerivative: FunctionCallback,
  index: number
): number {
  if (index !== -1) {
    return index;
  }
  let val = input;
  val = newtonIteration(evaluate, getDerivative, val);
  index = compareToAttractors(val, attractors);
  return newtonRecursion(attractors, val, evaluate, getDerivative, index);
}