import { ReactNode, useContext, useState } from "react";
import { ButtonPairControlProps } from "./ButtonControlPair";
import { ControlHeader } from "./ControlsHeader";
import { SliderControlProps } from "./SliderControl";
import { ControlsBody } from "./ControlsBody";
import { FullScreenContext } from "../ComplexPlane/ComplexPlane";
import { RadioControlProps } from "./RadioInput";
import { BezierCurveControlProps } from "./BezierCurveControl";

export type ControlProps = {
  altControls?: ReactNode;
  altTabIndex?: number;
  buttonPairs?: ButtonPairControlProps[];
  children?: ReactNode;
  radioInputs?: RadioControlProps[];
  sliders?: SliderControlProps[];
  curves?: BezierCurveControlProps[];
}

export function Controls(props: ControlProps) {
  const fullScreen = useContext(FullScreenContext);
  const [allVisible, setAllVisible] = useState(!fullScreen);
  const initTabIndex = fullScreen ? 3 : 10;
  return (
    <>
      <div className="control-header-wrapper">
        {fullScreen &&
          <ControlHeader
            allVisible={allVisible}
            setAllVisible={setAllVisible}
          />}
      </div>
      {props.children}
      <ControlsBody
        {...props}
        allVisible={allVisible}
        altTabIndex={props.altTabIndex}
        initTabIndex={initTabIndex}
      />
    </>
  );
}