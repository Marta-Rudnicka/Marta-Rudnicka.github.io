import { draw } from "./draw";
import { Description } from "./description";
import { useEffect, useState } from "react";
import { SliderControlProps } from "../../SliderControl";
import { FractalDisplay } from "../../FractalDisplay";
import { findAffectedPoint, getSize, rescale } from "../../utils";
import { canvasInputs, Point, Triangle } from "../../../types";
import { equilateralTriangle } from "./algorithm";

function getIterationsNumber(fullScreen: boolean): number {
  const size = getSize(fullScreen);
  return Math.round((Math.log(size) / Math.log(2)) - 1);
}

export function SierpinskiTriangle() {
  const [fullScreen, setFullScreen] = useState(false);
  const [maxIterations, setMaxIterations] = useState(getIterationsNumber(fullScreen));
  const [iterations, setIterations] = useState(5);
  const [trackingMouse, setTrackingMouse] = useState(false);
  const [cursorPosition, setCursorPosition] = useState([0, 0] as Point);
  const [x, setX ] = useState([0, 0] as Point);
  const [outerTriangle, setOuterTriangle] = useState(equilateralTriangle(getSize(fullScreen)))
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [prevCanvasSize, setPrevCanvasSize] = useState(null as number | null);

  function handleX(): void {
    if(trackingMouse){
      setX(cursorPosition);
    }
  }

  function reshapeTriangle(){
    const affectedPoint = findAffectedPoint(outerTriangle, x) as 'a' | 'b' | 'c';
    if(affectedPoint){
      const t = outerTriangle;
      t[affectedPoint] = x;
      setOuterTriangle(t);
    }
  }

  useEffect(() => handleX);
  useEffect(() => reshapeTriangle);

  useEffect(() => {
    const func = () => {
      const oldSize = canvasSize;
      const newSize = getSize(fullScreen);
      setPrevCanvasSize(oldSize);
      setCanvasSize(newSize);
      const newTriangle = rescale(oldSize, newSize, outerTriangle);
      setOuterTriangle(newTriangle as Triangle);
    };
    window.addEventListener("resize", func);
    return () => window.removeEventListener("resize", func);
  }, [fullScreen, canvasSize]);

  function adjustPropertiesToScreenSize() {
    if (prevCanvasSize && prevCanvasSize !== canvasSize){
      const newTriangle = rescale(prevCanvasSize, canvasSize, outerTriangle) as Triangle;
      setOuterTriangle(newTriangle);
    }
    setMaxIterations(getIterationsNumber(fullScreen));
    if (iterations > maxIterations) {
      setIterations(maxIterations);
    }
  }

  const sliders: SliderControlProps[] = [{
    value: iterations,
    info: "dummy info",
    label: "iterations",
    maxValue: getIterationsNumber(fullScreen),
    minValue: 1,
    setValue: setIterations,
  }];

  const canvasInputs: canvasInputs = {
    onMouseDown: {
      value: cursorPosition,
      toggle: () => setTrackingMouse(true),
    },
    onMouseUp: {
      value: cursorPosition,
      toggle: () => setTrackingMouse(false),
    },
    onMouseMove: {
      value: cursorPosition,
      setValue: setCursorPosition,
    }
  };

  return (<FractalDisplay
    adjustPropertiesToScreenSize={adjustPropertiesToScreenSize}
    canvasInputs={canvasInputs}
    canvasSize={canvasSize}
    description={Description()}
    draw={draw}
    drawParameters={
      { 
        iterations, 
        a: outerTriangle.a,
        b: outerTriangle.b,
        c: outerTriangle.c,
      }}
    fullScreen={fullScreen}
    nextLink="/#/dummy"
    prevCanvasSize={prevCanvasSize}
    prevLink="/#/dummy"
    setFullScreen={setFullScreen}
    sliders={sliders}
    title="Sierpiński triangle - demo"
  />
  );
}
