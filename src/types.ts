export type DrawFuncArgs = {
  canvas: HTMLCanvasElement,
  size: number,
};

export type DrawFunc= (args: DrawFuncArgs, parameters: unknown) => void;

export type Point = [
  number, number,
]

export type Triangle = {
  a: Point;
  b: Point;
  c: Point;
}