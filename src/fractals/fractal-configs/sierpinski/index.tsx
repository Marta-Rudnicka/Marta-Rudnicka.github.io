import { draw } from "./draw";
import { description } from "./description";
import { useEffect, useState } from "react";
import { SliderControlProps } from "../../SliderControl";
import { FractalDisplay } from "../../FractalDisplay";
import { findAffectedPoint, getSize } from "../../../utils";
import { canvasInputs, Point } from "../../../types";
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
  useEffect(() => reshapeTriangle)


  function adjustPropertiesToScreenSize() {
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
    description={description}
    draw={draw}
    drawParameters={
      { 
        iterations, 
        a: outerTriangle.a,
        b: outerTriangle.b,
        c: outerTriangle.c,
      }}
    fullScreen={fullScreen}
    setFullScreen={setFullScreen}
    getIterationsNumber={getIterationsNumber}
    sliders={sliders}
    canvasInputs={canvasInputs}
    title="Sierpiński triangle - work in progress"
    nextLink="/#/dummy"
    prevLink="/#/dummy"
  />
  );
}
