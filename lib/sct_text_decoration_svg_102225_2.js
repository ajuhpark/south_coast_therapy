/** 
 * sct gradient
*/


import '../src/styles/style.css'
import { gsap } from 'gsap'
import rough from 'roughjs';



function sct_text_decoration_svg() {
  console.log('sct_text_decoration_svg.js is working')

  function init() {
    console.log('sct_text_decoration_svg init is working')

    const span = document.querySelector('.sct_text_decoration_word');

    if (!span) {
      console.log('Span not found!');
      return;
    }

    console.log('Found span:', span);
    console.log('Span text:', span.textContent);

    // Create SVG using template string - easy to edit!
    const svgHTML = `
      <svg id="text-border" style="position: fixed; pointer-events: none; z-index: 1;">
        <!-- Edit your SVG shape here - easy to adjust! -->
        <ellipse cx="50%" cy="50%" rx="48%" ry="45%"
                 style="fill:none; stroke:#f39; stroke-width:3px;"/>
      </svg>
    `;

    // Insert SVG into body
    document.body.insertAdjacentHTML('beforeend', svgHTML);

    // Get reference to the created SVG
    const svg = document.getElementById('text-border');

    // Initialize rough.js
    const rc = rough.svg(svg);
    let isRoughCreated = false;

    function positionSVG() {
      const rect = span.getBoundingClientRect();

      console.log('Span position:', {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      });

      // Adjust these values to control padding around the text
      const padding = 10; // padding on each side

      // Use fixed positioning with viewport coordinates
      svg.style.position = 'fixed';
      svg.style.left = (rect.left - padding) + 'px';
      svg.style.top = (rect.top - padding) + 'px';
      svg.style.width = (rect.width + padding * 2) + 'px';
      svg.style.height = (rect.height + padding * 2) + 'px';

      console.log('SVG positioned at:', svg.style.left, svg.style.top);

      // Create rough ellipse only once (with a seed so it's always the same)
      if (!isRoughCreated) {
        const width = rect.width + padding * 2;
        const height = rect.height + padding * 2;

        // Create rough ellipse using the current dimensions
        // Note: rough.js ellipse uses center x, center y, width, height (not radii)
        const roughEllipse = rc.ellipse(
          width / 2,  // center x (50%)
          height / 2, // center y (50%)
          width * 0.96,  // width (rx="48%" * 2)
          height * 0.90, // height (ry="45%" * 2)
          {
            stroke: 'rgba(255, 51, 153, 0.5)',
            strokeWidth: 2,
            fill: 'none',
            roughness: 0.5, // Adjust for more/less sketchy look (default is 1)
            bowing: 1, // Adjust for more/less curvature variation
            seed: 12345 // Use a seed so the shape is always the same
          }
        );

        // Add the rough ellipse to the SVG
        svg.appendChild(roughEllipse);
        isRoughCreated = true;
      }
    }

    positionSVG();
    window.addEventListener('resize', positionSVG);
    window.addEventListener('scroll', positionSVG);
  } // Close init() function

  window.addEventListener("load", function() {
    init();
  });
}

// if (document.body.classList.contains('sct_text_decoration_svg')) {
  sct_text_decoration_svg();
// }

export default sct_text_decoration_svg