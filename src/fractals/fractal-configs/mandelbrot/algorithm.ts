import { Complex } from "mathjs";
import { PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";
import { getMultiplier } from "../../utils";

export function getColour(i: number): PixelValue {
//  very stupid syntax not to get mangled by optimiser + gpu.js
  let colour: PixelValue =  [200, 200, 200, 255];
  colour = i < 25 ? [0, 0, 0, 255] : [50, 50, 50, 255];
  if (colour[0] === 0) {
    return colour;
  }
  colour = i < 30 ? [50, 50, 50, 255] : [200, 200, 200, 255];
  if (colour[0] === 50) {
    return colour;
  }
  colour = i < 40 ? [100, 100, 100, 255] : [200, 200, 200, 255];
  if (colour[0] === 100) {
    return colour;
  }
  colour = i < 50 ? [150, 150, 150, 255] : [200, 200, 200, 255];
  if (colour[0] === 150) {
    return colour;
  }
  colour = i < 100 ? [180, 180, 180, 255] : [200, 200, 200, 255];
  if (colour[0] === 180) {
    return colour;
  }

  return colour;
}

export function xSqrPlusY(
  prev: number[],
  c: number[]
): number[] {
  const real = prev[0];
  const imaginary = prev[1];
  const squared = [real ** 2 - imaginary ** 2, 2 * real * imaginary]
  return [squared[0] + c[0], squared[1] + c[1]];
};

export function distanceSq(val: number[], c: number[]): number {
  // treating complex numbers as ordinary coordinates on the plane
  // false if lies outside the circle with r=2 from the value
  return (val[0] - c[0]) ** 2 + (val[1] - c[1]) ** 2;
}

function cardioid(x: number, y: number) {
  /* if res < 0.25, the point [x, y] lies within the main cardioid;
  returns number because GPUJS has problem handling Booleans
  */
  const ySq = y ** 2;
  const c = x - 0.25;
  const res = ((c ** 2 + ySq) ** 2 + c * (c ** 2 + ySq)) / ySq;
  return res;
}

function checkKnownSolidShapes(c: number[]) {
  let withinLimits = 0;
  const cardioidValue = cardioid(c[0], c[1]);
  const mainBulb = distanceSq([-1, 0], c);
  const card = 0.25 > cardioidValue ? 1 : 0;
  withinLimits = mainBulb < 0.0625 ? 1 : 0 + card;
  return withinLimits;
}

function getComplexPartsForPixels(
  x: number,
  y: number,
  startValueX: number,
  startValueY: number,
  baseInc: number,
  baseMultiplier: number,
): number[] {

  // to prevent GPU from rounding numbers; value establihed by trial and error
  const multiplier = baseMultiplier * 10000;

  const inc = baseInc * multiplier;
  const xIncB = x * inc;
  const yIncB = y * inc;
  const xInc = xIncB / multiplier;
  const yInc = yIncB / multiplier;

  const re = startValueX + xInc;
  const im = startValueY + yInc;
  return [re, im];
};

export function processPixel(
    c: number[],
    iterations: number
    ): PixelValue {

  const knownShape = checkKnownSolidShapes(c);
  if (knownShape === 1) {
    return [255, 255, 255, 255];
  }
  // const seed = [0, 0];
  // let val = xSqrPlusY(seed, c);
  // for (let i = 0; i <= iterations; i++) {
  //   val = xSqrPlusY(val, c)
  //   const cr = distanceSq(val, c);
  //   colour = cr > 4 ? getColour(i) : colour;
  // }
  return [0,0,0,255];
}

export function getKernel(size: number): IKernelRunShortcut {
  const gpu = new GPU();

  gpu.addFunction(getComplexPartsForPixels);
  gpu.addFunction(xSqrPlusY);
  gpu.addFunction(processPixel);
  gpu.addFunction(distanceSq);
  gpu.addFunction(getColour);
  gpu.addFunction(cardioid);
  gpu.addFunction(checkKnownSolidShapes);

  const kernel = gpu.createKernel(function (
    startValueX: number,
    startValueY: number,
    inc: number,
    multiplier: number,
  ) {
    const values = getComplexPartsForPixels(
      this.thread.x,
      this.thread.y,
      startValueX,
      startValueY,
      inc,
      multiplier
    );

    const res = processPixel(values, 200) // processPixel(values, 200);
    return res;
  }).setOutput([size, size]);
  return kernel;
}

export function createImageData(
  size: number,
  startValue: Complex,
  range: number
) {
  const inc = range / size;
  const startReal = startValue.re;
  const startImaginary = startValue.im;
  const arr = new Uint8ClampedArray(size * size * 4);
  const kernel = getKernel(size);
  const kernelDump = kernel(startReal, startImaginary, inc, getMultiplier(inc)) as number[][][];
  const data = [];
  for (let i = 0; i < kernelDump.length; i += 1) {
    for (let j = 0; j < kernelDump[i].length; j += 1) {
      data.push(...kernelDump[i][j])
    }
  }
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = data[i];
  }
  return new ImageData(arr, size);
}
