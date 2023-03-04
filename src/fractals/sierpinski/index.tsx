import { DefaultLayout } from "../../components/default-view/DefaultLayout";
import { draw } from "./draw";
import { Controls } from "./controls";
import { description } from "./description";
import { useState } from "react";

export function Example() {
  const [iterations, setIterations] = useState(4)

  return (
    <DefaultLayout
      draw={draw}
      parameters={{iterations }}
      conrols={<Controls
        iterations={iterations}
        setIterations={setIterations} />
      }
      title="Example"
      description={description}
      prevLink="www.example.com"
      nextLink="www.example.com"
    />);
}