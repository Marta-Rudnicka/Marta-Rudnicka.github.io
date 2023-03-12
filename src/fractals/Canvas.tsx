import { MouseEventHandler, MouseEvent, useEffect, useState } from "react"
import { canvasInputs, DrawFunc, eventHandlerString, Parameters, Point } from "../types";
import { getSize } from "../utils";
import { EnterFullScreen } from "../components/icons/EnterFullScreen";
import { ExitFullScreen } from "../components/icons/ExitFullScreen";
import { Tooltip2 } from "@blueprintjs/popover2";

type CanvasProps = {
  id: string;
  fullScreen?: boolean;
  size: number;
  draw: DrawFunc;
  drawParameters: Parameters;
  handleClick: MouseEventHandler;
  canvasInputs?: canvasInputs;
}

export function Canvas(props: CanvasProps) {
  const [ c, setC ] = useState(document.getElementById(props.id) as HTMLCanvasElement)
  const offsetX = c?.getBoundingClientRect().left;
  const offsetY = c?.getBoundingClientRect().top;

  const size = getSize(props.fullScreen);
  const tooltipText = props.fullScreen ? 'exit full screen' : 'full screen view';

  useEffect(() => setC(document.getElementById(props.id) as HTMLCanvasElement), [props]);
  useEffect(() => {
    const drawArgs = {
      canvas: c,
      size,
      parameters: props.drawParameters,
    }
    c && props.draw(drawArgs);
  }, [props, size, c]);

  function getCursorPosition(e: MouseEvent<HTMLCanvasElement>): Point{
    if (props.fullScreen || (offsetX && offsetY)) {
      return [
        Math.round(e.clientX - offsetX), 
        Math.round(e.clientY - offsetY)
      ];
    }
    return [0, 0]
  }

  function manageEventHandler(
    e: MouseEvent<HTMLCanvasElement>,
    eventType: eventHandlerString
  ): void {
    const eventHandler = props?.canvasInputs ? props.canvasInputs[eventType] : null;
    if (!eventHandler) return;

    if (eventHandler.setValue) {
      eventHandler.setValue(getCursorPosition(e));
    }
    if (eventHandler.toggle) eventHandler?.toggle();
  }

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
        onMouseDown={(e) => manageEventHandler(e, "onMouseDown")}
        onMouseUp={(e) => manageEventHandler(e, "onMouseUp")}
        onMouseMove={(e) => manageEventHandler(e, "onMouseMove")}
        className="floating-box"
        height={props.size}
        width={props.size}
        id={props.id}
      />
    </div>)
}