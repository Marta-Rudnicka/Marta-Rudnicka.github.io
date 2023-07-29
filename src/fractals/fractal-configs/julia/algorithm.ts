import { Complex, PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";
import {
  convertKernelToImgData,
  distanceSq,
  getColor,
  getComplexPartsForPixels,
  getMultiplier,
  xSqrPlusY
} from "../../gpu-utils";


export function processPixel(
  x: number[],
  iterations: number,
  cReal: number,
  cImaginary: number,
): PixelValue {

  let val = xSqrPlusY(x, [cReal, cImaginary]);
  for (let i = 0; i <= iterations; i++) {
    val = xSqrPlusY(val, [cReal, cImaginary])
    if (distanceSq(val, x) > 4) {
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
    size: number,
    inc: number,
    xReal: number,
    xImaginary: number,
  ) {
    const values = getComplexPartsForPixels(
      this.thread.x,
      this.thread.y,
      size,
      startValueX,
      startValueY,
      inc);

    const res = processPixel(values, 100, xReal, xImaginary)
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
  const startReal = startValue[0];
  const startImaginary = startValue[1];
  const kernel = getKernel(size, xReal, xImaginary);
  const kernelDump = kernel(startReal, startImaginary, size, inc, xReal, xImaginary) as number[][][];
  return convertKernelToImgData(kernelDump, size)
}
