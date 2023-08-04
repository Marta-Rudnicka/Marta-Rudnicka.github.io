import { DrawFuncArgs } from "../../../types";
import { drawDragon } from "./algorithm";


type DragonParameters = {
  iterations: number;
}

export function draw(
  args: DrawFuncArgs,
): void {
  const { canvas, size } = args;
  const parameters = args.parameters as DragonParameters;
  const ctx = canvas.getContext("2d");
  canvas.style.background = "black";

  if (ctx) {
    ctx?.clearRect(0, 0, size, size);
    drawDragon(ctx, size, parameters.iterations);
  }
}
