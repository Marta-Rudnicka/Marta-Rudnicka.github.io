import React, { useState } from 'react';
import './App.css';
import { ChevronDown } from './icons/ChevronDown';
import { ChevronUp } from './icons/ChevronUp';
import { EnterFullScreen } from './icons/EnterFullScreen';
import { ExitFullScreen } from './icons/ExitFullScreen';
import { Button,  Navbar, Slider } from '@blueprintjs/core';
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

function App() {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const [sliderValue, setSliderValue] = useState(1)

  return (
    <div className="App bp4-dark">
      <Navbar>
        <Navbar.Group align="left">
          <Navbar.Divider />
          <Button className="bp4-minimal" icon="home" text="Home" />
        </Navbar.Group>
      </Navbar>
      <header className="App-header">

        <p>{windowHeight}</p>
        <p>{windowWidth}</p>
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
        <div>
        <ChevronDown />
        <ChevronUp />
        <EnterFullScreen />
        <ExitFullScreen />
        </div>
      </header>
    </div>
  );
}

export default App;
