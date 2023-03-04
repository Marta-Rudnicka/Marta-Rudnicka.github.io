import { Slider } from "@blueprintjs/core";
import { useState } from "react";
import { Info } from "./icons/Info";

type SliderControlProps = {
  label: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
}

export function SliderControl(props: SliderControlProps){
  const [sliderValue, setSliderValue] = useState(props.defaultValue)
  return (
    <div className="slider-container">
      <label>{props.label}<Info/></label>
        <Slider
          showTrackFill
          min={props.minValue}
          max={props.maxValue}
          value={sliderValue}
          labelStepSize={props.maxValue - props.minValue}
          onChange={(value) =>setSliderValue(value)}
        >
          Example text  
        </Slider>
    </div>
  );
}