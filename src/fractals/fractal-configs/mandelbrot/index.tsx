import { draw } from "./draw";
import { Description } from "./description";
import { useState } from "react";
import { SliderControlProps } from "../../SliderControl";
import { FractalDisplay } from "../../FractalDisplay";
// import { canvasInputs, Point } from "../../../types";
import { } from "./algorithm";
import { complex } from "mathjs";
import { getSize } from "../../utils";

export function MandelbrotSet() {
  const [fullScreen, setFullScreen] = useState(false);
  // const [trackingMouse, setTrackingMouse] = useState(false);
  // const [cursorPosition, setCursorPosition] = useState([0, 0] as Point);
  const [startValue, setStartValue] = useState(complex(-1.5, -1))
  const [range, setRange] = useState(1);
  // const [x, setX ] = useState([0, 0] as Point);
  // const [canvasSize, setCanvasSize] = useState(500);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));


  // const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  // const [prevCanvasSize, setPrevCanvasSize] = useState(null as number | null);

  // function handleX(): void {
  //   if(trackingMouse){
  //     setX(cursorPosition);
  //   }
  // }

  function adjustPropertiesToScreenSize() {
    return null;
  }

  const sliders: SliderControlProps[] = [];

  const canvasInputs = {}
  // const canvasInputs: canvasInputs = {
  //   onMouseDown: {
  //     value: cursorPosition,
  //     toggle: () => setTrackingMouse(true),
  //   },
  //   onMouseUp: {
  //     value: cursorPosition,
  //     toggle: () => setTrackingMouse(false),
  //   },
  //   onMouseMove: {
  //     value: cursorPosition,
  //     setValue: setCursorPosition,
  //   }
  // };

  return (<FractalDisplay
    adjustPropertiesToScreenSize={adjustPropertiesToScreenSize}
    canvasInputs={canvasInputs}
    canvasSize={canvasSize}
    description={Description()}
    draw={draw}
    drawParameters={{
      startValue,
      range,
    }}
    fullScreen={fullScreen}
    nextLink="/#/dummy"
    prevCanvasSize={100}
    prevLink="/#/example"
    setFullScreen={setFullScreen}
    sliders={sliders}
    title="Mandelbrot Set - demo"
  />
  );
}
