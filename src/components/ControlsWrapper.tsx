import { Tooltip2 } from "@blueprintjs/popover2";
import { ReactNode, useState } from "react";
import { ChevronDown } from "../components/icons/ChevronDown";
import { ChevronUp } from "../components/icons/ChevronUp";
import { SliderControl, SliderControlProps } from "../components/SliderControl";

type ControlProps = {
  sliders: SliderControlProps[];
  fullScreen?: boolean;
}

type ControlHeaderProps = {
  allVisible: boolean;
  setAllVisible: React.Dispatch<React.SetStateAction<boolean>>;
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

  function renderControls(): ReactNode[] {
    return props.sliders.map(slider => {
      return (
      <SliderControl
        key={slider.label}
        label={slider.label}
        setValue={slider.setValue}
        maxValue={slider.maxValue}
        minValue={slider.minValue}
        defaultValue={slider.defaultValue}
        info={slider.info}
      />
    );}
    );
  }
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
        && renderControls()}
      </div>
    </>
  );
}