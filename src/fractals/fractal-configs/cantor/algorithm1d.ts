import { LineSegment, Point } from "../../../types"

const INNER_MARGIN_HORIZONTAL = 10;
export function getFirstLine(
  size: number,
  innerMarginVertical = INNER_MARGIN_HORIZONTAL,
): LineSegment {
  const length = size - INNER_MARGIN_HORIZONTAL * 2;
  const a: Point = [INNER_MARGIN_HORIZONTAL, innerMarginVertical];
  const b: Point = [INNER_MARGIN_HORIZONTAL + length, innerMarginVertical]
  return { a, b };
}

type LeftoverSegments = [LineSegment, LineSegment];

export function drawLineSegment(
  points: LineSegment,
  ctx: CanvasRenderingContext2D,
  colour: 'black' | 'white' | 'blue',
) {
  ctx.beginPath()
  ctx.strokeStyle = colour;
  ctx.moveTo(...points.a);
  ctx.lineTo(...points.b);
  ctx.stroke();
  ctx.closePath();
}

function getMiddleThird(seg: LineSegment): LineSegment {
  const length = seg.b[0] - seg.a[0];
  const a: Point = [Math.round(seg.a[0]) + length / 3, seg.a[1]];
  const b: Point = [Math.round(seg.b[0] - length / 3), seg.b[1]];
  return { a, b };
}

export function removeSegment(
  seg: LineSegment,
  ctx: CanvasRenderingContext2D,
) {
  drawLineSegment(seg, ctx, 'black');
}

export function divideSegment(
  seg: LineSegment,
  ctx: CanvasRenderingContext2D,
): LeftoverSegments {
  const middle = getMiddleThird(seg);
  removeSegment(middle, ctx);
  return [
    {
      a: seg.a,
      b: middle.a
    },
    {
      a: middle.b,
      b: seg.b,
    }
  ];
}

export function generate1d(
  seg: LineSegment,
  iterations: number,
  ctx: CanvasRenderingContext2D,
): void {
  drawLineSegment(seg, ctx, 'white')
  if (iterations === 1) { return };
  const leftovers = divideSegment(seg, ctx)
  leftovers.forEach(segment => {
    generate1d(segment, iterations - 1, ctx)
  })
}

export function generateAll1d(
  seg: LineSegment,
  iterations: number,
  ctx: CanvasRenderingContext2D,
  size: number,
) {
  const distance = Math.round(size / iterations);
  let i = 1;
  let segment = seg;
  while (i <= iterations) {
    ctx.beginPath()
    generate1d(segment, i, ctx);
    ctx.closePath()
    segment = {
      a: [segment.a[0], Math.round(segment.a[1] + distance)],
      b: [segment.b[0], Math.round(segment.b[1] + distance)],
    }
    i++;
  }
}