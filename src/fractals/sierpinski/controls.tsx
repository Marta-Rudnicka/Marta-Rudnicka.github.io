import { SliderControl } from "../../components/SliderControl";

type ControlProps = {
  iterations: number;
  setIterations: React.Dispatch<React.SetStateAction<number>>;
  maxValue: number;
}
export function Controls(props: ControlProps) {
  return (
    <div>
      <SliderControl
        label="iterations"
        setValue={props.setIterations}
        maxValue={props.maxValue}
        minValue={1}
        defaultValue={props.iterations}
        info="dummy info"
      />
    </div>
  );
}