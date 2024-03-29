import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { canvasInputs, Complex, MainFractalControlProps, Point } from "../../../types";
import { getSize } from "../../utils";
import { FractalDisplay } from "../FractalDisplay";
import { ComplexPlaneAltControls } from "./altControls";
import { NewtonInputs } from "../../fractal-configs/3-newton/newton-algorithm";
type ComplexPlaneDrawParams = {
  imageData: ImageData,
  pixelOffset: Point,
  xReal: number,
  xImaginary: number,
  constant?: number,
  co1?: number,
  co2?: number,
  co3?: number,
  co4?: number,
  co5?: number,
}
type ComplexPlaneProps = MainFractalControlProps & {
  createImageData: (
    size: number,
    startValue: Complex,
    range: number,
    xReal: number,
    xImaginary: number,
    newtonInputs?: NewtonInputs,
  ) => ImageData;
  descriptionTabIndex: number,
  drawParameters?: NewtonInputs,
  footerTabIndex?: number;
  range: number,
  startValue: Complex,
  xReal: number,
  xImaginary: number,
}
export const FullScreenContext = createContext(false);

export function ComplexPlaneFractalDisplay(props: ComplexPlaneProps) {
  const [fullScreen, setFullScreen] = useState(false);
  const [trackingMouse, setTrackingMouse] = useState(false);
  const [cursorPosition, setCursorPosition] = useState([0, 0] as Point);
  const [startValue, setStartValue] = useState(props.startValue)
  const [range, setRange] = useState(props.range);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [pixelOffset, setPixelOffset] = useState([0, 0] as Point);
  const [inFocus, setInFocus] = useState(null as string | null);
  const imageData = useMemo(() =>
    props.createImageData(
      canvasSize,
      startValue,
      range,
      props.xReal,
      props.xImaginary,
      props.drawParameters,
    ), [canvasSize, range, startValue, props]);
  const startDragPosition = useRef([0, 0] as Point);
  const offset = useRef([0, 0] as Point);

  useEffect(() => {
    const func = () => {
      const newSize = getSize(fullScreen);
      setCanvasSize(newSize);
    };
    window.addEventListener("resize", func);
    return () => window.removeEventListener("resize", func);
  }, [fullScreen, canvasSize]);

  function handleMouseDown() {
    setTrackingMouse(true)
    const start = cursorPosition;
    startDragPosition.current = start;
  }

  function moveImage() {
    const currentPosition = cursorPosition;
    if (startDragPosition.current) {
      offset.current = [
        currentPosition[0] - startDragPosition.current[0],
        currentPosition[1] - startDragPosition.current[1],
      ]
    }
    setPixelOffset(offset.current);
  }

  function recalculateImage() {
    const pixelIncrement = range / canvasSize;
    if (offset.current[0] !== 0 || offset.current[1] !== 0) {
      const newStartValue: Complex = [
        startValue[0] - offset.current[0] * pixelIncrement,
        startValue[1] + offset.current[1] * pixelIncrement
      ];
      setPixelOffset([0, 0]);
      setStartValue(newStartValue);
      offset.current = [0, 0];
    }
  }

  function handleMouseMove(val: Point): void {
    setCursorPosition(val)
    if (trackingMouse) {
      moveImage();
    }
  }

  function handleMouseUp() {
    recalculateImage();
    setTrackingMouse(false);
    startDragPosition.current = [0, 0];
  }

  function updateStartValue(range: number) {
    const increment = range / canvasSize;
    let newValue: Complex = [...startValue]
    newValue[0] = startValue[0] + increment;
    newValue[1] = startValue[1] + increment;
    setStartValue(newValue);
  }

  function zoomIn() {
    const oldRange = range;
    updateStartValue(oldRange);
    setRange(oldRange * 0.8);

  }

  function zoomOut() {
    const oldRange = range;
    updateStartValue(oldRange);
    setRange(oldRange * 1.25);
  }

  const buttonPairs = [{
    label1: 'zoom in',
    label2: 'zoom out',
    handleClick1: zoomIn,
    handleClick2: zoomOut,
    tabIndex: 1,
  }];

  const canvasInputs: canvasInputs = {
    onMouseDown: {
      value: cursorPosition,
      toggle: () => handleMouseDown(),
    },
    onMouseUp: {
      value: cursorPosition,
      toggle: () => handleMouseUp(),
    },
    onMouseMove: {
      value: cursorPosition,
      setValue: handleMouseMove,
    }
  };

  const complexDrawParameters: ComplexPlaneDrawParams = {
    ...props.drawParameters,
    imageData,
    pixelOffset: pixelOffset,
    xReal: props.xReal,
    xImaginary: props.xImaginary,
  }
  return (
    <FullScreenContext.Provider value={fullScreen} >
      <ComplexPlaneAltControls
        canvasSize={canvasSize}
        handleMouseUp={handleMouseUp}
        handleMouseMove={handleMouseMove}
        handleMouseDown={handleMouseDown}
        inFocus={inFocus}
        setCursorPosition={setCursorPosition}
        setInFocus={setInFocus}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      >
        <FractalDisplay
          buttonPairs={buttonPairs}
          canvasInputs={canvasInputs}
          controlsChildren={props.controlsChildren}
          canvasSize={canvasSize}
          description={props.description}
          descriptionTabIndex={props.descriptionTabIndex}
          footerTabIndex={props.footerTabIndex}
          draw={props.draw}
          drawParameters={complexDrawParameters}
          nextLink={props.nextLink}
          prevCanvasSize={100}
          prevLink={props.prevLink}
          setFullScreen={setFullScreen}
          setInFocus={setInFocus}
          sliders={props.sliders}
          title={props.title}
        />
      </ComplexPlaneAltControls>
    </FullScreenContext.Provider>
  );
}
