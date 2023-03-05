import { useEffect } from "react"
import { DrawFunc, Parameters } from "../types";
import { getSize } from "../utils";
type CanvasProps = {
  id: string;
  fullScreen?: boolean;
  height?: string;
  width?: string;
  draw: DrawFunc;
  parameters: Parameters;
}

export function Canvas(props: CanvasProps) {

  const size = getSize(props.fullScreen)

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
  return <canvas
    height={size}
    width={size}
    id={props.id}
  />
}