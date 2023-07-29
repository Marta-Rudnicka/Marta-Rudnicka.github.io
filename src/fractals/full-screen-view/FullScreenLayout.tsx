import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react"
import { canvasInputs, DrawFunc, Parameters } from "../../types";
import { Canvas } from "../Components/Canvas";
import './full-screen-view.css';

export type FullScreenLayoutProps = {
  altControls?: ReactNode;
  canvasInputs?: canvasInputs;
  canvasSize: number;
  controls: ReactElement;
  draw: DrawFunc;
  drawParameters: Parameters;
  handleClick: () => void;
  setInFocus: Dispatch<SetStateAction<string | null>>
}

export function FullScreenLayout(props: FullScreenLayoutProps) {

  return (
    <div className="full-screen-layout">
      <div className="canvas">
        <Canvas
          canvasInputs={props.canvasInputs}
          draw={props.draw}
          drawParameters={props.drawParameters}
          handleClick={props.handleClick}
          setInFocus={props.setInFocus}
          size={props.canvasSize}
        />
      </div>
      <div className="controls">
        {props.controls}
      </div>
    </div>
  );
}