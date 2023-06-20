import { Complex } from "mathjs";
import { PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";
import { convertKernelToImgData, distanceSq, getColor, getComplexPartsForPixels, getMultiplier, xSqrPlusY } from "../../gpu-utils";

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