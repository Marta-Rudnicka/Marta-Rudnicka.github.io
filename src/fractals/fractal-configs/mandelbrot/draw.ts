import { DrawFuncArgs, Point } from "../../../types";

type MandelbrotParameters = {
  imageData: ImageData;
  pixelOffset: Point;
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
