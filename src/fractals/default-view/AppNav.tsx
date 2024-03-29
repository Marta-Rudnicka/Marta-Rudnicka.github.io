import { ChevronLeft } from "../../components/icons/ChevronLeft";
import { ChevronRight } from "../../components/icons/ChevronRight";

type FooterProps = {
  prevLink?: string,
  nextLink?: string;
  footerTabIndex: number;
}

export function AppNav(props: FooterProps) {
  const { prevLink, nextLink } = props;
  const prevTabIndex = prevLink ? props.footerTabIndex + 1 : props.footerTabIndex;
  const nextTabIndex = prevTabIndex + 1;
  return (
    <div className="app-nav" id="app-nav">
      {prevLink && <div className="floating-box"><a href={prevLink} tabIndex={prevTabIndex}><ChevronLeft />Previous fractal</a></div>}
      {nextLink && <div className="floating-box"><a href={nextLink} tabIndex={nextTabIndex}>Next fractal <ChevronRight /></a></div>}
    </div>
  );
}