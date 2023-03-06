import { DrawFuncArgs } from "../../types";
import { generate, equilateralTriangle, fillFirstTriangle } from "./algorithm";

type SierpinskiParameters = {
  iterations: number;
}
export function draw (
  args: DrawFuncArgs,
  ): void {
  const { canvas, size } = args;
  const parameters = args.parameters  as SierpinskiParameters;
  const ctx = canvas.getContext("2d");
  canvas.style.background = "black";
  const first = equilateralTriangle(size);
  if (ctx) {
    ctx?.clearRect(0, 0, size, size);
    ctx.beginPath();
    fillFirstTriangle(first, ctx);
    generate(
      first,
      parameters["iterations"],
      ctx
    );
    ctx.stroke();
    ctx.closePath();
  }
}