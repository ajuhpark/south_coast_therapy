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
      svgEllipse.style.opacity = '0.7';
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
      svgRectangle.style.opacity = '0.7';
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
      svgLine.style.opacity = '0.7';
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

    // === HIGHLIGHT TOP RIGHT ===
    const spanHighlightTopRight = document.querySelectorAll('.sct_text_decoration_word.highlight_top_right_1');

    spanHighlightTopRight.forEach((spanHighlight, index) => {
      console.log('Found highlight_top_right_1 span:', spanHighlight);

      // Create SVG container with the HIGHLIGHT_TOP_RIGHT.SVG content
      const svgHighlight = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgHighlight.id = `highlight-top-right-${index}`;
      svgHighlight.setAttribute('viewBox', '0 0 55 51');
      svgHighlight.setAttribute('fill', 'none');
      svgHighlight.style.position = 'absolute';
      svgHighlight.style.pointerEvents = 'none';
      svgHighlight.style.zIndex = '1';
      svgHighlight.style.height = '24px';
      svgHighlight.style.width = 'auto';

      // Add the SVG path content
      svgHighlight.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 47.8559C11.0114 46.8205 11.9246 45.9896 13.0397 46.0001C22.263 46.0871 31.4498 46.5781 40.6021 47.0672C41.767 47.1294 42.9314 47.1916 44.0952 47.253C45.2086 47.3117 46.0599 48.1974 45.9967 49.2313C45.9335 50.2651 44.9796 51.0556 43.8663 50.9969C42.6995 50.9354 41.5342 50.8732 40.3701 50.811C31.2066 50.3214 22.1197 49.8359 12.9987 49.7499C11.8836 49.7393 10.9888 48.8914 11.0001 47.8559Z" fill="${getColor(spanHighlight)}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M54.9414 23.5543C55.2048 24.6508 54.5557 25.7597 53.4914 26.0312C51.4829 26.5434 49.4757 27.0529 47.4702 27.562C35.749 30.5372 24.0826 33.4985 12.5344 36.9198C11.4807 37.232 10.3808 36.605 10.0778 35.5194C9.77482 34.4338 10.3834 33.3007 11.4371 32.9885C23.065 29.5436 34.8148 26.5612 46.5329 23.5869C48.5355 23.0786 50.5372 22.5705 52.5372 22.0604C53.6015 21.789 54.6779 22.4578 54.9414 23.5543Z" fill="${getColor(spanHighlight)}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M30.5683 0.723125C31.2416 1.56018 31.1132 2.78806 30.2815 3.46568L3.15662 25.5656C2.32493 26.2432 1.10492 26.1139 0.431651 25.2769C-0.241621 24.4398 -0.113199 23.2119 0.71849 22.5343L27.8434 0.434435C28.6751 -0.24318 29.8951 -0.113929 30.5683 0.723125Z" fill="${getColor(spanHighlight)}"/>
      `;

      document.body.appendChild(svgHighlight);

      function positionHighlight() {
        const rect = spanHighlight.getBoundingClientRect();

        // Adjust size and offset based on screen width
        const isMobile = window.innerWidth < 768;
        const height = isMobile ? '18px' : '24px';
        const offset = isMobile ? 4 : 5;

        svgHighlight.style.height = height;

        const svgRect = svgHighlight.getBoundingClientRect();

        // Position the middle of the SVG at the top right of the text element
        // Add offset to move it down and to the right
        svgHighlight.style.position = 'absolute';
        svgHighlight.style.left = (rect.right + window.scrollX + offset) + 'px';
        svgHighlight.style.top = (rect.top + window.scrollY - (svgRect.height / 2) + offset) + 'px';
      }

      positionHighlight();
      window.addEventListener('resize', positionHighlight);
    });

    // === HIGHLIGHT TOP LEFT ===
    const spanHighlightTopLeft = document.querySelectorAll('.sct_text_decoration_word.highlight_top_left');

    spanHighlightTopLeft.forEach((spanHighlight, index) => {
      console.log('Found highlight_top_left span:', spanHighlight);

      // Create SVG container with the HIGHLIGHT_05.SVG content
      const svgHighlight = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgHighlight.id = `highlight-top-left-${index}`;
      svgHighlight.setAttribute('viewBox', '0 0 72 78');
      svgHighlight.setAttribute('fill', 'none');
      svgHighlight.style.position = 'absolute';
      svgHighlight.style.pointerEvents = 'none';
      svgHighlight.style.zIndex = '1';
      svgHighlight.style.height = '24px';
      svgHighlight.style.width = 'auto';

      // Add the SVG path content
      svgHighlight.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="${getColor(spanHighlight)}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="${getColor(spanHighlight)}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="${getColor(spanHighlight)}"/>
      `;

      document.body.appendChild(svgHighlight);

      function positionHighlight() {
        const rect = spanHighlight.getBoundingClientRect();

        // Adjust size and offset based on screen width
        const isMobile = window.innerWidth < 768;
        const height = isMobile ? '18px' : '24px';
        const offsetHorizontal = isMobile ? 8 : 5;
        const offsetVertical = isMobile ? 0 : 5;

        svgHighlight.style.height = height;

        const svgRect = svgHighlight.getBoundingClientRect();

        // Position the middle of the SVG at the top left of the text element
        // Add offset to move it down and to the right
        svgHighlight.style.position = 'absolute';
        svgHighlight.style.left = (rect.left + window.scrollX - svgRect.width + offsetHorizontal) + 'px';
        svgHighlight.style.top = (rect.top + window.scrollY - (svgRect.height / 2) + offsetVertical) + 'px';
      }

      positionHighlight();
      window.addEventListener('resize', positionHighlight);
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