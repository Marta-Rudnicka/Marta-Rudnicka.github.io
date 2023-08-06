import React, { StrictMode, createContext } from 'react';
import './App.css';
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { fractals } from './config/links';
import { MathJaxContext } from 'better-react-mathjax';
export const NavTabContext = createContext(0);
const EXTRA_BUTTONS = 2;


const routes = fractals.map( fractal => <Route path={fractal.url} element={<fractal.component />} key={fractal.url}/>)
function App() {
  const navTabContext = EXTRA_BUTTONS + fractals.length;

  return (
    <StrictMode>
      <MathJaxContext config={{ inTabOrder: false }}>
        <HashRouter basename='/'>
          <NavTabContext.Provider value={navTabContext}>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                {routes}
              </Route>
            </Routes>
          </NavTabContext.Provider>
        </HashRouter>
      </MathJaxContext>
    </StrictMode>
  );
}

export default App;
