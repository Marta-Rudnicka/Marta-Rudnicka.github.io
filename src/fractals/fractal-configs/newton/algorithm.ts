import { Complex, PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";
import { convertKernelToImgData, getComplexPartsForPixels, getMultiplier } from "../../gpu-utils";
import {
  c,
  cByC,
  getPolynomialStringForNroots,
  lengthNumArray,
  pow2,
  pow3,
  pow4,
  pow5,
  rp,
  rxC,
  sum2Complex
} from "./maths-helpers";
import {
  compareToAttractors,
  compareToKnownRoots,
  evaluateDerivative,
  evaluatePolynomial,
  findIndexOfAttractor,
  findNewtonAttractor,
  newtonIteration,
  solve
} from "./newton-algorithm";

export type FunctionCallback = (x: Complex) => Complex;
export type NewtonInputs = {
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
}
export type flattenedAttractorList = [number, number, number, number, number, number, number, number, number, number];

function getNewtonColour(i: number): PixelValue {
  if (i === 3) return [150, 184, 150, 255];
  if (i === 1) return [139, 102, 110, 255];
  if (i === 2) return [254, 246, 225, 255];
  if (i === 0) return [252, 207, 210, 255];
  if (i === 4) return [231, 99, 123, 255];
  return [0, 0, 0, 255]
};

export function getKernel(
  complexPlaneArgs: number[],
  userInputs: number[],
  roots: number[],
): IKernelRunShortcut {

  const gpu = new GPU();
  gpu.addFunction(lengthNumArray);
  gpu.addFunction(getComplexPartsForPixels);
  gpu.addFunction(compareToAttractors);
  gpu.addFunction(getNewtonColour);
  gpu.addFunction(getMultiplier);
  gpu.addFunction(sum2Complex);
  gpu.addFunction(findIndexOfAttractor);
  gpu.addFunction(newtonIteration);
  gpu.addFunction(compareToAttractors);
  gpu.addFunction(findNewtonAttractor);
  gpu.addFunction(evaluatePolynomial);
  gpu.addFunction(evaluateDerivative);
  gpu.addFunction(rxC);
  gpu.addFunction(cByC);
  gpu.addFunction(pow2);
  gpu.addFunction(pow3);
  gpu.addFunction(pow4);
  gpu.addFunction(pow5);
  gpu.addFunction(c);
  gpu.addFunction(rp);
  gpu.addFunction(compareToKnownRoots);

  const kernel = gpu.createKernel(function (
    complexPlaneArgs: number[],
    userInputs: number[],
    roots: number[],
  ) {
    // passed as an array because GPU
    const startValueX = complexPlaneArgs[1];
    const startValueY = complexPlaneArgs[2];
    const inc = complexPlaneArgs[3];

    const constant = userInputs[0];
    const co1 = userInputs[1];
    const co2 = userInputs[2];
    const co3 = userInputs[3];
    const co4 = userInputs[4];
    const co5 = userInputs[5];

    const r0r = roots[0];
    const r0i = roots[1];
    const r1r = roots[2];
    const r1i = roots[3];
    const r2r = roots[4];
    const r2i = roots[5];
    const r3r = roots[6];
    const r3i = roots[7];
    const r4r = roots[8];
    const r4i = roots[9];

    const numOfRoots = roots[10];


    const values = getComplexPartsForPixels(
      this.thread.x,
      this.thread.y,
      startValueX,
      startValueY,
      inc
    );

    const index = findNewtonAttractor(
      r0r, r0i,
      r1r, r1i,
      r2r, r2i,
      r3r, r3i,
      r4r, r4i,
      numOfRoots,
      values,
      constant, co1, co2, co3, co4, co5
    );

    const res = getNewtonColour(index);
    return res;
  }).setOutput([complexPlaneArgs[0], complexPlaneArgs[0]]);
  return kernel;
}

export function createImageData(
  size: number,
  startValue: Complex,
  range: number,
  xReal: number,
  xImaginary: number,
  input?: NewtonInputs,
) {
  const inc = range / size;
  if(!input) {
    const arr = new Uint8ClampedArray(size * size * 4);
    return new ImageData(arr, size);
  }

  const polynomialString = getPolynomialStringForNroots(
    input?.constant,
    input?.co1,
    input?.co2,
    input?.co3,
    input?.co4,
    input?.co5,
  );

  const attractors = solve(polynomialString);
  const kernel = getKernel(
    [ size, startValue[0], startValue[1], inc ],
    [ input?.constant, input.co1, input.co2, input.co3, input.co4, input.co5 ],
    [ ...attractors ],
  );

  const kernelDump = kernel(
    [ size, startValue[0], startValue[1], inc ],
    [ input?.constant, input.co1, input.co2, input.co3, input.co4, input.co5 ],
    [ ...attractors ],
  ) as number[][][];
  return convertKernelToImgData(kernelDump, size)
}
