import { Complex } from "mathjs";
import { DrawFuncArgs } from "../../../types";
import { getKernel } from "./algorithm";

type MandelbrotParameters = {
  startValue: Complex;
  range: number;
}

export function draw(args: DrawFuncArgs): void {
  const { canvas, size,  } = args;
  const parameters = args.parameters as MandelbrotParameters;
  const startReal = parameters.startValue.re;
  const startImaginary = parameters.startValue.im;

  const inc = parameters.range / size;
  const arr = new Uint8ClampedArray(size * size * 4);
  const ctx = canvas?.getContext('2d');
  const kernel = getKernel(size);

  const kernelDump = kernel(startReal, startImaginary, inc)as number[][][];
  const data = [];
  for (let i = 0; i < kernelDump.length; i += 1) {
    for (let j = 0; j < kernelDump[i].length; j += 1) {
    data.push(...kernelDump[i][j])
  }
}
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = data[i];
  }

  const imageData = new ImageData(arr, size);

  if (ctx) {
    ctx?.clearRect(0, 0, size, size);
    ctx.putImageData(imageData, 0, 0);
  }
}
