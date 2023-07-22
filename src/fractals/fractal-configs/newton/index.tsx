import { draw } from "./draw";
import { Description } from "./description";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";
import { useMemo, useState } from "react";
import { getPolynomialStringForNroots } from "./maths-helpers";
import { MathJax } from "better-react-mathjax";

const sliderProps = {
  maxValue: 5,
  minValue: -5,
  stepSize: 0.2,
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
    <div className="large-eq" tabIndex={-1}>
      <MathJax key={`${co5}${co4}${co3}${co2}${co1}${constant}`}>{`\\(${poly} = 0 \\)`}</MathJax>
    </div >
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
    info: 'constant',
    label: <MathJax>{`\\(${constant}\\)`}</MathJax>,
    setValue: setConstant,
    ...sliderProps,
    tabIndex: 1,
    id: 'const',
  },
  {
    value: co1,
    info: 'coefficient for x',
    label: <MathJax>{`\\(${co1}x\\)`}</MathJax>,
    setValue: setCo1,
    ...sliderProps,
    tabIndex: 2,
    id: 'x1',
  },
  {
    value: co2,
    info: "coefficient for x^2",
    label: <MathJax>{`\\(${co2}x ^ 2\\)`}</MathJax>,
    setValue: setCo2,
    ...sliderProps,
    tabIndex: 3,
    id: 'x2',

  },
  {
    value: co3,
    info: "coefficient for x^3",
    label: <MathJax>{`\\(${co3}x ^ 3\\)`}</MathJax>,
    setValue: setCo3,
    ...sliderProps,
    tabIndex: 4,
    id: 'x3',
  },
  {
    value: co4,
    info: "coefficient for x^4",
    label: <MathJax>{`\\(${co4}x ^ 4\\)`}</MathJax>,
    setValue: setCo4,
    ...sliderProps,
    tabIndex: 5,
    id: 'x4',
  },
  {
    value: co5,
    info: "coefficient for x^5",
    label: <MathJax>{`\\(${co5}x ^ 5\\)`}</MathJax>,
    setValue: setA5,
    ...sliderProps,
    tabIndex: 6,
    id: 'x5',
  }
  ];

  const description = useMemo(() => Description(), []);

  return (<ComplexPlaneFractalDisplay
    createImageData={createImageData}
    range={3}
    startValue={[-2, -1.5]}
    description={description}
    draw={draw}
    drawParameters={{ constant, co1, co2, co3, co4, co5 }}
    nextLink="/#/mandelbrot"
    prevLink="/#/cantor"
    sliders={sliders}
    controlsChildren={controlsChildren(constant, co1, co2, co3, co4, co5)}
    title="Newton's fractal"
    xReal={0}
    xImaginary={0}
    descriptionTabIndex={24}
  />
  );
}