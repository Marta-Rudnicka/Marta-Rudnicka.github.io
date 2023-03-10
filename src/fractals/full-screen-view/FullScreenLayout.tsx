import { MouseEventHandler, ReactElement } from "react"
import { DrawFunc, Parameters } from "../../types";
import { Canvas } from "../Canvas";
import './full-screen-view.css';

type FullScreenLayoutProps = {
  draw: DrawFunc;
  drawParameters: Parameters;
  controls: ReactElement;
  handleClick: MouseEventHandler;
  canvasSize: number;
}

export function FullScreenLayout(props: FullScreenLayoutProps) {

  return (
    <div className="full-screen-layout">
      <div className="canvas">
        <Canvas
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