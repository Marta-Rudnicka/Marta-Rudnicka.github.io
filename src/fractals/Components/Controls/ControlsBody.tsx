import { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { SliderControl, SliderControlProps } from "./SliderControl";
import { ButtonPairControl, ButtonPairControlProps } from "./ButtonControlPair";
import { ControlProps } from "./index";
import { ChevronDown } from "../../../components/icons/ChevronDown";
import { ChevronUp } from "../../../components/icons/ChevronUp";
import { FullScreenContext } from "../ComplexPlane/ComplexPlane";
import { RadioControlProps, RadioInput } from "./RadioInput";
import { NavTabContext } from "../../../App";
import { BezierCurveControl, BezierCurveControlProps } from "./BezierCurveControl";

type ControlsProps = ControlProps & {
  allVisible: boolean,
  initTabIndex: number,
  altTabIndex?: number,
}

type AltControlProps = {
  children: ReactNode;
  tabIndex: number;
}

function renderSliderControls(
  initTabIndex: number,
  sliders?: SliderControlProps[],
  setShowSliderInfo?: Dispatch<SetStateAction<boolean>>,
): ReactNode[] {
  if (!sliders) return [];
  return sliders.map(slider => {
    const id = slider.id ? slider.id : slider.label?.toString();
    return (
      <SliderControl
        delayed={slider.delayed}
        inputRounding={slider.inputRounding}
        id={id}
        info={slider.info}
        key={id}
        label={slider.label}
        maxValue={slider.maxValue}
        minValue={slider.minValue}
        setShowSliderInfo={setShowSliderInfo}
        setValue={slider.setValue}
        sliderOnly={slider.sliderOnly}
        stepSize={slider.stepSize}
        tabIndex={2 * slider.tabIndex + initTabIndex}
        value={slider.value}
      />);
  }
  );
}

function renderButtonPairs(
  initTabIndex: number,
  buttonsPairs?: ButtonPairControlProps[],
): ReactNode[] {
  if (!buttonsPairs) return [];
  return buttonsPairs.map(bp =>
    <ButtonPairControl
      handleClick2={bp.handleClick2}
      handleClick1={bp.handleClick1}
      info={bp.info}
      key={bp.info || bp.label1}
      label1={bp.label1}
      label2={bp.label2}
      tabIndex={initTabIndex}
    />
  );
}

function renderRadioInputs(
  radioInputs?: RadioControlProps[],
): ReactNode[] {
  if (!radioInputs) return [];
  return radioInputs.map(r =>
    <RadioInput
      info={r.info}
      key={r.label}
      label={r.label}
      options={r.options}
      setValue={r.setValue}
      tabIndex={r.tabIndex}
      value={r.value}
    />
  );
}

function renderBezierCurveInputs(inputs?: BezierCurveControlProps[]){
  if (!inputs) return null;
  return inputs.map(i =>
    <BezierCurveControl
      key={i.info || i.label1}
      curveRatio={i.curveRatio}
      curveDistanceRatio={i.curveDistanceRatio}
      angleDeg={i.angleDeg}
      setCurveDistanceRatio={i.setCurveDistanceRatio}
      setCurveRatio={i.setCurveRatio}
      info={i.info}
      label1={i.label1}
      label2={i.label2}
      tabIndex={i.tabIndex}
    />
  );
}

function AltControls(props: AltControlProps) {
  const [show, setShow] = useState(false);

  if (!show) {
    return (
      <div>
        <button
          className='alt-button'
          onClick={() => setShow(true)}
          tabIndex={12}
        >
          Show alternative keyboard-only controls
          <ChevronDown />
        </button>
      </div>
    )
  }
  return (
    <div>
      <button
        className='alt-button'
        onClick={() => setShow(false)}
        tabIndex={12}
      >
        Hide alternative keyboard-only controls
        <ChevronUp />
      </button>
      {props.children}
    </div>
  );
}

export function ControlsBody(props: ControlsProps) {
  const fullScreen = useContext(FullScreenContext);
  const navTabIndex = useContext(NavTabContext);
  const [showSliderInfo, setShowSliderInfo] = useState(false);

  if (fullScreen! && !props.allVisible) {
    return null;
  }
  const initTabIndex = fullScreen ? 3 : navTabIndex + 3;
  const sliders = renderSliderControls(initTabIndex, props.sliders, setShowSliderInfo)
  const buttons = renderButtonPairs(initTabIndex, props.buttonPairs)
  const radio = renderRadioInputs(props.radioInputs);
  const curves = renderBezierCurveInputs(props.curves)

  return (
    <div>
      {buttons}
      {sliders}
      {showSliderInfo && <p className="slide-open">To set the desired value, release the mouse button or press 'Enter'.</p>}
      {radio}
      {curves}
      {!!props.altControls &&
        <AltControls tabIndex={props.altTabIndex || -1}>
          {props.altControls}
        </AltControls>
      }
    </div>
  );
}