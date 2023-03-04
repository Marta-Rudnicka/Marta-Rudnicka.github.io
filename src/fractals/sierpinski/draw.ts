import { DrawFuncArgs } from "../../types";
import { drawTriangle, equilateralTriangle } from "./algorithm";

export function draw (
  args: DrawFuncArgs,
  ): void {
  const { canvas, size } = args;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    drawTriangle(
      equilateralTriangle(size),
      4,
      ctx
    );
  }
}