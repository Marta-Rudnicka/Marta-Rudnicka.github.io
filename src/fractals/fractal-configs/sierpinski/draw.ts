import { DrawFuncArgs, Point, Triangle } from "../../../types";
import { highlightActiveArea } from "../../utils";
import { generate, fillFirstTriangle } from "./algorithm";

type SierpinskiParameters = {
  iterations: number;
  a: Point,
  b: Point,
  c: Point,
}

export function draw(
  args: DrawFuncArgs,
): void {
  const { canvas, size } = args;
  const parameters = args.parameters as SierpinskiParameters;
  const ctx = canvas.getContext("2d");
  canvas.style.background = "black";
  const first = { a: parameters.a, b: parameters.b, c: parameters.c } as Triangle;

  if (ctx) {
    ctx?.clearRect(0, 0, size, size);
    ctx.beginPath();
    fillFirstTriangle(first, ctx);
    generate(
      first,
      parameters["iterations"],
      ctx
    );
    ctx.closePath();
    highlightActiveArea(first.a, ctx);
    highlightActiveArea(first.b, ctx);
    highlightActiveArea(first.c, ctx);
  }
}