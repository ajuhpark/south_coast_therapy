/**
 * sct gradient
*/


import '../src/styles/style.css'
import { gsap } from 'gsap'
import rough from 'roughjs'
// import { SplitText } from 'gsap/SplitText'


// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(ScrollTrigger)

// make the mobile size stay the same
// ScrollTrigger.normalizeScroll(true);
// ScrollTrigger.config({
//   ignoreMobileResize: true,
// });


function sct_text_decoration_svg() {
  console.log('sct_text_decoration_svg.js is working')

  function init() {
    console.log('sct_text_decoration_svg init is working')

    // Color mapping - easy to add more colors!
    const colors = {
      blue: 'var(--color--blue--400)',
      gold: 'var(--_theme---color_group_3--color-300)',
      teal: 'var(--_theme---color_group_2--color-200)'
    };

    // Helper function to get color from element classes
    function getColor(element) {
      for (let colorName in colors) {
        if (element.classList.contains(colorName)) {
          return colors[colorName];
        }
      }
      return colors.blue; // default color
    }

    // === ROUGH ELLIPSE ===
    const spanEllipses = document.querySelectorAll('.sct_text_decoration_word.ellipse');

    spanEllipses.forEach((spanEllipse, index) => {
      console.log('Found ellipse span:', spanEllipse);

      // Create empty SVG container for rough ellipse
      const svgEllipse = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgEllipse.id = `text-border-ellipse-${index}`;
      svgEllipse.style.position = 'absolute';
      svgEllipse.style.pointerEvents = 'none';
      svgEllipse.style.zIndex = '1';
      document.body.appendChild(svgEllipse);

      // Initialize rough.js for ellipse
      const rcEllipse = rough.svg(svgEllipse);
      let isRoughEllipseCreated = false;

      function positionEllipse() {
        const rect = spanEllipse.getBoundingClientRect();

        // Adjust these values to control padding around the text
        const paddingX = 10; // horizontal padding (left/right)
        const paddingY = 10; // vertical padding (top/bottom)

        // Use absolute positioning with document coordinates
        svgEllipse.style.position = 'absolute';
        svgEllipse.style.left = (rect.left + window.scrollX - paddingX) + 'px';
        svgEllipse.style.top = (rect.top + window.scrollY - paddingY) + 'px';
        svgEllipse.style.width = (rect.width + paddingX * 2) + 'px';
        svgEllipse.style.height = (rect.height + paddingY * 2) + 'px';

        // Create rough ellipse only once (with a seed so it's always the same)
        if (!isRoughEllipseCreated) {
          const width = rect.width + paddingX * 2;
          const height = rect.height + paddingY * 2;

          const roughEllipse = rcEllipse.ellipse(
            width / 2,  // center x (50%)
            height / 2, // center y (50%)
            width * 0.96,  // width (rx="48%" * 2)
            height * 0.90, // height (ry="45%" * 2)
            {
              stroke: getColor(spanEllipse),
              strokeWidth: 3,
              fill: 'none',
              roughness: 0.5,
              bowing: 1,
              seed: 12345 + index // Different seed for each ellipse
            }
          );

          svgEllipse.appendChild(roughEllipse);
          isRoughEllipseCreated = true;
        }
      }

      positionEllipse();
      window.addEventListener('resize', positionEllipse);
    });

    // === ROUGH RECTANGLE ===
    const spanRectangles = document.querySelectorAll('.sct_text_decoration_word.rectangle');

    spanRectangles.forEach((spanRectangle, index) => {
      console.log('Found rectangle span:', spanRectangle);

      // Create empty SVG container for rough rectangle
      const svgRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgRectangle.id = `text-border-rectangle-${index}`;
      svgRectangle.style.position = 'absolute';
      svgRectangle.style.pointerEvents = 'none';
      svgRectangle.style.zIndex = '1';
      document.body.appendChild(svgRectangle);

      // Initialize rough.js for rectangle
      const rcRectangle = rough.svg(svgRectangle);
      let isRoughRectangleCreated = false;

      function positionRectangle() {
        const rect = spanRectangle.getBoundingClientRect();

        // Adjust these values to control padding around the text
        const paddingX = 10; // horizontal padding (left/right)
        const paddingY = 10; // vertical padding (top/bottom)

        // Use absolute positioning with document coordinates
        svgRectangle.style.position = 'absolute';
        svgRectangle.style.left = (rect.left + window.scrollX - paddingX) + 'px';
        svgRectangle.style.top = (rect.top + window.scrollY - paddingY) + 'px';
        svgRectangle.style.width = (rect.width + paddingX * 2) + 'px';
        svgRectangle.style.height = (rect.height + paddingY * 2) + 'px';

        // Create rough rectangle only once (with a seed so it's always the same)
        if (!isRoughRectangleCreated) {
          const width = rect.width + paddingX * 2;
          const height = rect.height + paddingY * 2;

          const roughRectangle = rcRectangle.rectangle(
            0,      // x position (top-left corner)
            0,      // y position (top-left corner)
            width,  // width
            height, // height
            {
              stroke: getColor(spanRectangle),
              strokeWidth: 3,
              fill: 'none',
              roughness: 0.5,
              bowing: 1,
              seed: 23456 + index // Different seed for each rectangle
            }
          );

          svgRectangle.appendChild(roughRectangle);
          isRoughRectangleCreated = true;
        }
      }

      positionRectangle();
      window.addEventListener('resize', positionRectangle);
    });

    // === ROUGH LINE ===
    const spanLines = document.querySelectorAll('.sct_text_decoration_word.line');

    spanLines.forEach((spanLine, spanIndex) => {
      console.log('Found line span:', spanLine);

      // Create empty SVG container for rough line
      const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgLine.id = `text-border-line-${spanIndex}`;
      svgLine.style.position = 'absolute';
      svgLine.style.pointerEvents = 'none';
      svgLine.style.zIndex = '1';
      document.body.appendChild(svgLine);

      // Initialize rough.js for line
      const rcLine = rough.svg(svgLine);

      function positionLine() {
        // Get all line boxes (one for each wrapped line)
        const rects = spanLine.getClientRects();

        if (rects.length === 0) return;

        // Find the bounding box that contains all lines
        let minLeft = Infinity, minTop = Infinity;
        let maxRight = -Infinity, maxBottom = -Infinity;

        for (let rect of rects) {
          minLeft = Math.min(minLeft, rect.left);
          minTop = Math.min(minTop, rect.top);
          maxRight = Math.max(maxRight, rect.right);
          maxBottom = Math.max(maxBottom, rect.bottom);
        }

        const totalWidth = maxRight - minLeft;
        const totalHeight = maxBottom - minTop;

        // Adjust these values to control padding around the text
        const paddingX = 0; // horizontal padding (left/right)
        const paddingY = 5; // vertical padding (adds space below each line)

        // Use absolute positioning with document coordinates
        svgLine.style.position = 'absolute';
        svgLine.style.left = (minLeft + window.scrollX) + 'px';
        svgLine.style.top = (minTop + window.scrollY) + 'px';
        svgLine.style.width = totalWidth + 'px';
        svgLine.style.height = (totalHeight + paddingY) + 'px';

        // Clear existing lines
        while (svgLine.firstChild) {
          svgLine.removeChild(svgLine.firstChild);
        }

        // Draw a line under each line of text
        Array.from(rects).forEach((rect, index) => {
          const lineStartX = rect.left - minLeft;
          const lineEndX = rect.right - minLeft;
          const lineY = (rect.bottom - minTop) + paddingY;

          const roughLine = rcLine.line(
            lineStartX, // start x (left edge of this line)
            lineY,      // start y (bottom of this line)
            lineEndX,   // end x (right edge of this line)
            lineY,      // end y (same as start for horizontal line)
            {
              stroke: getColor(spanLine),
              strokeWidth: 3,
              roughness: 0.5,
              bowing: 1,
              seed: 54321 + (spanIndex * 100) + index // Unique seed for each line
            }
          );

          svgLine.appendChild(roughLine);
        });
      }

      positionLine();
      window.addEventListener('resize', positionLine);
    });
  } // Close init() function

  window.addEventListener("load", function() {
    init();
  });
}

// if (document.body.classList.contains('sct_text_decoration_svg')) {
  sct_text_decoration_svg();
// }

export default sct_text_decoration_svg