import { ReactElement, ReactNode } from "react"
import { canvasInputs, DrawFunc, Parameters } from "../../types";
import { Canvas } from "../Components/Canvas";
import './full-screen-view.css';

export type FullScreenLayoutProps = {
  draw: DrawFunc;
  drawParameters: Parameters;
  controls: ReactElement;
  handleClick: () => void;
  canvasSize: number;
  canvasInputs?: canvasInputs;
  altControls?: ReactNode;
}

export function FullScreenLayout(props: FullScreenLayoutProps) {

  return (
    <div className="full-screen-layout">
      <div className="canvas">
        <Canvas
          canvasInputs={props.canvasInputs}
          fullScreen={true}
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