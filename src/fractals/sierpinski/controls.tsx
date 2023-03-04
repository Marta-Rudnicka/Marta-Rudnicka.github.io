import { Slider } from "@blueprintjs/core";
import { useState } from "react";
import { SliderControl } from "../../components/Slider";

export function Controls(){
  const [sliderValue, setSliderValue] = useState(1)
  return (
    <div>
      <label>Test control</label>
        <Slider
          labelRenderer={true}
          min={1}
          max={20}
          value={sliderValue}
          onChange={(value) =>setSliderValue(value)}
        >
          Example text  
        </Slider>
        <SliderControl 
          label="test slider"
          maxValue={8}
          minValue={1}
          defaultValue={2}
        />
    </div>
  );
}