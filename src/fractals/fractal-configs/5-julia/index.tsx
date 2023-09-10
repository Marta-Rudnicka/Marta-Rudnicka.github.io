import { useContext, useMemo, useState } from "react";
import { draw } from "./draw";
import { Description } from "./description";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { NavTabContext } from "../../../App";

export function JuliaSet() {
  const [cReal, setCReal] = useState(-0.12256);
  const [cImaginary, setCImaginary] = useState(0.74486);

  const sliderProps = {
    maxValue: 1,
    minValue: -1,
    stepSize: 0.01,
    delayed: true,
    inputRounding: 2,
  }

  const sliders: SliderControlProps[] = [{
    value: cReal,
    info: "Real part for c (position on the x axis)",
    label: "c real part",
    setValue: setCReal,
    tabIndex: 1,
    ...sliderProps,
  },
  {
    value: cImaginary,
    info: "Imaginary part for c (position on the y axis)",
    label: "c imaginary part",
    setValue: setCImaginary,
    tabIndex: 2,
    ...sliderProps,
  }];

  const navTabIndex = useContext(NavTabContext);
  const description = useMemo(() => <Description ti={navTabIndex + 10} />, [navTabIndex]);

  return (<ComplexPlaneFractalDisplay
    createImageData={createImageData}
    descriptionTabIndex={navTabIndex + 10}
    description={description}
    draw={draw}
    nextLink="/#/dummy"
    prevLink="/#/mandelbrot"
    range={3}
    sliders={sliders}
    startValue={[-1.5, -1.5]}
    title="Julia Set"
    xImaginary={cImaginary}
    xReal={cReal}
  />
  );
}
