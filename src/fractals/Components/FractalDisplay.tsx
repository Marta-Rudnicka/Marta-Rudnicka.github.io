import { DefaultLayout } from "../default-view/DefaultLayout";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { FullScreenLayout } from "../full-screen-view/FullScreenLayout";
import { canvasInputs, DrawFuncArgs, Parameters, ResizeHandler } from "../../types";
import { ControlsWrapper } from "./Controls/ControlsWrapper";
import { SliderControlProps } from "./Controls/SliderControl";
import { ButtonPairControlProps } from "./Controls/ButtonControlPair";

type FractalDisplayProps = {
  adjustPropertiesToScreenSize?: ResizeHandler;
  canvasInputs: canvasInputs;
  canvasSize: number;
  description: ReactNode;
  draw: (args: DrawFuncArgs) => void;
  drawParameters: Parameters;
  fullScreen: boolean;
  nextLink?: string;
  prevCanvasSize: number | null,
  prevLink?: string;
  setFullScreen: Dispatch<SetStateAction<boolean>>
  sliders?: SliderControlProps[];
  buttonPairs?: ButtonPairControlProps[];
  title: string;
}

export function FractalDisplay(props: FractalDisplayProps) {
  const { fullScreen, adjustPropertiesToScreenSize, canvasSize } = props;

  function handleChangeViewIconClick() {
    if (props.fullScreen) {
      props.setFullScreen(false)
    } else {
      props.setFullScreen(true);
      document.documentElement.requestFullscreen();
    }
  }
  
  useEffect(() => {
    function handleResize(): void {
      adjustPropertiesToScreenSize && adjustPropertiesToScreenSize(
        props.prevCanvasSize,
        props.canvasSize
      );
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fullScreen]);

  const controls = <ControlsWrapper
    sliders={props.sliders || []}
    buttonPairs={props.buttonPairs || []}
    fullScreen={props.fullScreen}
  />;

  if (props.fullScreen) {
    return (
      <FullScreenLayout
        draw={props.draw}
        drawParameters={props.drawParameters}
        handleClick={handleChangeViewIconClick}
        canvasSize={canvasSize}
        canvasInputs={props.canvasInputs}
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
      canvasInputs={props.canvasInputs}
    />
  );
}
