import { useState } from "react";

type DefProps = {
  phrase: string;
  definition: string;
  tabIndex: number;
}

export function Def(props: DefProps) {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(open ? false : true);
  }

  function handleKeyboardInput(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Enter') {
      toggleOpen();
    }
    if (e.key ==="Escape") {
      setOpen(false);
    }
  }
  return (
    <>
      <span
        className="def-phrase"
        onClick={toggleOpen}
        onKeyDown={(e) => handleKeyboardInput(e)}
        tabIndex={props.tabIndex}
      >{props.phrase} </span>
      {open && <span className="def-definition">( {props.definition}) </span>}
    </>
  )
}