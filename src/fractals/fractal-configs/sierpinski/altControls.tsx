import { useEffect, useState } from "react";
import { Triangle } from "../../../types";
import { PositionControl } from "../../Components/Controls/PositionControl";
import './custom.css';

type SierpinskiAltControlsProps = {
  outerTriangle: Triangle;
  setOuterTriangle: React.Dispatch<React.SetStateAction<Triangle>>
  canvasSize: number;
}
export function SierpinskiAltControls(props: SierpinskiAltControlsProps) {
  const [a, setA] = useState(props.outerTriangle.a);
  const [b, setB] = useState(props.outerTriangle.b);
  const [c, setC] = useState(props.outerTriangle.c);

  const inc = Math.round(props.canvasSize / 100);
  useEffect(() => {
    props.setOuterTriangle({
      a: a,
      b: b,
      c: c
    })
  })

  return (
    <div className="alt-controls">
      <p>Use arrows keys to move triangle corners. Use 'Tab' or 'PageDown' key to focus on the next corner, and 'PageUp' to focus on the previous corner.</p>
      <div className="triangle-alt-controls top">
        <PositionControl
          id="c"
          inc={inc}
          setPosition={setC}
          x={c[0]}
          y={c[1]}
          nextFocus={document.getElementById('a-arrow-up')}
        />
      </div>
      <div className="triangle-alt-controls bottom">
        <PositionControl
          id="a"
          inc={inc}
          setPosition={setA}
          x={a[0]}
          y={a[1]}
          nextFocus={document.getElementById('b-arrow-up')}
          prevFocus={document.getElementById('c-arrow-up')}
        />
        <PositionControl
          id="b"
          inc={inc}
          setPosition={setB}
          x={b[0]}
          y={b[1]}
          nextFocus={document.querySelector('.app-nav a')  as HTMLElement | null}
          prevFocus={document.getElementById('a-arrow-up')}
        />
      </div>
    </div>
  );
}