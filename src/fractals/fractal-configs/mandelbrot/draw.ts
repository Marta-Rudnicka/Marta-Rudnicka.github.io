import { Complex } from "mathjs";
import { DrawFuncArgs, Point } from "../../../types";
import { getKernel } from "./algorithm";

type MandelbrotParameters = {
  imageData: ImageData;
  pixelOffset: Point;
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

  const kernelDump = kernel(startReal, startImaginary, inc) as number[][][];
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

export function draw(args: DrawFuncArgs): void {
  const { canvas, size } = args;
  const parameters = args.parameters as MandelbrotParameters;
  const offsetX = parameters.pixelOffset[0] || 0;
  const offsetY = parameters.pixelOffset[1] || 0;

  const ctx = canvas?.getContext('2d');

  if (ctx) {
    ctx.fillStyle = "red";
    ctx.clearRect(0, 0, size, size);
    ctx.putImageData(parameters.imageData, offsetX, offsetY);
  }
}
