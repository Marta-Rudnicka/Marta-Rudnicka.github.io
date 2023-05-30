import { Complex } from "mathjs";
import { PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";
import { getMultiplier } from "../../utils";

export function getColor(i: number): PixelValue {
  if (i < 25) return [0, 0, 0, 255];
  if (i < 30) return [50, 50, 50, 255];
  if (i < 40) return [100, 100, 100, 255];
  if (i < 50) return [150, 150, 150, 255];
  if (i < 100) return [180, 180, 180, 255];
  return [200, 200, 200, 255];
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

function getComplexPartsForPixels(
  x: number,
  y: number,
  startValueX: number,
  startValueY: number,
  inc: number,
): number[] {

  const multiplier = getMultiplier(inc) * 1000;
  // to prevent GPU from rounding numbers; value establihed by trial and error
  inc = inc * multiplier;
  let xInc = x * inc;
  let yInc = y * inc;
  xInc = xInc / multiplier;
  yInc = yInc / multiplier;

  const re = startValueX + xInc;
  const im = startValueY + yInc;
  return [re, im];
};

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
  startValue: Complex,
  range: number,
  xReal: number,
  xImaginary: number,
) {
  const inc = range / size;
  const startReal = startValue.re;
  const startImaginary = startValue.im;
  const arr = new Uint8ClampedArray(size * size * 4);
  const kernel = getKernel(size, xReal, xImaginary);
  const kernelDump = kernel(startReal, startImaginary, inc, xReal, xImaginary) as number[][][];
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