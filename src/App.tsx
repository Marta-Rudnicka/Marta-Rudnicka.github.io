import React from 'react';
import './App.css';
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Dummy } from './components/layout/Dummy';
import { SierpinskiTriangle } from './fractals/fractal-configs/sierpinski';

function App() {
  return (
    <HashRouter basename='/'>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/example" element={<SierpinskiTriangle />} />
        <Route path="/dummy" element={<Dummy />} />

      </Route>
    </Routes>
  </HashRouter>
  );
}

export default App;
