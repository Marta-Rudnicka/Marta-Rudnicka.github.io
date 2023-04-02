import { MouseEventHandler, MouseEvent, useEffect, useRef } from "react"
import { canvasInputs, DrawFunc, eventHandlerString, Parameters, Point } from "../types";
import { EnterFullScreen } from "../components/icons/EnterFullScreen";
import { ExitFullScreen } from "../components/icons/ExitFullScreen";
import { Tooltip2 } from "@blueprintjs/popover2";

type CanvasProps = {
  fullScreen?: boolean;
  size: number;
  draw: DrawFunc;
  drawParameters: Parameters;
  handleClick: MouseEventHandler;
  canvasInputs?: canvasInputs;
}

export function Canvas(props: CanvasProps) {
  const c = useRef<HTMLCanvasElement>(null);
  const offsetX = c?.current?.getBoundingClientRect().left;
  const offsetY = c?.current?.getBoundingClientRect().top;

  const { size } = props; //getSize(props.fullScreen);
  const tooltipText = props.fullScreen ? 'exit full screen' : 'full screen view';

  useEffect(() => {
    if (c && c.current ) {
    const drawArgs = {
      canvas: c.current,
      size,
      parameters: props.drawParameters,
    }
    
      props.draw(drawArgs);
    }
  }, [props, size, c, props.drawParameters]);

  function getCursorPosition(e: MouseEvent<HTMLCanvasElement>): Point{
    if (props.fullScreen || (offsetX && offsetY)) {
      return [
        Math.round(e.clientX - ( offsetX || 0)), 
        Math.round(e.clientY - ( offsetY || 0))
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
        ref={c}
        onMouseDown={(e) => manageEventHandler(e, "onMouseDown")}
        onMouseUp={(e) => manageEventHandler(e, "onMouseUp")}
        onMouseMove={(e) => manageEventHandler(e, "onMouseMove")}
        className="floating-box"
        height={size}
        width={size}
      />
    </div>)
}