import { useEffect } from "react"
import { DrawFunc } from "../types";
type CanvasProps = {
  id: string;
  fullScreen?: boolean;
  height?: string;
  width?: string;
  draw: DrawFunc;
  parameters: unknown;
}

export function Canvas(props: CanvasProps) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const whitespace = 30;
  let size = windowHeight < windowWidth ? windowHeight : windowWidth;
  if (!props.fullScreen) {
    size = windowHeight - whitespace < 0.75 * windowWidth 
    ? windowHeight - whitespace - 15
    : 0.75 * windowWidth;
  }
  console.dir({
    windowHeight, windowWidth, size
  })
  useEffect(() => {
    var canvas = document.getElementById(props.id) as HTMLCanvasElement;
    canvas.style.background = "white"; 
    const drawArgs = {
      canvas,
      size,
    }
    props.draw(drawArgs, props.parameters);
  }, [props, size]);
  return <canvas
    height={size}
    width={size}
    id={props.id}
  />
}