import { Complex } from "mathjs";
import { DrawFuncArgs, PixelMap } from "../../../types";
import { MandelbrotPixelMap } from "./algorithm";

type MandelbrotParameters = {
  startValue: Complex,
  range: number
}

function createImageData(map: PixelMap, size: number) {
  const numbers: number[] = [];
  for (let i = 1; i <= size; i ++) {
    for (let j = 1; j <= size; j ++) {
      if (map[i][j].length === 4) {
        numbers.push(...map[i][j]);
      }
    }
  }
  return numbers;
}

export function draw(
  args: DrawFuncArgs,
): void {
  const { canvas, size } = args;
  const arr = new Uint8ClampedArray(size * size * 4);
  const parameters = args.parameters as MandelbrotParameters;

  const map = new MandelbrotPixelMap(
    size,
    parameters.startValue,
    parameters.range
  );

  map.cacheNumbers();
  map.addValuesToPixelMap();
  const ctx = canvas.getContext("2d");
  // canvas.style.background = "blue";

  const data = createImageData(map.map as PixelMap, size)
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = data[i];
  }

  let imageData = new ImageData(arr, size);


  if (ctx) {
    canvas.style.background = "yellow";
    ctx?.clearRect(0, 0, size, size);
    ctx.putImageData(imageData, 0, 0);

  }
}