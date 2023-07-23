import { RectangleParams } from "../../../types"

type LeftoverSquares = [CanvasRectangle, CanvasRectangle, CanvasRectangle, CanvasRectangle];

class CanvasRectangle {
  topLeftX: number;
  topLeftY: number;
  width: number;
  height: number;

  constructor(
    topLeftX: number,
    topLeftY: number,
    width: number,
    height: number,
  ) {
    this.topLeftX = topLeftX;
    this.topLeftY = topLeftY;
    this.width = width;
    this.height = height;
  }
  getArgs() {
    return [this.topLeftX, this.topLeftY, this.width, this.height] as RectangleParams;
  }
}

export function getFirstSquare(
  size: number,
  innerMargin: number,
) {
  return new CanvasRectangle(
    innerMargin,
    innerMargin,
    size - innerMargin * 2,
    size - innerMargin * 2,
  );
}

export function drawRectangle(
  rect: CanvasRectangle,
  ctx: CanvasRenderingContext2D,
  colour: 'black' | 'white' | 'blue',
) {
  ctx.fillStyle = colour;
  ctx.beginPath()
  ctx.strokeStyle = colour;
  ctx.lineWidth = 1;
  ctx.rect(...rect.getArgs());
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
}

export function getInnerMargin(size: number): number {
  const possibleMaxIter = [ 4, 5, 6, 7]; // 8 iterations would be more than ultraHD monitor can handle
  const powersOf3 = possibleMaxIter.map(i => Math.pow(3, i));

  if (size <= 81) return 0;
  let margin = 0;
  for (let pow of powersOf3) {
    if ( size >= pow ) {
      margin = Math.round((size - pow) / 2);
    } else {
      return margin;
    }
  }
  return Math.round((Math.pow(3, 11) - size) / 2);

}

function getMiddleVertical(sq: CanvasRectangle): CanvasRectangle {
  const roundingErrorOffset = sq.width > 20 ? 4 : 2;
  const topLeftX = Math.round(sq.topLeftX + sq.width / 3);
  const topLeftY = Math.round(sq.topLeftY - roundingErrorOffset);
  const width = Math.round(sq.width / 3);
  const height = Math.round(sq.height + roundingErrorOffset * 2);
  return new CanvasRectangle(topLeftX, topLeftY, width, height);
}

function getMiddleHorizontal(sq: CanvasRectangle): CanvasRectangle {
  const roundingErrorOffset = sq.width > 20 ? 4 : 2;
  const topLeftX = Math.round(sq.topLeftX - roundingErrorOffset);
  const topLeftY = Math.round(sq.topLeftY + sq.height / 3);
  const width = Math.round(sq.width + roundingErrorOffset * 2);
  const height = Math.round(sq.height / 3);
  return new CanvasRectangle(topLeftX, topLeftY, width, height);
}

export function removeRectangle(
  sq: CanvasRectangle,
  ctx: CanvasRenderingContext2D,
  ) {
    drawRectangle(sq, ctx, 'black');
}

export function divideSquare(
  sq: CanvasRectangle,
  ctx: CanvasRenderingContext2D,
  ): LeftoverSquares {
  const middleVertical = getMiddleVertical(sq);
  removeRectangle(middleVertical, ctx);
  const middleHorizontal = getMiddleHorizontal(sq);
  removeRectangle(middleHorizontal, ctx);

  const topLeftSquare = new CanvasRectangle(
    sq.topLeftX,
    sq.topLeftY,
    middleVertical.width,
    middleHorizontal.height
  );
  const topRightSquare = new CanvasRectangle(
    sq.topLeftX + 2 * middleVertical.width,
    sq.topLeftY,
    middleVertical.width,
    middleHorizontal.height
  );
  const bottomLeftSquare = new CanvasRectangle(
    sq.topLeftX,
    sq.topLeftY + 2 * middleHorizontal.height,
    middleVertical.width,
    middleHorizontal.height
  );
  const bottomRightSquare = new CanvasRectangle(
    sq.topLeftX + 2 * middleVertical.width,
    sq.topLeftY + 2 * middleHorizontal.height,
    middleVertical.width,
    middleHorizontal.height
  );
  return [ topLeftSquare, topRightSquare, bottomLeftSquare, bottomRightSquare];
}

export function generate2d(
  sq: CanvasRectangle,
  iterations: number,
  ctx: CanvasRenderingContext2D,
): void {
    if (iterations === 1) { return };

    const leftovers = divideSquare(sq, ctx)
    leftovers.forEach(smallSquare => {
      generate2d(smallSquare, iterations - 1, ctx)
    })
}
