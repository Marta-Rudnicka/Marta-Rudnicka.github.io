import { IconWrapperProps } from "./types";

export function IconWrapper(props: IconWrapperProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 16}
      height={props.height || 16}
      fill={props.fill||'#31cece'}
      className={props.className}
      viewBox="0 0 16 16"
    >
      {props.children}
    </svg>
  );
}