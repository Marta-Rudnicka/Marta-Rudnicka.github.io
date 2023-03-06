import { MouseEventHandler, ReactElement } from "react"
import { DrawFunc, Parameters } from "../../types";
import { Canvas } from "../Canvas";
import './full-screen-view.css';

type FullScreenLayoutProps = {
  draw: DrawFunc;
  conrols: ReactElement;
  parameters: Parameters;
  handleClick: MouseEventHandler;
  size: number;
}

export function FullScreenLayout(props: FullScreenLayoutProps) {
  document.documentElement.requestFullscreen();
  return (
    <div className="full-screen-layout">
      <div className="canvas">
        <Canvas
          fullScreen={true}
          id="canvas"
          draw={props.draw}
          parameters={props.parameters}
          handleClick={props.handleClick}
          size={props.size}
        />
      </div>
      <div className="controls">
        {props.conrols}
      </div>
    </div>
  );
}