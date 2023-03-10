import { MouseEventHandler, ReactElement } from "react"
import { canvasInputs, DrawFunc, Parameters } from "../../types";
import { Canvas } from "../Canvas";
import './full-screen-view.css';

type FullScreenLayoutProps = {
  draw: DrawFunc;
  drawParameters: Parameters;
  controls: ReactElement;
  handleClick: MouseEventHandler;
  canvasSize: number;
  canvasInputs?: canvasInputs;
}

export function FullScreenLayout(props: FullScreenLayoutProps) {

  return (
    <div className="full-screen-layout">
      <div className="canvas">
        <Canvas
          canvasInputs={props.canvasInputs}
          fullScreen={true}
          id="canvas"
          draw={props.draw}
          drawParameters={props.drawParameters}
          handleClick={props.handleClick}
          size={props.canvasSize}
        />
      </div>
      <div className="controls">
        {props.controls}
      </div>
    </div>
  );
}