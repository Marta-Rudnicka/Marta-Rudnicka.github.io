import { H3 } from "@blueprintjs/core";

export function Description() {
  return (
    <>
      <p>
        What is a fractal? The traditional way to explain it would start with a formal definition, but we will not use it here – we will start with a simple example.
      </p>
      <p>
        Let us look at a equilateral triangle (one with all sides equal) on the left. We can make a smaller triangle in the middle by joining up the midpoints of its side. When we “cut” it out like in the image, we are left with three smaller equilateral triangles and a “hole” in the middle. We can then cut out a middle triangle from each of those triangles left, and end up with twelve even smaller triangles. And then, we can cut out the middle from those twelve triangles, and so on…
      </p>
      <p>
        Here, it would be useful to introduce a few terms.
      </p>
      <p>
        <strong>Iteration</strong>  – the process described above and shown on the screen, consists of repeating the same step over and over again. Each step in a process like that is called an iteration. Here, we will consider one iteration as cutting out the middle out of every triangle on the screen. If you move the slider labelled “iterations”, the animation will stop, and you will able to set the number of iterations on your own.
        The idea of iteration is used in mathematics and also computer programming – you will encounter it further on when you move onto the next fractals
      </p>
      <p>
        <strong>Recursion</strong> – the old jokes says that to understand recursion, you need to understand recursion. Notice that every iteration in the process above, except for the first one, is performed on the results of the previous iteration. When you cut out the middles out of the first three triangles, these three triangles had been created by doing the same on the first big triangle. The next step will be performed on the twelve triangles you have just created. This is an example of a recursive process – you perform an action, and then perform the same action on the results of that action, and then do the same unless you encounter something that stops it. It is also used in mathematics and computer programming, and is even used on this page to generate the image on the left.
      </p>
      <h3>Sierpiński triangle
      </h3>
      <p>
        If you repeat the process described above infinite times, you get a Sierpiński triangle, also known as  Sierpiński gasket or Sierpiński sieve. Of course, you are not looking at an actual Sierpiński triangle,  because it would take literally forever for your device to generate an image by cutting out an infinite number of triangles out of infinite number of bigger triangles, and you wouldn’t see anything smaller than a pixel on your screen anyway.
      </p>
      <p>
        This pattern of triangles might not be very original, but it was first described in mathematical terms by Wacław Siepriński in 1915.  Even though at the time the idea of fractals was not formed yet, it is a simple example of a fractal.
      </p>
      <h3>So, what makes it a fractal?</h3>
      <p>
        Every smaller triangle (sub-triangle?) inside a Sierpiński triangle is a Sierpiński triangle – remember, that the actual Sierpiński triangle is created with infinite iterations. If you zoomed in on an image in one of the corners, it would look the same no matter how much you zoom. If you zoomed elsewhere, you might end up zooming one of the “holes”. This property is called <strong>self-similarity</strong>. In case of Sierpiński triangle, all the smaller Sierpiński triangles inside it are identical – but this is not a rule for all fractals. Some just have smaller parts that are only similar in shape.
      </p>
      <p>
        If you want to play around with self-similar nested triangles, you can drag the corners in the image to change the shape of the triangle, or use the alternative keyboard-only controls. If you click on the [] icon, you can go to the full-screen mode, where you only get the fractal and controls to manipulate it, without all the links and the text. You can exit the full screen by using [] icon.
      </p>
      <h3>More facts about Sierpiński triangle</h3>
      <ul>
        <li>There are many alternative ways of constructing a Sierpiński triangle, but since it is an introduction to fractals, we started with the simplest one.</li>
        <li>
          What is the area of Sierpiński triangle? 0. If you cut out an infinite number of holes out of a triangle, it will end up taking up no space.</li>
      </ul>
    </>
  );
}