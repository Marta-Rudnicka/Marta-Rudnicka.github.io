import { Slider } from "@blueprintjs/core";
import { useState } from "react";
import { ChevronDown } from "./icons/ChevronDown";
import { ChevronUp } from "./icons/ChevronUp";
import { EnterFullScreen } from "./icons/EnterFullScreen";
import { ExitFullScreen } from "./icons/ExitFullScreen";
import { Layout } from "./Layout";

export function Home(){
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const [sliderValue, setSliderValue] = useState(1)
  return (
    <div className="App bp4-dark">
      <Layout>
      <header className="App-header">
        <p>This is a placeholder page</p>
        <p>height: {windowHeight}, width: {windowWidth}</p>
        <div>
        <ChevronDown />
        <ChevronUp />
        <EnterFullScreen />
        <ExitFullScreen />
        </div>
      </header>
      <Slider
          labelRenderer={true}
          min={1}
          max={8}
          vertical
          value={sliderValue}
          onChange={(value) =>setSliderValue(value)}
          
        >
          Text  
        </Slider>
      </Layout>
    </div>
  )
}