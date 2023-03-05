import { DefaultLayout } from "../../components/default-view/DefaultLayout";
import { draw } from "./draw";
import { Controls } from "./controls";
import { description } from "./description";
import { useState } from "react";
import { getIterationsNumber } from "../../utils";

export function SierpinskiTriangle() {
  const [iterations, setIterations] = useState(4)
  const maxIterations = getIterationsNumber(false);
  console.dir({maxIterations})

  return (
    <DefaultLayout
      draw={draw}
      parameters={{iterations }}
      conrols={<Controls
        iterations={iterations}
        setIterations={setIterations}
        maxValue={maxIterations}
      />}
      title="Sierpiński triangle - work in progress"
      description={description}
      prevLink="www.example.com"
      nextLink="www.example.com"
    />);
}