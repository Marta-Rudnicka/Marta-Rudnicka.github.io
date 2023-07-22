import { draw } from "./draw";
import { Description } from "./description";
import { useContext, useEffect, useState } from "react";
import { FractalDisplay } from "../../Components/FractalDisplay";
import { getSize } from "../../utils";
import { FullScreenContext } from "../../Components/ComplexPlane/ComplexPlane";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { NavTabContext } from "../../../App";

export function CantorSet() {
  const [fullScreen, setFullScreen] = useState(false);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [iterations, setIterations] = useState(3);
  const [dimensions, setDimensions] = useState(1);

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
    maxValue: 6,// getIterationsNumber(fullScreen),
    minValue: 1,
    setValue: setIterations,
    tabIndex: 0,
  },
  {
    value: iterations,
    label: "dimensions",
    maxValue: 2,
    minValue: 1,
    setValue: setDimensions,
    tabIndex: 1,
  }
  ];

  const navTabIndex = useContext(NavTabContext);

  return (
    <FullScreenContext.Provider value={fullScreen} >
      <FractalDisplay
        canvasInputs={{}}
        canvasSize={canvasSize}
        description={Description()}
        descriptionTabIndex={navTabIndex + 11}
        draw={draw}
        drawParameters={{ iterations, dimensions }}
        nextLink="/#/newton"
        prevLink="/#/sierpinski"
        setFullScreen={setFullScreen}
        title="Cantor set - placeholder"
        sliders={sliders}

      />
    </FullScreenContext.Provider>

  );
}
