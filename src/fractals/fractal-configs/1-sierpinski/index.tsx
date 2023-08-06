import { draw } from "./draw";
import { Description } from "./description";
import { useContext, useEffect, useState } from "react";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { FractalDisplay } from "../../Components/FractalDisplay";
import { findAffectedPoint, getSize, rescale } from "../../utils";
import { canvasInputs, Point, Triangle } from "../../../types";
import { equilateralTriangle } from "./algorithm";
import { SierpinskiAltControls } from "./altControls";
import { FullScreenContext } from "../../Components/ComplexPlane/ComplexPlane";
import { NavTabContext } from "../../../App";

function getIterationsNumber(fullScreen: boolean): number {
  const size = getSize(fullScreen);
  return Math.round((Math.log(size) / Math.log(2)) - 1);
}

export function SierpinskiTriangle() {
  const [fullScreen, setFullScreen] = useState(false);
  const [maxIterations, setMaxIterations] = useState(getIterationsNumber(fullScreen));
  const [iterations, setIterations] = useState(1);
  const [trackingMouse, setTrackingMouse] = useState(false);
  const [cursorPosition, setCursorPosition] = useState([0, 0] as Point);
  const [x, setX] = useState([0, 0] as Point);
  const [outerTriangle, setOuterTriangle] = useState(equilateralTriangle(getSize(fullScreen)))
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [prevCanvasSize, setPrevCanvasSize] = useState(null as number | null);
  const [animation, setAnimation] = useState(true as boolean);

  const altControls = <SierpinskiAltControls
    outerTriangle={outerTriangle}
    setOuterTriangle={setOuterTriangle}
    canvasSize={getSize(fullScreen)}
  />

  function handleX(): void {
    if (trackingMouse) {
      setX(cursorPosition);
    }
  }

  function reshapeTriangle() {
    const affectedPoint = findAffectedPoint(outerTriangle, x) as 'a' | 'b' | 'c';
    if (affectedPoint) {
      const t = outerTriangle;
      t[affectedPoint] = x;
      setOuterTriangle(t);
    }
  }

  function animate() {
    if (!animation) return;
    setTimeout(() => {
      const i = iterations;
      if (i < maxIterations) {
        setIterations(i + 1)
      } else {
        setIterations(1);
      }
    }, 1000
    );
  }

  function handleSliderInput(val: number) {
    setIterations(val);
    setAnimation(false);
  }

  useEffect(() => {
    if (animation) {
      animate();
    }
  });

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
    if (prevCanvasSize && prevCanvasSize !== canvasSize) {
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
    label: "iterations",
    maxValue: getIterationsNumber(fullScreen),
    minValue: 1,
    setValue: (value) => handleSliderInput(value as number),
    tabIndex: 0,
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
  const navTabIndex = useContext(NavTabContext);
  const altTabIndex = fullScreen ? 6 : navTabIndex + 6;
  const description = <Description ti={navTabIndex + 11} />;

  return (
    <FullScreenContext.Provider value={fullScreen} >
      <FractalDisplay
        adjustPropertiesToScreenSize={adjustPropertiesToScreenSize}
        altControls={altControls}
        altTabIndex={altTabIndex}
        canvasInputs={canvasInputs}
        canvasSize={canvasSize}
        description={description}
        descriptionTabIndex={navTabIndex + 11}
        draw={draw}
        drawParameters={
          {
            iterations,
            a: outerTriangle.a,
            b: outerTriangle.b,
            c: outerTriangle.c,
          }}
        nextLink="/#/cantor"
        prevCanvasSize={prevCanvasSize}
        setFullScreen={setFullScreen}
        sliders={sliders}
        title="Sierpiński triangle"
      />
    </FullScreenContext.Provider>
  );
}
