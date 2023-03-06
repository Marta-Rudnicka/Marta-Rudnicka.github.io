import { DefaultLayout } from "../../components/default-view/DefaultLayout";
import { draw } from "./draw";
import { Controls } from "./controls";
import { description } from "./description";
import { useEffect, useState } from "react";
import { getIterationsNumber, getSize } from "../../utils";
import { FullScreenLayout } from "../../components/full-screen-view/FullScreenLayout";

export function SierpinskiTriangle() {
  const [iterations, setIterations] = useState(4)
  const [fullScreen, setFullScreen] = useState(false);
  const [size, setSize ] = useState(getSize(fullScreen))
  const maxIterations = getIterationsNumber(false);

  function handleResize(): void{
    setSize(getSize(fullScreen));
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  if (fullScreen) {
    return (
      <FullScreenLayout
        draw={draw}
        parameters={{ iterations }}
        handleClick={() => setFullScreen(false)}
        size={size}
        conrols={<Controls
          iterations={iterations}
          setIterations={setIterations}
          maxValue={maxIterations}
        />}
      />
    );
  }

  return (
    <DefaultLayout
      draw={draw}
      parameters={{ iterations }}
      handleClick={() => setFullScreen(true)}
      conrols={<Controls
        iterations={iterations}
        setIterations={setIterations}
        maxValue={maxIterations}
      />}
      title="Sierpiński triangle - work in progress"
      description={description}
      prevLink="www.example.com"
      nextLink="www.example.com"
      size={size}
    />
  );
}