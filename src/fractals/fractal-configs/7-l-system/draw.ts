import { c } from "../../../config/colours";
import { DrawFuncArgs } from "../../../types";
import { generate } from "./algorithm";

type LSystemParameters = {
  iterations: number;
  angle: number;
  animate: string;
  branches: number;
  curveRatio: number;
  curveDistanceRatio: number;
}


export function draw(
  args: DrawFuncArgs,
): void {
  const { canvas, size } = args;
  const parameters = args.parameters as LSystemParameters;
  const ctx = canvas.getContext("2d");
  canvas.style.background = "black";

  if (ctx) {
    ctx?.clearRect(0, 0, size, size);
    ctx.lineWidth = 1;
    ctx.strokeStyle = c.GREEN;
    ctx.beginPath();
    const animate = parameters.animate === "on";
    generate(
      parameters.iterations,
      parameters.angle,
      size,
      animate,
      parameters.branches,
      parameters.curveRatio,
      parameters.curveDistanceRatio,
      ctx,
    );
    ctx.closePath();
  }
}
