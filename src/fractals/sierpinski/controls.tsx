import { SliderControl } from "../../components/Slider";

type ControlProps = {
  iterations: number;
  setIterations: React.Dispatch<React.SetStateAction<number>>
}
export function Controls(props: ControlProps) {
  return (
    <div>
      <SliderControl
        label="iterations"
        setValue={props.setIterations}
        maxValue={8}
        minValue={1}
        defaultValue={props.iterations}
        info="dummy info"
      />
    </div>
  );
}