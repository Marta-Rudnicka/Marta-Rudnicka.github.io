import { Button } from "@blueprintjs/core";
import { InfoLabel } from "./InfoLabel";

export type ButtonPairControlProps = {
  handleClick1: () => void;
  handleClick2: () => void;
  info?: string;
  label1: string;
  label2: string;
  tabIndex: number;
}

export function ButtonPairControl(props: ButtonPairControlProps) {
  return (
    <div className="slider-container">
      <InfoLabel info={props.info} />
      <div>
        <Button onClick={props.handleClick1} tabIndex={props.tabIndex}>{props.label1}</Button>
        <Button onClick={props.handleClick2} tabIndex={props.tabIndex + 1}>{props.label2}</Button>
      </div>
    </div>
  );
}
