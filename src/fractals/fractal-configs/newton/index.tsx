import { draw } from "./draw";
import { Description } from "./description";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { complex } from "mathjs";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";
import { useState } from "react";
import { MathJaxContext, MathJax } from 'better-react-mathjax';

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
  const [a5, setA5] = useState(0)
  const [b4, setB4] = useState(0)
  const [c3, setC3] = useState(2)
  const [d2, setD2] = useState(0)
  const [e1, setE1] = useState(0)
  const [f, setF] = useState(27)

  const sliders: SliderControlProps[] = [{
    value: f,
    info: getInfo('f'),
    label: "f",
    setValue: setF,
    ...sliderProps,
  },
  {
    value: e1,
    info: getInfo('e'),
    label: "e",
    setValue: setE1,
    ...sliderProps
  },
  {
    value: d2,
    info:  getInfo("d"),
    label: "d",
    setValue: setD2,
    ...sliderProps
  },
  {
    value: c3,
    info:  getInfo("c"),
    label: "c",
    setValue: setC3,
    ...sliderProps
  },
  {
    value: b4,
    info:  getInfo("b"),
    label: "b",
    setValue: setB4,
    ...sliderProps
  },
  {
    value: a5,
    info:  getInfo("a"),
    label: "a",
    setValue: setA5,
    ...sliderProps
  }
];

  return (<ComplexPlaneFractalDisplay
    createImageData={createImageData}
    range={3}
    startValue={complex(-2, -1.5)}
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
