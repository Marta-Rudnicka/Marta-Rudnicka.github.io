import { Tooltip2 } from "@blueprintjs/popover2";
import { ReactNode, useState } from "react";
import { ChevronDown } from "../components/icons/ChevronDown";
import { ChevronUp } from "../components/icons/ChevronUp";
import { SliderControl, SliderControlProps } from "./SliderControl";
import { BurronPairControl, ButtonPairControlProps } from "./ButtonControlPair";

type ControlProps = {
  sliders: SliderControlProps[];
  buttonPairs: ButtonPairControlProps[];
  fullScreen?: boolean;
}

type ControlHeaderProps = {
  allVisible: boolean;
  setAllVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
    <BurronPairControl
      key={bp.info}
      handleClick1={bp.handleClick1}
      handleClick2={bp.handleClick2}
      info={bp.info}
      label1={bp.label1}
      label2={bp.label2}
    />
  );
}

function ControlHeader(props: ControlHeaderProps) {
  const tooltipText = props.allVisible ? 'hide' : 'show';
  function toggleVisible(): void {
    props.allVisible ? props.setAllVisible(false) : props.setAllVisible(true)
  }
  return (
    <div className='control-header'>
      <Tooltip2
        content={<div className="tooltip-bottom"> {tooltipText}</div>}
        hoverOpenDelay={500}
      >
        <h2
          onClick={toggleVisible}
        > Controls {
            props.allVisible
              ? <ChevronUp width={25} height={25} />
              : <ChevronDown width={25} height={25} />}
        </h2>
      </Tooltip2>
    </div>
  )
}

export function ControlsWrapper(props: ControlProps) {
  const [allVisible, setAllVisible] = useState(!props.fullScreen);

  const sliders = renderSliderControls(props.sliders)
  const buttons = renderButtonPairs(props.buttonPairs)

  return (
    <>
      <div className="control-header-wrapper">
        {props.fullScreen &&
          <ControlHeader
            allVisible={allVisible}
            setAllVisible={setAllVisible}
          />}
      </div>
      <div>
        {(!props.fullScreen || allVisible) 
        && sliders}
        {(!props.fullScreen || allVisible) 
        && buttons }
      </div>
      
    </>
  );
}