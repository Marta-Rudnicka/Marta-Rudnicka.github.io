import { DrawFuncArgs } from "../../../types";
import { drawLineSegment, generate, generateAll, getFirstLine } from "./algorithm";

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
export function draw2d(
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
      generateAll(first, parameters.iterations, ctx, size)
    } else {
      generate(first, parameters.iterations, ctx)
    }
    ctx.closePath();
  }
}

export function draw(
  args: DrawFuncArgs,
): void {
  const parameters = args.parameters as CantorParameters;
  const canvasContextType = contextDict[parameters.dimensions.toString()]
  if (canvasContextType === "2d") {
    draw2d(args);
  }
}