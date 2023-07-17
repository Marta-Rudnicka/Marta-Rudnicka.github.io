import { draw } from "./draw";
import { Description } from "./description";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";
import { useState } from "react";
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { getPolynomialStringForNroots } from "./maths-helpers";

const sliderProps = {
  maxValue: 5,
  minValue: -5,
  stepSize: 0.1,
  labelPrecision: 0.1,
}

function controlsChildren(
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
) {
  const poly = getPolynomialStringForNroots(constant, co1, co2, co3, co4, co5, true);

  return (
    <div className="large-eq" key={`${co5}${co4}${co3}${co2}${co1}${constant}`}>
      <MathJaxContext>
        <MathJax> {`\\(${poly} = 0 \\)`}</MathJax>

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
  const [constant, setConstant] = useState(5)

  const sliders: SliderControlProps[] = [{
    value: constant,
    info: getInfo('f'),
    label: "+c",
    setValue: setConstant,
    ...sliderProps,
    tabIndex: 1,
  },
  {
    value: co1,
    info: getInfo('x'),
    label: "x",
    setValue: setCo1,
    ...sliderProps,
    tabIndex: 2,
  },
  {
    value: co2,
    info: getInfo("x^2"),
    label: "x^2",
    setValue: setCo2,
    ...sliderProps,
    tabIndex: 3,
  },
  {
    value: co3,
    info: getInfo("x^3"),
    label: "x^3",
    setValue: setCo3,
    ...sliderProps,
    tabIndex: 4,
  },
  {
    value: co4,
    info: getInfo("x^4"),
    label: "x^4",
    setValue: setCo4,
    ...sliderProps,
    tabIndex: 5,
  },
  {
    value: co5,
    info: getInfo("x^5"),
    label: "x^5",
    setValue: setA5,
    ...sliderProps,
    tabIndex: 6,
  }
  ];

  return (<ComplexPlaneFractalDisplay
    createImageData={createImageData}
    range={3}
    startValue={[-2, -1.5]}
    description={Description()}
    draw={draw}
    drawParameters={{ constant, co1, co2, co3, co4, co5 }}
    nextLink="/#/mandelbrot"
    prevLink="/#/cantor"
    sliders={sliders}
    controlsChildren={controlsChildren(constant, co1, co2, co3, co4, co5)}
    title="Newton's fractal- demo"
    xReal={0}
    xImaginary={0}
    descriptionTabIndex={7}
  />
  );
}
