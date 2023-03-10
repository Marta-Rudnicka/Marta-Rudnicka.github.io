import { DefaultLayout } from "./default-view/DefaultLayout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getSize } from "../utils";
import { FullScreenLayout } from "./full-screen-view/FullScreenLayout";
import { DrawFuncArgs, Parameters } from "../types";
import { ControlsWrapper } from "./ControlsWrapper";
import { SliderControlProps } from "./SliderControl";

type FractalDisplayProps = {
  fullScreen: boolean;
  setFullScreen: Dispatch<SetStateAction<boolean>>
  getIterationsNumber: (fullScreen: boolean) => number;
  draw: (args: DrawFuncArgs) => void;
  drawParameters: Parameters;
  description: string[];
  prevLink?: string;
  nextLink?: string;
  sliders: SliderControlProps[];
  title: string;
  adjustPropertiesToScreenSize?: () => void
}

export function FractalDisplay(props: FractalDisplayProps) {
  const [canvasSize, setCanvasSize] = useState(getSize(props.fullScreen))

  function handleResize(): void {
    setCanvasSize(getSize(props.fullScreen));
    props.adjustPropertiesToScreenSize && props.adjustPropertiesToScreenSize();
  }

  function handleChangeViewIconClick() {
    if (props.fullScreen) {
      props.setFullScreen(false)
    } else {
      props.setFullScreen(true);
      document.documentElement.requestFullscreen();
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const controls = <ControlsWrapper
    sliders={props.sliders}
    fullScreen={props.fullScreen}
  />;

  if (props.fullScreen) {
    return (
      <FullScreenLayout
        draw={props.draw}
        drawParameters={props.drawParameters}
        handleClick={handleChangeViewIconClick}
        canvasSize={canvasSize}
        controls={controls}
      />
    );
  }

  return (
    <DefaultLayout
      draw={props.draw}
      drawParameters={props.drawParameters}
      handleClick={handleChangeViewIconClick}
      conrols={controls}
      title={props.title}
      description={props.description}
      prevLink={props.prevLink}
      nextLink={props.nextLink}
      canvasSize={canvasSize}
    />
  );
}