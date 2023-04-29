import { ReactNode } from "react";

export type IconWrapperProps = {
  children: ReactNode;
  className: string;
  height?: number;
  width?: number;
  fill?: string;
}

export type IconProps = {
  height?: number,
  width?: number
  fill?: string,
}