import { IconWrapper } from "./IconWrapper";
import { IconProps } from "./types";

export function ArrowDown(props: IconProps) {
  return (
    <IconWrapper
      className="bi bi-arrow-down"
      fill={props.fill || "black"}
      {...props}
    >
      <path
        fill-rule="evenodd"
        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
      />
    </IconWrapper>
  );
}
