import { Dispatch, SetStateAction } from "react";

export type DrawFuncArgs = {
  canvas: HTMLCanvasElement,
  size: number,
  parameters: Parameters;
};

export type DrawFunc= (args: DrawFuncArgs) => void;

export type Point = [
  number, number,
]

export type Triangle = {
  a: Point;
  b: Point;
  c: Point;
}

export type Parameters = Record<string, number|Point>

type canvasInput = {
  value: Point,
  setValue?: Dispatch<SetStateAction<Point>>,
  toggle?: () => void;
}

export type canvasInputs = {
  onClick? : canvasInput,
  onMouseMove?: canvasInput,
  onMouseOver?: canvasInput,
  onMouseUp?: canvasInput,
  onMouseDown?: canvasInput,
}

export type eventHandlerString = "onMouseDown" | "onMouseUp" | "onMouseMove";

export type ResizeHandler = (oldSize: number | null, newSize: number) => void;
