import { draw } from "./draw";
import { Description } from "./description";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";
import { useState } from "react";
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { Complex } from "../../../types";

const sliderProps = {
  maxValue: 5,
  minValue: -5,
  stepSize: 0.1,
  labelPrecision: 1,
}

function controlsChildren() {
  return (
    <div className="large-eq">
      <MathJaxContext>
        <MathJax> {'\\(ax^5 + bx^4 + cx^3 + dx^2 +ex + f = 0 \\)'}</MathJax>
      </MathJaxContext>
    </div >
  )
}

function getInfo(m: string) {
  return (
    <div>
      {m} in  
    <MathJaxContext>
      <MathJax> {'\\(ax^5 + bx^4 + cx^3 + dx^2 +ex + f = 0 \\)'}</MathJax>
    </MathJaxContext> 
    </div>
  )
}
export function Newton() {
  const [co5, setA5] = useState(0)
  const [co4, setCo4] = useState(0)
  const [co3, setCo3] = useState(2)
  const [co2, setCo2] = useState(0)
  const [co1, setCo1] = useState(0)
  const [constant, setConstant] = useState(27)

  const sliders: SliderControlProps[] = [{
    value: constant,
    info: getInfo('f'),
    label: "f",
    setValue: setConstant,
    ...sliderProps,
  },
  {
    value: co1,
    info: getInfo('e'),
    label: "e",
    setValue: setCo1,
    ...sliderProps
  },
  {
    value: co2,
    info:  getInfo("d"),
    label: "d",
    setValue: setCo2,
    ...sliderProps
  },
  {
    value: co3,
    info:  getInfo("c"),
    label: "c",
    setValue: setCo3,
    ...sliderProps
  },
  {
    value: co4,
    info:  getInfo("b"),
    label: "b",
    setValue: setCo4,
    ...sliderProps
  },
  {
    value: co5,
    info:  getInfo("a"),
    label: "a",
    setValue: setA5,
    ...sliderProps
  }
];

  return (<ComplexPlaneFractalDisplay
    createImageData={createImageData}
    range={3}
    startValue={[-2, -1.5]}
    description={Description()}
    draw={draw}
    nextLink="/#/mandelbrot"
    prevLink="/#/cantor"
    sliders={sliders}
    controlsChildren={controlsChildren()}
    title="Newton's fractal- demo"
    xReal={0}
    xImaginary={0}
  />
  );
}
