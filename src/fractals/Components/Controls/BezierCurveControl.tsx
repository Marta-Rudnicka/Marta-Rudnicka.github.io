import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { InfoLabel } from "./InfoLabel";
import { Slider } from "./Slider";
import { Point } from "../../../types";
import { drawCurve } from "./BezierCurveImage";

export type BezierCurveControlProps = {
  curveRatio: number,
  curveDistanceRatio: number,
  angleDeg: number,
  setCurveRatio: Dispatch<SetStateAction<number>>;
  setCurveDistanceRatio: Dispatch<SetStateAction<number>>;
  info?: string;
  label1: string;
  label2: string;
  tabIndex: number;
}

export function BezierCurveControl(props: BezierCurveControlProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cWidth = 300;
  const cHeight = 360;
  const l = 120;
  const angle = Math.PI / 180 * props.angleDeg; // convert to radians
  
  useEffect(() => {
    const trunkEnd: Point = [cWidth / 2, cHeight - 150];
    const ctx = canvasRef?.current?.getContext("2d");
    if (ctx) {
      drawCurve(
        ctx,
        cWidth,
        cHeight,
        trunkEnd,
        angle,
        l,
        props.curveRatio,
        props.curveDistanceRatio
        );
      }
    }, [props, angle]);

  return (
    <div className="bezier-container">
      <InfoLabel info={props.info} />
      <div>
        <h3>Adjust curve</h3>
        <div className="bezier-curve-grid">
          <div id="bezier-canvas">
            <canvas
              width={cWidth}
              height={cHeight}
              ref={canvasRef}
            />
          </div>
          <div id="bezier-vertical-slider">
            <Slider
              label={props.label1}
              minValue={0} maxValue={1}
              setValue={props.setCurveRatio}
              tabIndex={props.tabIndex}
              value={props.curveRatio}
              stepSize={0.05}
              sliderOnly
            />
          </div>
          <div id="bezier-horizontal-slider">
            <Slider
              label={props.label2}
              minValue={-1}
              maxValue={1}
              setValue={props.setCurveDistanceRatio}
              tabIndex={props.tabIndex + 1}
              value={props.curveDistanceRatio}
              stepSize={0.05}
              sliderOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
