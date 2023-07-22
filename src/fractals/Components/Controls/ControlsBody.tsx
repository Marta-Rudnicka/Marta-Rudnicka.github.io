import { ReactNode, useContext, useState } from "react";
import { SliderControl, SliderControlProps } from "./SliderControl";
import { ButtonPairControl, ButtonPairControlProps } from "./ButtonControlPair";
import { ControlProps } from "./index";
import { ChevronDown } from "../../../components/icons/ChevronDown";
import { ChevronUp } from "../../../components/icons/ChevronUp";
import { FullScreenContext } from "../ComplexPlane/ComplexPlane";
import { RadioControlProps, RadioInput } from "./RadioInput";

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
): ReactNode[] {
  if (!sliders) return [];
  return sliders.map(slider => {
    const id = slider.id ? slider.id : slider.label?.toString();
    return (
    <SliderControl
      key={id}
      label={slider.label}
      setValue={slider.setValue}
      maxValue={slider.maxValue}
      minValue={slider.minValue}
      value={slider.value}
      info={slider.info}
      stepSize={slider.stepSize}
      tabIndex={2 * slider.tabIndex + initTabIndex}
      id={id}
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
      key={bp.info}
      handleClick1={bp.handleClick1}
      handleClick2={bp.handleClick2}
      info={bp.info}
      label1={bp.label1}
      label2={bp.label2}
      tabIndex={initTabIndex}
    />
  );
}

function renderRadioInputs(
  initTabIndex: number,
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
      tabIndex={initTabIndex}
      value={r.value}
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
  if (fullScreen! && !props.allVisible) {
    return null;
  }
  const initTabIndex = fullScreen ? 3 : 10;
  const sliders = renderSliderControls(initTabIndex, props.sliders)
  const buttons = renderButtonPairs(initTabIndex, props.buttonPairs)
  const radio = renderRadioInputs(initTabIndex, props.radioInputs);

  return (
    <div>
      {buttons}
      {sliders}
      {radio}
      {!!props.altControls &&
        <AltControls tabIndex={props.altTabIndex || -1}>
          {props.altControls}
        </AltControls>
      }
    </div>
  );
}