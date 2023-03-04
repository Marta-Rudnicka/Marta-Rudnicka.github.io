import { DrawFuncArgs } from "../../types";
import { drawTriangle, equilateralTriangle } from "./algorithm";

type SierpinskiParameters = {
  iterations: number;
}
export function draw (
  args: DrawFuncArgs,
  ): void {
  const { canvas, size } = args;
  const parameters = args.parameters  as SierpinskiParameters;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx?.clearRect(0, 0, size, size);
    ctx.beginPath();
    drawTriangle(
      equilateralTriangle(size),
      parameters["iterations"],
      ctx
    );
    ctx.stroke();
    ctx.closePath();
  }
}