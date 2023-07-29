import { Complex, PixelValue } from "../types";

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
  return (val[0] - c[0])**2 + (val[1] - c[1])**2;
}

export function getComplexPartsForPixels(
  x: number,
  canvasY: number,
  size: number,
  startValueX: number,
  startValueY: number,
  inc: number,
): Complex {

  const y = size - canvasY;
  const multiplier = getMultiplier(inc) * 1000;
  // to prevent GPU from rounding numbers; value established by trial and error
  inc = inc * multiplier;
  let xInc = x * inc;
  let yInc = y * inc;
  xInc = xInc / multiplier;
  yInc = yInc / multiplier;

  const re = startValueX + xInc;
  const im = startValueY + yInc;
  return [re, im];
};

export function convertKernelToImgData(kernelDump: number[][][], size: number) {
  const arr = new Uint8ClampedArray(size * size * 4);
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

export function getMultiplier(input: number) {
  /** finds the order of magnitude a number should be multiplied by to prevent
   * rounding by he GPU
   */
  let multiplier = 1;
  while(input * multiplier < 1 ) {
    multiplier = multiplier * 10;
  }
  return multiplier;
}

export function lengthNumArray(array: number[]): number {
  let i: number = 0;
  while (array[i] !== undefined) {
    i = i + 1
  }
  return i;
}