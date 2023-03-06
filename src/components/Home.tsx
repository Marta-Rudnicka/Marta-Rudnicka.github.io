import { Layout } from "./Layout";

export function Home(){
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  return (
    <div className="App bp4-dark">
      <Layout>
      <header className="App-header">
        <p>This is a placeholder page</p>
        <p>height: {windowHeight}, width: {windowWidth}</p>
      </header>
      </Layout>
    </div>
  )
}