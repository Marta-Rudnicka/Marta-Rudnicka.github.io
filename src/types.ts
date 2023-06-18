import { Complex } from "mathjs";
import { ReactNode } from "react";
import { SliderControlProps } from "./fractals/Components/Controls/SliderControl";
import { ButtonPairControlProps } from "./fractals/Components/Controls/ButtonControlPair";

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

export type Rectangle = {
  a: Point;
  b: Point;
  c: Point;
  d: Point
}

export type Parameters = Record<string, number|Point|Complex|unknown>

type canvasInput = {
  value: Point,
  setValue?: (val: Point) => void,
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

export type PixelValue = [number, number, number, number];

export type PixelMap = Record<string, Record<string, PixelValue >>;
export type TempPixelMap = Record<string, Record<string, PixelValue | null>>;

export type ComplexPlane = Record<string, Record<string, Complex>>;
export type NumberCache = Record<string, Record<string, PixelValue>>;

export type MainFractalControlProps = {
  adjustPropertiesToScreenSize?: ResizeHandler;
  altControls?: ReactNode;
  description: ReactNode
  draw: (args: DrawFuncArgs) => void;
  nextLink?: string;
  prevLink?: string;
  sliders?: SliderControlProps[];
  buttonPairs?: ButtonPairControlProps[];
  controlsChildren?: ReactNode;  title: string;
}
