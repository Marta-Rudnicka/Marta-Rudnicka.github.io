import { DrawFuncArgs, Point } from "../../../types";

type MandelbrotParameters = {
  imageData: ImageData;
  pixelOffset: Point;
}

function animateMovement(
  pixelOffset: Point,
  imageData: ImageData,
  ctx: CanvasRenderingContext2D,
  size: number,
  ) {
  console.log('animate')
  let offsetX = 0;
  let offsetY = 0;
  const inc = 1;
  console.log(offsetX, offsetY, pixelOffset)
  while (
    Math.abs(offsetX) < Math.abs(pixelOffset[0])
    || Math.abs(offsetY) < Math.abs(pixelOffset[1])
    ) {
    offsetX = offsetX + inc > pixelOffset[0] ? pixelOffset[0] : offsetX + inc;
    offsetY = offsetY + inc > pixelOffset[1] ? pixelOffset[1] : offsetY + inc;

    ctx.clearRect(0, 0, size, size);
    ctx.rect(0, 0, size, size);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.putImageData(imageData, offsetX, offsetY);
  }
  ctx.putImageData(imageData, pixelOffset[0], pixelOffset[1]);
}

export function draw(args: DrawFuncArgs): void {
  const { canvas, size } = args;
  const parameters = args.parameters as MandelbrotParameters;
  const ctx = canvas?.getContext('2d');

  if (ctx) {
    ctx.beginPath();
    animateMovement(parameters.pixelOffset, parameters.imageData, ctx, size)
  }
}
