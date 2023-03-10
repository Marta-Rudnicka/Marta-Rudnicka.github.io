import { MouseEventHandler, useEffect } from "react"
import { DrawFunc, Parameters } from "../types";
import { getSize } from "../utils";
import { EnterFullScreen } from "./icons/EnterFullScreen";
import { ExitFullScreen } from "./icons/ExitFullScreen";
import { Tooltip2 } from "@blueprintjs/popover2";

type CanvasProps = {
  id: string;
  fullScreen?: boolean;
  size: number;
  draw: DrawFunc;
  parameters: Parameters;
  handleClick: MouseEventHandler;
}

export function Canvas(props: CanvasProps) {

  const size = getSize(props.fullScreen);
  const tooltipText = props.fullScreen ? 'exit full screen' : 'full screen view';

  useEffect(() => {
    const canvas = document.getElementById(props.id) as HTMLCanvasElement;
    canvas.style.background = "white";
    const drawArgs = {
      canvas,
      size,
      parameters: props.parameters,
    }
    props.draw(drawArgs);
  }, [props, size]);
  return (
    <div className="canvas-wrapper">
      <div className="tooltip-wrapper">
        <Tooltip2
          content={<div className="tooltip">{tooltipText}</div>}
          hoverOpenDelay={500}
        >
          <div
            className="change-view-icon"
            onClick={props.handleClick}
          >
            {props.fullScreen
              ? <ExitFullScreen width={25} height={25} />
              : <EnterFullScreen width={25} height={25} />
            }
          </div>
        </Tooltip2>
      </div>
      <canvas
        className="floating-box"
        height={props.size}
        width={props.size}
        id={props.id}
      />
    </div>)
}