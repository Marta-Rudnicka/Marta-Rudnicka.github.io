import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react"
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
          size={props.canvasSize}
          setInFocus={props.setInFocus}
        />
      </div>
      <div className="controls">
        {props.controls}
      </div>
    </div>
  );
}