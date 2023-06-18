import { MathJaxContext, MathJax } from 'better-react-mathjax';


export function Description() {
  return (
    <>
    <MathJaxContext>
    <MathJax> {'\\(ax^5 + bx^4 + cx^3 + dx^2 +ex +f = 0\\)'}</MathJax>

    </MathJaxContext>
      <p>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar, ipsum eget consequat 
        porttitor, nisi erat lobortis arcu, bibendum molestie velit felis sed urna. Vestibulum ac libero 
        vulputate, bibendum sapien eu, aliquet neque. Duis aliquet congue pretium. Donec orci quam, 
        rhoncus at est id, ultrices convallis neque. Ut id felis sodales, maximus justo vel, iaculis diam. 
        Ut pulvinar suscipit tempor. Sed interdum lacus in aliquet scelerisque. Sed volutpat felis arcu, 
        nec condimentum mi dapibus at. Nam in justo in ligula lacinia porta.',
      </p>
      <p>  'Vivamus venenatis massa non justo imperdiet bibendum. Vestibulum tempor velit dolor, ac rhoncus 
        sapien ultricies sed. Phasellus velit leo, consectetur nec semper eget, semper non arcu. Nunc turpis 
        quam, euismod nec auctor vitae, accumsan id nulla. Praesent in mollis metus, sed venenatis leo. 
        Pellentesque luctus felis eget est fringilla, vel efficitur felis placerat. Sed placerat tempor tellus, 
        a egestas metus viverra a. Morbi leo mauris, eleifend non tincidunt eget, cursus non quam. Fusce commodo 
        turpis in finibus placerat.'
      </p>
    </>
  );
}