import { Footer } from "./Footer";
import { Header } from "./Header";
type LayoutProps = {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <div className="App bp4-dark">
      <Header />
        {props.children}
      <Footer />
    </div>
  );
}