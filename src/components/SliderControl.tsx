import { Collapse, Slider } from "@blueprintjs/core";
import { Dispatch, SetStateAction, useState } from "react";
import { Info } from "./icons/Info";

export type SliderControlProps = {
  label: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  info: string;
  setValue: Dispatch<SetStateAction<number>>
  labelStepSize? : number
}

export function SliderControl(props: SliderControlProps){
  const [isOpen, setIsOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(props.defaultValue)
  function toggleIsOpen(){
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function handleChange(input: number) {
    setSliderValue(input);
    props.setValue(input)
  }
  return (
    <div className="slider-container">
      <label>{props.label} <span onClick={toggleIsOpen}><Info/></span></label>
      <Collapse isOpen={isOpen}>{props.info}</Collapse>
        <Slider
          showTrackFill
          min={props.minValue}
          max={props.maxValue}
          value={sliderValue}
          labelStepSize={props.labelStepSize || props.maxValue - props.minValue}
          onChange={handleChange}
        >
          Example text  
        </Slider>
    </div>
  );
}
