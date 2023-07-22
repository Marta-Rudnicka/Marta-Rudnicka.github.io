import { Collapse, } from "@blueprintjs/core";
import { useState } from "react";
import { Info } from "../../../components/icons/Info";

export type InfoLabelProps = {
  info?: string;
}

export function InfoLabel(props: InfoLabelProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  if (!props.info) return null;

  return (
    <>
      <label><span onClick={toggleIsOpen}><Info /></span></label>
      <Collapse isOpen={isOpen}>{props.info}</Collapse>
    </>
  )
}
