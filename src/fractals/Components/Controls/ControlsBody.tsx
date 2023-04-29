import { ReactNode, useState } from "react";
import { SliderControl, SliderControlProps } from "./SliderControl";
import { ButtonPairControl, ButtonPairControlProps } from "./ButtonControlPair";
import { ControlProps } from "./index";
import { ChevronDown } from "../../../components/icons/ChevronDown";
import { ChevronUp } from "../../../components/icons/ChevronUp";

type ControlsProps = ControlProps & {
  allVisible: boolean,
}

type AltControlProps = {
  children: ReactNode
}

function renderSliderControls(
  sliders: SliderControlProps[]
): ReactNode[] {
  return sliders.map(slider =>
    <SliderControl
      key={slider.label}
      label={slider.label}
      setValue={slider.setValue}
      maxValue={slider.maxValue}
      minValue={slider.minValue}
      value={slider.value}
      info={slider.info}
    />
  );
}

function renderButtonPairs(buttonsPairs: ButtonPairControlProps[]): ReactNode[] {
  return buttonsPairs.map(bp =>
    <ButtonPairControl
      key={bp.info}
      handleClick1={bp.handleClick1}
      handleClick2={bp.handleClick2}
      info={bp.info}
      label1={bp.label1}
      label2={bp.label2}
    />
  );
}

function AltControls(props: AltControlProps) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <div>
        <button onClick={() => setShow(false)}>Show alternative keyboard-only controls<ChevronDown /></button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => setShow(true)}>Hide alternative keyboard-only controls<ChevronUp /></button>
      {props.children}
    </div>
  );
}

export function ControlsBody(props: ControlsProps) {
  if (props.fullScreen! && props.allVisible) {
    return null;
  }
  const sliders = renderSliderControls(props.sliders)
  const buttons = renderButtonPairs(props.buttonPairs)

  return (
    <div>
      {sliders}
      {buttons}
      {!!props.altControls &&
        <AltControls>
          {props.altControls}
        </AltControls>
      }
    </div>
  );
}