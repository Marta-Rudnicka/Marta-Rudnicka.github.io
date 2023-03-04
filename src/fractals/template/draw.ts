import { DrawFuncArgs } from "../../types";

export function draw (
  args: DrawFuncArgs
  ): void {
  const { canvas, size } = args;
  const usedSize = 0.95 * size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.moveTo(500, 500);
    ctx.lineTo(usedSize, usedSize);
    ctx.stroke();
  }
}