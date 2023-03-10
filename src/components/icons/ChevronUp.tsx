import { IconWrapper } from "./IconWrapper";
import { IconProps } from "./types";

export function ChevronUp(props: IconProps) {
  return (
    <IconWrapper
      className="bi bi-chevron-compact-up"
      {...props}
      >
      <path
        fillRule="evenodd"
        d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
      />
    </IconWrapper>
  );
}
