import { IconProps } from "./types";

export function IconWrapper(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 16}
      height={props.height || 16}
      fill="currentColor"
      className={props.className}
      viewBox="0 0 16 16"
    >
      {props.children}
    </svg>
  );
}