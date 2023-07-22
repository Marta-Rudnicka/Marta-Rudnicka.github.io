import { ReactNode, useState } from "react";
import { SliderControl, SliderControlProps } from "./SliderControl";
import { ButtonPairControl, ButtonPairControlProps } from "./ButtonControlPair";
import { ControlProps } from "./index";
import { ChevronDown } from "../../../components/icons/ChevronDown";
import { ChevronUp } from "../../../components/icons/ChevronUp";

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
  sliders: SliderControlProps[],
  initTabIndex: number,
): ReactNode[] {
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
  buttonsPairs: ButtonPairControlProps[],
  initTabIndex: number,
  ): ReactNode[] {
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
  if (props.fullScreen! && props.allVisible) {
    return null;
  }
  const initTabIndex = props.fullScreen ? 3 : 10;
  const sliders = renderSliderControls(props.sliders, initTabIndex)
  const buttons = renderButtonPairs(props.buttonPairs, initTabIndex)

  return (
    <div>
      {buttons}
      {sliders}
      {!!props.altControls &&
        <AltControls tabIndex={props.altTabIndex || -1}>
          {props.altControls}
        </AltControls>
      }
    </div>
  );
}