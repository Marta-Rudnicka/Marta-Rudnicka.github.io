import { H1, H2 } from "@blueprintjs/core";
import { Layout } from "./layout/Layout";

export function Home() {
  return (
    <div className="App bp4-dark">
      <Layout>
        <div className="three-cols">
          <section></section>
          <section>
            <H1>Fractals for the people!</H1>
            <H2>Introduction</H2>
            <p>Everyone learns some Mathematics at school, but a lot of people struggle with it or find it boring. There are people who see beauty in it and feel like they unravel the laws of nature through numbers by they all seem at the PhD level – for the rest of us, it’s no more interesting than calculating taxes. However, in 1970s, a mathematicians started looking into objects that proved appealing not just to academics, but also school children, humanities students and the general public: fractals. You can admire their fantastic shapes and surprising properties even as a complete lay person.</p>
            <H2>About this page</H2>
            <p>This website aims at providing an easy, laid-back introduction to fractals for users without strong mathematical background, or just people who are curious but do not feel like getting too deep into it. It relies on interactive visuals, examples and intuitive understanding rather than formal definitions. The page itself takes you through several examples of fractals, with some text explaining the crucial ideas behind it, and images that you can manipulate in real-time. There are some numbers and equations, but mostly simple, or not strictly necessary to get the general idea.</p>
            <p>If you are looking for in-depth understanding of the subject, this site is not for you, but you might still find something interesting recommendations in the ‘Resources’ tab.</p>
            <H2>Why fractals?</H2>
            <p>In 1990s in the USA, there were several experimental programmes that taught fractal-related subjects to high school students, elementary school students, or university students following humanities. These turned out much more enthusiastically received than ordinary mathematical classes. Also, they often relied on computers with specialised software – a rare thing in a classroom at the time. With today’s technology, it is easy to make this kind of resources available to many, many more people, so the fun and wonder doesn’t have to be limited to the lucky few.</p>
          </section>
          <section></section>
        </div>
      </Layout>
    </div>
  )
}