import { Slider } from "@blueprintjs/core";
import { useState } from "react";

export function Controls(){
  const [sliderValue, setSliderValue] = useState(1)
  return (
    <div>
        <Slider
          labelRenderer={true}
          min={1}
          max={20}
          value={sliderValue}
          onChange={(value) =>setSliderValue(value)}
        >
          Example text  
        </Slider>
    </div>
  );
}