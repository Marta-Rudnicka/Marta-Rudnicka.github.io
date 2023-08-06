import { Complex, PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";
import { convertKernelToImgData, getMultiplier } from "../../gpu-utils";
import { distanceSq, getColor, getComplexPartsForPixels, xSqrPlusY } from "../../gpu-utils";

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
  //main cardioid
  if (cardioid(c[0], c[1]) < 0.25) {
    withinLimits = 1;
  }

  // main bulb
  if (distanceSq([-1, 0], c) < 0.0625) {
    withinLimits = 1;
  }
  return withinLimits;
}

export function processPixel(
  c: number[],
  iterations: number
): PixelValue {

  if (checkKnownSolidShapes(c) === 1) {
    return [255, 255, 255, 255];
  }

  const seed = [0, 0];
  let val = xSqrPlusY(seed, c);
  for (let i = 0; i <= iterations; i++) {
    val = xSqrPlusY(val, c)
    const cr = distanceSq(val, c);
    if (cr > 4) {
      return getColor(i);
    }
  }
  return [255, 255, 255, 255];
}

export function getKernel(size: number): IKernelRunShortcut {
  const gpu = new GPU();

  gpu.addFunction(getComplexPartsForPixels);
  gpu.addFunction(xSqrPlusY);
  gpu.addFunction(processPixel);
  gpu.addFunction(distanceSq);
  gpu.addFunction(getColor);
  gpu.addFunction(getMultiplier);
  gpu.addFunction(cardioid);
  gpu.addFunction(checkKnownSolidShapes);

  const kernel = gpu.createKernel(function (
    startValueX: number,
    startValueY: number,
    size: number,
    inc: number,
  ) {
    const values = getComplexPartsForPixels(
      this.thread.x,
      this.thread.y,
      size,
      startValueX,
      startValueY,
      inc);

    const res = processPixel(values, 200)
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
  const startReal = startValue[0];
  const startImaginary = startValue[1];
  const kernel = getKernel(size);
  const kernelDump = kernel(startReal, startImaginary, size, inc) as number[][][];
  return convertKernelToImgData(kernelDump, size)
}
