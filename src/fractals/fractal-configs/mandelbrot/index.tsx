import { draw } from "./draw";
import { Description } from "./description";
import { useEffect, useState } from "react";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { FractalDisplay } from "../../Components/FractalDisplay";
// import { canvasInputs, Point } from "../../../types";
import { add, complex, round } from "mathjs";
import { getSize } from "../../utils";

export function MandelbrotSet() {
  const [fullScreen, setFullScreen] = useState(false);
  // const [trackingMouse, setTrackingMouse] = useState(false);
  // const [cursorPosition, setCursorPosition] = useState([0, 0] as Point);
  const [startValue, setStartValue] = useState(complex(-2, -1.5))
  const [range, setRange] = useState(3);
  // const [x, setX ] = useState([0, 0] as Point);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));

  useEffect(() => {
    const func = () => {
      const newSize = getSize(fullScreen);
      setCanvasSize(newSize);
    };
    window.addEventListener("resize", func);
    return () => window.removeEventListener("resize", func);
  }, [fullScreen, canvasSize]);


  // function handleX(): void {
  //   if(trackingMouse){
  //     setX(cursorPosition);
  //   }
  // }

  function adjustPropertiesToScreenSize() {
    return null;
  }

  function updateStartValue(increment: number) {
    const startValueShift = complex(increment, increment)
    const newValue = round(add(startValue, startValueShift), 4);
    setStartValue(newValue);
  }

  function zoomIn() {
    const increment = round(0.1 * range, 4)
    updateStartValue(increment);
    setRange(round(0.80 * range, 4));
    console.log(startValue.re, startValue.im, range)
  }

  function zoomOut() {
    const increment = round(-0.125 * range, 4)
    updateStartValue(increment)
    setRange(round(1.25 * range, 4));
    console.log(startValue.re, startValue.im, range)
  }

  const sliders: SliderControlProps[] = [];
  const buttonPairs = [{
      label1: 'zoom in',
      label2: 'zoom out',
      handleClick1: zoomIn,
      handleClick2: zoomOut,
      info: "zoom in or out"
  }];

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
    buttonPairs={buttonPairs}
    title="Mandelbrot Set - demo"
  />
  );
}
