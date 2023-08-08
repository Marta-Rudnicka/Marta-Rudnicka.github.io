import { c } from "../../../config/colours";
import { Point } from "../../../types";
import { findLineEnd, getQuadraticCurveParams } from "../../utils";

export function drawCurve(
  ctx: CanvasRenderingContext2D,
  cWidth: number,
  cHeight: number,
  trunkEnd: Point,
  angle: number,
  l: number,
  curveRatio: number,
  curveDistanceRatio: number,
) {

  const leftEnd = findLineEnd(trunkEnd, angle, l);

  const [cpX, cpY, x, y] = getQuadraticCurveParams(
    trunkEnd,
    -angle,
    l,
    curveRatio,
    curveDistanceRatio,
    "right",
  );


  ctx.fillStyle = c.CREAM;
  ctx.strokeStyle = c.BROWN;
  ctx.fillRect(0, 0, cWidth, cHeight);
  ctx.lineWidth = 1;

  // draw trunk
  ctx.beginPath()
  ctx.moveTo(cWidth / 2, cHeight);
  ctx.lineTo(...trunkEnd);
  ctx.moveTo(...trunkEnd)

  // draw left branch
  ctx.lineTo(...leftEnd);
  ctx.stroke();
  ctx.closePath();

  //draw curve and control point
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(...trunkEnd)
  ctx.quadraticCurveTo(cpX, cpY, x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = c.CORAL;
  ctx.arc(cpX, cpY, 5, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
}
