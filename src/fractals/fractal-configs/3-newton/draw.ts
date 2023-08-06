import { DrawFuncArgs, Point } from "../../../types";

type NewtonParameters = {
  imageData: ImageData;
  pixelOffset: Point;
}

export function draw(args: DrawFuncArgs): void {
  const { canvas, size } = args;
  const parameters = args.parameters as NewtonParameters;
  const offsetX = parameters.pixelOffset[0] || 0;
  const offsetY = parameters.pixelOffset[1] || 0;

  const ctx = canvas?.getContext('2d');

  if (ctx) {
    ctx.beginPath();
    ctx.clearRect(0, 0, size, size);
    ctx.rect(0, 0, size, size);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.putImageData(parameters.imageData, offsetX, offsetY);
  }
}
