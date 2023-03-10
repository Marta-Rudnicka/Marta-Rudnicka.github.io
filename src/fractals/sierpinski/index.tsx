import { draw } from "./draw";
import { description } from "./description";
import { useState } from "react";
import { getIterationsNumber } from "../../utils";
import { SliderControlProps } from "../../components/SliderControl";
import { FractalDisplay } from "../../components/FractalDisplay";

export function SierpinskiTriangle() {
  const [fullScreen, setFullScreen] = useState(false);
  const [maxIterations, setMaxIterations] = useState(getIterationsNumber(fullScreen));
  const [iterations, setIterations] = useState(5)

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

  return (<FractalDisplay
    adjustPropertiesToScreenSize={adjustPropertiesToScreenSize}
    description={description}
    draw={draw}
    drawParameters={{iterations: iterations}}
    fullScreen={fullScreen}
    setFullScreen={setFullScreen}
    getIterationsNumber={getIterationsNumber}
    sliders={sliders}
    title="Sierpiński triangle - work in progress"
    nextLink="/#/dummy"
    prevLink="/#/dummy"
  />
  );
}
