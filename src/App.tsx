import React, { createContext } from 'react';
import './App.css';
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Dummy } from './components/layout/Dummy';
import { SierpinskiTriangle } from './fractals/fractal-configs/sierpinski';
import { MandelbrotSet } from './fractals/fractal-configs/mandelbrot';
import { JuliaSet } from './fractals/fractal-configs/julia';
import { Newton } from './fractals/fractal-configs/newton';
import { CantorSet } from './fractals/fractal-configs/cantor';
import { fractals } from './config/links';

export const NavTabContext = createContext(0);
const EXTRA_BUTTONS = 2;


function App() {
  const navTabContext = EXTRA_BUTTONS + fractals.length;
  return (
    <HashRouter basename='/'>
      <NavTabContext.Provider value={navTabContext}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/sierpinski" element={<SierpinskiTriangle />} />
            <Route path="/cantor" element={<CantorSet />} />
            <Route path="/newton" element={<Newton />} />
            <Route path="/mandelbrot" element={<MandelbrotSet />} />
            <Route path="/julia" element={<JuliaSet />} />
            <Route path="/dummy" element={<Dummy />} />
          </Route>
        </Routes>
      </NavTabContext.Provider>
    </HashRouter>
  );
}

export default App;
