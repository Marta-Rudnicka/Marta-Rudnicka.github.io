import { draw } from "./draw";
import { Description } from "./description";
import { useContext, useEffect, useMemo, useState } from "react";
import { FractalDisplay } from "../../Components/FractalDisplay";
import { getSize } from "../../utils";
import { FullScreenContext } from "../../Components/ComplexPlane/ComplexPlane";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { NavTabContext } from "../../../App";
import { RadioControlProps } from "../../Components/Controls/RadioInput";
import { getMaxIterations } from "./algorithm";
import { BezierCurveControlProps } from "../../Components/Controls/BezierCurveControl";

export function LSystem() {
  const [fullScreen, setFullScreen] = useState(false);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [iterations, setIterations] = useState(14);
  const [angle, setAngle] = useState(15)
  const [lRatio, setLRatio] = useState(0.8)
  const [branches, setBranches] = useState(2)
  const [animate, setAnimate] = useState("on");
  const [curveRatio, setCurveRatio] = useState(0.3);
  const [curveDistanceRatio, setCurveDistanceRatio] = useState(0.1);
  const navTabIndex = useContext(NavTabContext);

  useEffect(() => {
    if (iterations > getMaxIterations(branches)) {
      setIterations(getMaxIterations)
    }
  }, [branches, iterations]);


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
    maxValue: getMaxIterations(branches),
    minValue: 1,
    setValue: setIterations,
    tabIndex: 0,
  },
  {
    value: angle,
    label: "angle between branches (degrees)",
    maxValue: 45,
    minValue: 1,
    setValue: setAngle,
    tabIndex: 1,
  },
  {
    value: lRatio,
    label: "branch length ratio between iterations",
    maxValue: 1,
    minValue: 0.1,
    setValue: setLRatio,
    tabIndex: 1,
    stepSize: 0.1,
    info: "the ratio of 0.8 means the a branch will have 0.8 of the length of the branch from the previous iteration"
  },
  {
    value: branches,
    label: "number of branches growing out of each branch",
    maxValue: 5,
    minValue: 2,
    setValue: setBranches,
    tabIndex: 2,
  }
  ];
  const radio: RadioControlProps[] = [{
    label: "Add each iteration with a delay (animate)",
    options: ["on", "off"],
    setValue: setAnimate,
    tabIndex: 2,
    value: animate,
  }];

  const curves: BezierCurveControlProps[] = [{
    curveRatio,
    curveDistanceRatio,
    angleDeg: angle,
    setCurveRatio,
    setCurveDistanceRatio,
    label1: "distance",
    label2: "ratio",
    tabIndex: 3,
  }]

  const description = useMemo(() => <Description ti={navTabIndex + 13} />, [navTabIndex]);
  const canvasKey = `${canvasSize}-${iterations}-${angle}-${lRatio}-${branches}`;

  return (
    <FullScreenContext.Provider value={fullScreen} >
      <FractalDisplay
        canvasInputs={{ key: canvasKey }}
        canvasSize={canvasSize}
        curves={curves}
        description={description}
        descriptionTabIndex={navTabIndex + 13}
        draw={draw}
        drawParameters={{ iterations, angle, lRatio, animate, branches, curveRatio, curveDistanceRatio }}
        nextLink="/#/dummy"
        prevLink="/#/dragon"
        radio={radio}
        setFullScreen={setFullScreen}
        sliders={sliders}
        title="L-system demo"
      />
    </FullScreenContext.Provider>
  );
}
