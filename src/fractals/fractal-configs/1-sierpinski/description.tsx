import { EnterFullScreen } from "../../../components/icons/EnterFullScreen";
import { ExitFullScreen } from "../../../components/icons/ExitFullScreen";
import { Def } from "../../default-view/description-utils";

type DescriptionProps = {
  ti: number;
}
export function Description(props: DescriptionProps) {
  const { ti } = props;
  return (
    <>
      <p>
        What is a fractal? Instead of using a formal definition, we will start with a simple example: Sierpiński triangle.
      </p>
      <p>
        Let's look at the big<Def phrase=" equilateral triangle" definition="a triangle where all the sides are the same length" tabIndex={ti + 1} />on the left. If we join up the the midpoints of its sides, we get a smaller equilateral triangle. When we “cut” it out like in the image, we are left with three small equilateral triangles and a “hole” in the middle. We can then cut out a middle triangle from each of those triangles we have left, and end up with twelve even smaller triangles. And then, we can cut out the middles from those twelve triangles, and so on…
      </p>
      <p>
        Here, it would be useful to introduce a few terms.
      </p>
      <p>
        <strong>Iteration</strong> – one step in the process that consists of repeating the same step. Here, we will consider one iteration as cutting out the middle out of every newly created triangle on the screen.</p>
      <p className="ex">Use the slider or the number input to set the number of iterations yourself. The animation will then stop, and the image will show the triangle after the selected number of iterations.</p>
      <p>Creating any fractal involves iterative processes.</p>
      <p>
        <strong>Recursion</strong> - you have probably noticed that every smaller triangle inside the Sierpiński is also a Sierpiński triangle. We could say that to make a Sierpiński triangle, you need to put four Sierpiński triangles together in a pyramid shape. This sounds similar to the old programming joke: "to understand recursion, you need to understand recursion".
        If an <Def phrase="algorithm" definition="a sequence of instructions one needs to follow to achieve a specific outcome, e.g. a recipe - a list of things a human needs to do to cook a particular meal, or a computer program - a set of instructions for a computer to follow for anything a computer is supposed to do" tabIndex={ti + 2} /> involves invoking itself, it is recursive. Recursion is also known for being confusing to beginners.
      </p>
      <h3>Sierpiński triangle
      </h3>
      <p>
        If you repeat the process described above infinite times, you get the Sierpiński triangle, also known as Sierpiński gasket or Sierpiński sieve. Of course, you are not looking at an actual Sierpiński triangle, because it would take literally forever for your device to generate an image by cutting out an infinite number of triangles out of infinite number of bigger triangles.
      </p>
      <p>
        This pattern of triangles was first described in mathematical terms by Wacław Sierpiński in 1915.  Even though at the time the idea of fractals was not formed yet, it is a simple example of a fractal.
      </p>
      <h3>So, what makes it a fractal?</h3>
      <p>
        Every smaller triangle inside a Sierpiński triangle is a Sierpiński triangle. If you zoomed in on an image in one of the corners, it would look the same no matter how much you zoom. This property is called <strong>self-similarity</strong>. In case of Sierpiński triangle, all the smaller Sierpiński triangles inside it are identical, but for some fractals the smaller parts are only similar.
      </p>
      <p className="ex">
        Drag the corners of the outer triangle to change its shape (or use keyboard controls). All the inner triangles will become its smaller copies, and make a different self-similar fractal.</p>
      <p className="info"> Click on the <EnterFullScreen /> icon to get a full screen view with no extra text and links. You can exit the full screen mode by using <ExitFullScreen /> icon.
      </p>
      <h3>More facts about Sierpiński triangle</h3>
      <li>
        The area of a (true) Sierpiński triangle is 0. If you cut out an infinite number of holes out of a triangle, you have no area left.</li>
      <li>There are many alternative ways of constructing a Sierpiński triangle; we only showed the simplest one.</li>
      <li>In the original paper, Sierpiński triangle was described as a curve that branches out on its every point. Still, it's probably easier to understand it in terms of removing triangles from a larger triangle</li>
    </>
  );
}