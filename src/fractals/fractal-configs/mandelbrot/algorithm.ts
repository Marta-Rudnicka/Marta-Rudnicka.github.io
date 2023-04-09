import { PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";

export function getColor(i: number): PixelValue {
  if (i < 20) return [255, 255, 255, 255];
  if (i < 30) return [240, 240, 240, 255];
  if (i < 40) return [225, 225, 225, 255];
  if (i < 50) return [211, 211, 211, 255];
  return [93, 26, 93, 255];
}

export function xSqrPlusY(
  prev: number[], 
  c: number[]
  ): number[] { 
  const real = prev[0];
  const imaginary = prev[1];
  const squared =  [real**2 - imaginary ** 2, 2 * real * imaginary]
  return [squared[0] + c[0], squared[1] + c[1]];
};

export function distanceSq(val: number[], c: number[]): number {
  // treating complex numbers as ordinary coordinates on the plane
  // false if lies outside the circle with r=2 from the value
  return (val[0] - c[0])**2 + (val[1] - c[1])**2;
}

function getComplexPartsForPixels(
    x: number,
    y: number,
    startValueX: number, 
    startValueY: number,
    inc: number,
  ): number[] {
  
  // to prevent GPU from rounding numbers
  inc = inc * 1000;
  let xInc = x * inc;
  let yInc = y * inc;
  xInc = xInc / 1000;
  yInc = yInc / 1000;

  const re = startValueX + xInc;
  const im = startValueY + yInc;
  return [re, im];
};

export function processPixel(
    c: number[],
    iterations: number
    ): number[] {
  const seed = [0, 0];
  let val = xSqrPlusY(seed, c);
  for (let i = 0; i <= iterations; i++) {
    val = xSqrPlusY(val, c)
    const cr = distanceSq(val, c);
    if (cr > 4) { 
      return getColor(i);
    }
  }
  return [0, 0, 0, 255];
}

export function getKernel(size: number): IKernelRunShortcut {
  const gpu = new GPU();

  gpu.addFunction(getComplexPartsForPixels);
  gpu.addFunction(xSqrPlusY);
  gpu.addFunction(processPixel);
  gpu.addFunction(distanceSq);
  gpu.addFunction(getColor);

  const kernel = gpu.createKernel(function (
    startValueX: number,
    startValueY: number,
    inc: number,
    // // iterations: number
  ) {
    const values = getComplexPartsForPixels(
      this.thread.x,
      this.thread.y,
      startValueX,
      startValueY,
      inc);

    const res = processPixel(values, 50)
    return res;
  }).setOutput([size, size]);
  return kernel;
}
