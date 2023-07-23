import { draw } from "./draw";
import { Description } from "./description";
import { useContext, useEffect, useState } from "react";
import { FractalDisplay } from "../../Components/FractalDisplay";
import { getSize } from "../../utils";
import { FullScreenContext } from "../../Components/ComplexPlane/ComplexPlane";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { NavTabContext } from "../../../App";

function getMaxIterations(size: number) {
  let iterations = 4;
  while (Math.pow(3, iterations) <= size) {
    iterations ++;
  }
  return iterations - 1;
}

export function CantorSet() {
  const [fullScreen, setFullScreen] = useState(false);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [iterations, setIterations] = useState(4);
  const [dimensions, setDimensions] = useState(2);
  const [showIntermediateStages, setShowIntermediateStages] = useState("yes");

  const maxIterations = getMaxIterations(canvasSize);

  useEffect(() => {
    const func = () => {
      const newSize = getSize(fullScreen);
      setCanvasSize(newSize);
    };
    window.addEventListener("resize", func);
    return () => window.removeEventListener("resize", func);
  }, [fullScreen, canvasSize]);

  const sliders: SliderControlProps[] = [{
    value: iterations,
    label: "iterations",
    maxValue: maxIterations,
    minValue: 1,
    setValue: setIterations,
    tabIndex: 0,
  },
  {
    value: dimensions,
    label: "dimensions",
    maxValue: 2,
    minValue: 1,
    setValue: setDimensions,
    tabIndex: 1,
  },
  ];

  const radio = dimensions === 1 ? [{
      label: "Show intermediate steps",
      info: "If selected, it will show all the previous iterations. For example, if you select 4 iterations, you will see the images for 1, 2, 3, and 4 iterations",
      setValue: setShowIntermediateStages,
      tabIndex: 10,
      value: showIntermediateStages,
      options: ["yes", "no"],
  }] : [];

  const navTabIndex = useContext(NavTabContext);

  return (
    <FullScreenContext.Provider value={fullScreen} >
      <FractalDisplay
        canvasInputs={{}}
        canvasSize={canvasSize}
        description={Description()}
        descriptionTabIndex={navTabIndex + 11}
        draw={draw}
        drawParameters={{ iterations, dimensions, showIntermediateStages }}
        nextLink="/#/newton"
        prevLink="/#/sierpinski"
        setFullScreen={setFullScreen}
        title="Cantor set - placeholder"
        sliders={sliders}
        radio={radio}
      />
    </FullScreenContext.Provider>

  );
}
