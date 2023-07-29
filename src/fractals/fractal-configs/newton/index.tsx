import { draw } from "./draw";
import { Description } from "./description";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";
import { useContext, useMemo, useState } from "react";
import { getPolynomialStringForNroots } from "./maths-helpers";
import { MathJax } from "better-react-mathjax";
import { NavTabContext } from "../../../App";

const sliderProps = {
  maxValue: 8,
  minValue: -8,
  stepSize: 0.2,
  delayed: true,
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
  const [co3, setCo3] = useState(1)
  const [co2, setCo2] = useState(0)
  const [co1, setCo1] = useState(0)
  const [constant, setConstant] = useState(8)

  const sliders: SliderControlProps[] = [{
    value: constant,
    label: <MathJax>{`\\(${constant}\\)`}</MathJax>,
    setValue: setConstant,
    tabIndex: 1,
    id: 'const',
    ...sliderProps,
  },
  {
    value: co1,
    label: <MathJax>{`\\(${co1}x\\)`}</MathJax>,
    setValue: setCo1,
    tabIndex: 2,
    id: 'x1',
    ...sliderProps,
  },
  {
    value: co2,
    label: <MathJax>{`\\(${co2}x ^ 2\\)`}</MathJax>,
    setValue: setCo2,
    tabIndex: 3,
    id: 'x2',
    ...sliderProps,

  },
  {
    value: co3,
    label: <MathJax>{`\\(${co3}x ^ 3\\)`}</MathJax>,
    setValue: setCo3,
    tabIndex: 4,
    id: 'x3',
    ...sliderProps,
  },
  {
    value: co4,
    label: <MathJax>{`\\(${co4}x ^ 4\\)`}</MathJax>,
    setValue: setCo4,
    tabIndex: 5,
    id: 'x4',
    ...sliderProps,
  },
  {
    value: co5,
    label: <MathJax>{`\\(${co5}x ^ 5\\)`}</MathJax>,
    setValue: setA5,
    tabIndex: 6,
    id: 'x5',
    ...sliderProps,
  }
  ];

  const navTabIndex = useContext(NavTabContext);
  const description = useMemo(() => <Description ti={navTabIndex + 17} />, [navTabIndex]);

  return (<ComplexPlaneFractalDisplay
    controlsChildren={controlsChildren(constant, co1, co2, co3, co4, co5)}
    createImageData={createImageData}
    description={description}
    descriptionTabIndex={navTabIndex + 17}
    draw={draw}
    drawParameters={{ constant, co1, co2, co3, co4, co5 }}
    nextLink="/#/mandelbrot"
    prevLink="/#/cantor"
    range={3}
    sliders={sliders}
    startValue={[-1.2, -1.5]}
    title="Newton's fractal"
    xImaginary={0}
    xReal={0}
  />
  );
}