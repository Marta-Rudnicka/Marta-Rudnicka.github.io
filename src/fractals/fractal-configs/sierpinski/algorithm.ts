import { Point, Triangle } from "../../../types";

export function equilateralTriangle(size: number): Triangle {
  const length = 0.9 * size;
  const startX = 0.05 * size
  const startY = 0.95 * size;
  const a: Point = [startX, startY];
  const b: Point = [startX + length, startY];
  const c: Point = [startX + 0.5 * length, startY + Math.cos(60) * length];
  return { a, b, c };
}

function middle(a: Point, b: Point): Point {
  const xmax = Math.max(a[0], b[0])
  const xmin = Math.min(a[0], b[0])

  const ymax = Math.max(a[1], b[1])
  const ymin = Math.min(a[1], b[1])
  const x = xmin + (xmax - xmin)/2
  const y = ymin + (ymax - ymin)/2
      
  return [x, y]
}

function getNewTriangles(points: Triangle): Triangle[] {
  const { a, b, c } = points;
  return [
    {a, b: middle(a, b), c: middle(a, c)},
    {a: b, b: middle(b, c), c: middle(a, b)},
    {a: c, b: middle(c, b), c: middle(c, a)},
  ];
}

function cutOutMiddleTriangle(
  points: Triangle,
  ctx: CanvasRenderingContext2D  
  ): void {
  const { a, b, c } = points;
  const newPoints = {a: middle(a, b), b: middle(b, c), c: middle(c, a)}
  ctx.fillStyle = "black";
  ctx.beginPath();
  drawTriangle(newPoints, ctx);
  ctx.closePath()
  ctx.fill();
}

function drawTriangle(
  points: Triangle,
  ctx: CanvasRenderingContext2D  
  ): void {
  const { a, b, c } = points;
  ctx.moveTo(...a);
  ctx.lineTo(...b);
  ctx.lineTo(...c);
  ctx.lineTo(...a);
}

export function fillFirstTriangle(
  points: Triangle,
  ctx: CanvasRenderingContext2D,
): void {
  ctx.fillStyle = "white";
  drawTriangle(points, ctx);
  ctx.fill();
}

export function generate(
  points: Triangle,
  iterations: number,
  ctx: CanvasRenderingContext2D,
): void {

  drawTriangle(points, ctx);
  if (iterations === 1) { return };
  cutOutMiddleTriangle(points, ctx);
  const newTriangles = getNewTriangles(points);
  newTriangles.forEach(triangle => {
    generate(triangle, iterations-1, ctx)
  });
}