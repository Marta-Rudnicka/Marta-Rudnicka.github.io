import { DefaultLayout } from "../../components/default-view/DefaultLayout";
import { draw } from "../sierpinski/draw";
import { Controls } from "./controls";
import { description } from "./description";


export function Example() {
  return (
    <DefaultLayout
      draw={draw}
      conrols={<Controls/>}
      title="Example"
      description={description}
      prevLink="www.example.com"
      nextLink="www.example.com"
    />)
}