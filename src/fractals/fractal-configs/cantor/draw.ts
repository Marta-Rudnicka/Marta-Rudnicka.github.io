import { DrawFuncArgs } from "../../../types";
import { drawLineSegment, generate1d, generateAll1d, getFirstLine } from "./algorithm1d";
import { drawRectangle, generate2d, getFirstSquare, getInnerMargin } from "./algorithm2d";

type CantorParameters = {
  iterations: number;
  dimensions: number;
  showIntermediateStages: string;
}

const contextDict: Record<string, string> = {
  "1": "2d",
  "2": "2d",
  "3": "webgl"
}
export function draw1d(
  args: DrawFuncArgs,
): void {
  const { canvas, size } = args;
  const parameters = args.parameters as CantorParameters;
  const showIntermediate = parameters.showIntermediateStages === "yes";
  const ctx = canvas.getContext("2d");
  canvas.style.background = "black";
  const innerMarginVertical = showIntermediate ? undefined : Math.round(size / 3);

  if (ctx) {
    ctx?.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.lineWidth = 6;
    const first = getFirstLine(size, innerMarginVertical);
    drawLineSegment(first, ctx, 'white');
    if(showIntermediate){
      generateAll1d(first, parameters.iterations, ctx, size)
    } else {
      generate1d(first, parameters.iterations, ctx)
    }
    ctx.closePath();
  }
}

export function draw2d(
  args: DrawFuncArgs,
): void {
  const { canvas, size } = args;
  const parameters = args.parameters as CantorParameters;
  const ctx = canvas.getContext("2d");
  canvas.style.background = "black";
  const innerMargin = getInnerMargin(size);

  if (ctx) {
    ctx?.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.lineWidth = 1;
    const first = getFirstSquare(size, innerMargin);
    drawRectangle(first, ctx, 'white');
    generate2d(first, parameters.iterations, ctx);
    ctx.closePath();
  }
}

export function draw(
  args: DrawFuncArgs,
): void {
  const parameters = args.parameters as CantorParameters;
  const canvasContextType = contextDict[parameters.dimensions.toString()]
  if (canvasContextType === "2d" && parameters.dimensions === 1) {
    draw1d(args);
  }
  if (canvasContextType === "2d" && parameters.dimensions === 2) {
    draw2d(args);
  }
}