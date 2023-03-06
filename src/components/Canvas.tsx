import { MouseEventHandler, useEffect } from "react"
import { DrawFunc, Parameters } from "../types";
import { getSize } from "../utils";
import { EnterFullScreen } from "./icons/EnterFullScreen";
import { ExitFullScreen } from "./icons/ExitFullScreen";
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
  

  useEffect(() => {
    console.log('useEffect')
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
    <div 
    className="change-view-icon"
    onClick={props.handleClick}
    >
      {props.fullScreen 
      ? <ExitFullScreen width={30} height={30}/>
      : <EnterFullScreen width={30} height={30}/> 
    }
    </div>
    <canvas
    height={props.size}
    width={props.size}
    id={props.id}
  />
  </div>)
}