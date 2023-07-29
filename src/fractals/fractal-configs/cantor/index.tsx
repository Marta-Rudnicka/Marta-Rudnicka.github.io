import { CantorDimensionString, draw } from "./draw";
import { Description } from "./description";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FractalDisplay } from "../../Components/FractalDisplay";
import { getSize } from "../../utils";
import { FullScreenContext } from "../../Components/ComplexPlane/ComplexPlane";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { NavTabContext } from "../../../App";
import { RadioControlProps } from "../../Components/Controls/RadioInput";

function getMaxIterations(size: number) {
  let iterations = 4;
  while (Math.pow(3, iterations) <= size) {
    iterations++;
  }
  return iterations - 1;
}

export function CantorSet() {
  const [fullScreen, setFullScreen] = useState(false);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [iterations, setIterations] = useState(4);
  const [dimensions, setDimensions] = useState("1 dimension - Cantor set" as CantorDimensionString);
  const [showIntermediateStages, setShowIntermediateStages] = useState("yes");

  const maxIterations = getMaxIterations(canvasSize);
  const navTabIndex = useContext(NavTabContext);

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
  ];

  const radio: RadioControlProps[] = [
    {
      value: dimensions.toString(),
      label: "dimensions",
      setValue: setDimensions as Dispatch<SetStateAction<string>>,
      tabIndex: navTabIndex + 5,
      options: ["1 dimension - Cantor set", "2 dimensions - Cantor dust"],

    }]
  if (dimensions === "1 dimension - Cantor set") {
    radio.push({
      label: "Show intermediate steps",
      info: "If selected, it will show all the previous iterations. For example, if you select 4 iterations, you will see the images for 1, 2, 3, and 4 iterations",
      setValue: setShowIntermediateStages,
      tabIndex: navTabIndex + 6,
      value: showIntermediateStages,
      options: ["yes", "no"],
    })
  }


  return (
    <FullScreenContext.Provider value={fullScreen} >
      <FractalDisplay
        canvasInputs={{}}
        canvasSize={canvasSize}
        description={Description()}
        descriptionTabIndex={navTabIndex + 13}
        draw={draw}
        drawParameters={{ iterations, dimensions, showIntermediateStages }}
        nextLink="/#/newton"
        prevLink="/#/sierpinski"
        radio={radio}
        setFullScreen={setFullScreen}
        sliders={sliders}
        title="Cantor set - placeholder"
      />
    </FullScreenContext.Provider>

  );
}
