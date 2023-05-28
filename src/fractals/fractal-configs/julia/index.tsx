import { draw } from "./draw";
import { Description } from "./description";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { complex } from "mathjs";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";
import { useState } from "react";

export function JuliaSet() {
  const [cReal, setCReal] = useState(-0.12256);
  const [cImaginary, setCImaginary] = useState(0.74486);

  const sliders: SliderControlProps[] = [{
    value: cReal,
    info: "Real part for c (position on the x axis)",
    label: "c real part",
    maxValue: 2,
    minValue: -2,
    setValue: setCReal,
    labelStepSize: 0.00001
  },
{
  value: cImaginary,
  info: "Imaginary part for c (position on the x axis)",
  label: "c imaginary part",
  maxValue: 2,
  minValue: -2,
  setValue: setCImaginary,
  labelStepSize: 0.00001
}];

  return (<ComplexPlaneFractalDisplay
    createImageData={createImageData}
    range={3}
    startValue={complex(-2, -1.5)}
    description={Description()}
    draw={draw}
    nextLink="/#/dummy"
    prevLink="/#/example"
    sliders={sliders}
    title="Mandelbrot Set - demo"
  />
  );
}
