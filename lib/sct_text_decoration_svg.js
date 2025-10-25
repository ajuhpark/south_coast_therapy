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

    // Array to store all created SVG elements
    const allSvgElements = [];

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
      svgEllipse.style.opacity = '0'; // Initial hidden state
      document.body.appendChild(svgEllipse);
      allSvgElements.push(svgEllipse);

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
      svgRectangle.style.opacity = '0'; // Initial hidden state
      document.body.appendChild(svgRectangle);
      allSvgElements.push(svgRectangle);

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
      svgLine.style.opacity = '0'; // Initial hidden state
      document.body.appendChild(svgLine);
      allSvgElements.push(svgLine);

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
      svgHighlight.style.opacity = '0'; // Initial hidden state

      // Add the SVG path content
      svgHighlight.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 47.8559C11.0114 46.8205 11.9246 45.9896 13.0397 46.0001C22.263 46.0871 31.4498 46.5781 40.6021 47.0672C41.767 47.1294 42.9314 47.1916 44.0952 47.253C45.2086 47.3117 46.0599 48.1974 45.9967 49.2313C45.9335 50.2651 44.9796 51.0556 43.8663 50.9969C42.6995 50.9354 41.5342 50.8732 40.3701 50.811C31.2066 50.3214 22.1197 49.8359 12.9987 49.7499C11.8836 49.7393 10.9888 48.8914 11.0001 47.8559Z" fill="${getColor(spanHighlight)}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M54.9414 23.5543C55.2048 24.6508 54.5557 25.7597 53.4914 26.0312C51.4829 26.5434 49.4757 27.0529 47.4702 27.562C35.749 30.5372 24.0826 33.4985 12.5344 36.9198C11.4807 37.232 10.3808 36.605 10.0778 35.5194C9.77482 34.4338 10.3834 33.3007 11.4371 32.9885C23.065 29.5436 34.8148 26.5612 46.5329 23.5869C48.5355 23.0786 50.5372 22.5705 52.5372 22.0604C53.6015 21.789 54.6779 22.4578 54.9414 23.5543Z" fill="${getColor(spanHighlight)}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M30.5683 0.723125C31.2416 1.56018 31.1132 2.78806 30.2815 3.46568L3.15662 25.5656C2.32493 26.2432 1.10492 26.1139 0.431651 25.2769C-0.241621 24.4398 -0.113199 23.2119 0.71849 22.5343L27.8434 0.434435C28.6751 -0.24318 29.8951 -0.113929 30.5683 0.723125Z" fill="${getColor(spanHighlight)}"/>
      `;

      document.body.appendChild(svgHighlight);
      allSvgElements.push(svgHighlight);

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

    // === UNDERLINE 2 ===
    const spanUnderline2 = document.querySelectorAll('.sct_text_decoration_word.underline_2');

    spanUnderline2.forEach((spanUnderline, index) => {
      console.log('Found underline_2 span:', spanUnderline);

      // Create SVG container with the UNDERLINE_2.SVG content
      const svgUnderline = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgUnderline.id = `underline-2-${index}`;
      svgUnderline.setAttribute('viewBox', '0 0 751 36');
      svgUnderline.setAttribute('fill', 'none');
      svgUnderline.style.position = 'absolute';
      svgUnderline.style.pointerEvents = 'none';
      svgUnderline.style.zIndex = '1';
      svgUnderline.style.opacity = '0'; // Initial hidden state

      // Add the SVG path content
      svgUnderline.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M133.514 12.8204C125.316 14.3549 117.621 16.5764 110.681 19.6911C109.925 20.0346 109.696 20.5154 109.628 20.7216C109.513 21.088 109.559 21.4317 109.742 21.7523C109.857 21.9584 110.04 22.2104 110.429 22.3707C110.704 22.4852 111.414 22.5767 112.353 22.5538C113.956 22.5309 116.43 22.3478 117.621 22.3478C121.697 22.3936 125.774 22.3705 129.85 22.4392C142.836 22.6682 145.103 22.8514 161.798 22.714C181.288 22.5537 200.824 22.2789 220.336 21.8667C158.318 25.302 96.3903 29.3099 34.7837 33.0429C34.0966 33.0887 33.5699 33.6843 33.6157 34.3714C33.6386 35.0814 34.2568 35.6082 34.9439 35.5624C178.7 26.8596 324.037 16.5993 468.893 15.9351C476.038 16.0954 483.16 16.2556 490.26 16.4159C533.156 17.4236 576.074 18.6375 618.924 20.5155C632.871 21.1339 646.819 21.8209 660.789 22.4621C664.911 22.6454 669.057 22.8285 673.202 23.0118C676.546 23.1492 685.157 23.6531 686.37 23.676C687.47 23.6989 687.745 22.7143 687.768 22.6685C687.836 22.3478 687.79 21.9812 687.516 21.6377C687.447 21.5461 687.264 21.2943 686.851 21.1798C686.783 21.1798 686.462 21.1338 685.798 21.0651C651.353 18.2482 616.817 16.3015 582.212 15.0648C586.861 15.1106 591.51 15.1336 596.159 15.1794C632.001 15.4542 667.934 16.439 703.753 15.1794C711.906 14.9046 720.082 14.5838 728.213 14.1945C733.686 13.9426 747.771 14.2633 749.763 13.6678C750.679 13.4159 750.885 12.7746 750.908 12.4539C750.931 12.0875 750.863 11.6753 750.45 11.3088C750.267 11.1256 749.695 10.828 748.618 10.599C713.464 2.9726 672.331 5.12524 636.536 2.99535C539.316 -2.84469 442.44 1.04883 345.244 4.59866C261.354 7.66754 177.463 7.82781 93.619 11.996C62.9302 13.5075 31.2797 11.7671 1.02608 17.5384C0.339013 17.6758 -0.0962711 18.3168 0.0182392 19.0039C0.155652 19.691 0.819868 20.1491 1.50693 20.0117C31.6231 14.2633 63.1593 16.0267 93.7336 14.5152C106.994 13.851 120.254 13.3014 133.514 12.8204ZM392.88 14.5152C341.511 13.7136 290.142 13.3013 238.727 13.5532C203.458 13.7135 152.065 7.00344 117.025 19.8286C117.277 19.8286 117.483 19.8286 117.666 19.8286C121.743 19.8744 125.819 19.8284 129.896 19.92C142.859 20.1491 145.126 20.3323 161.776 20.1948C204.351 19.8284 247.04 18.9125 289.592 17.4926C324.06 16.3475 358.482 15.3167 392.88 14.5152ZM740.373 11.5607C707.143 5.74358 669.469 7.48438 636.375 5.5148C539.247 -0.325236 442.44 3.56801 345.336 7.11784C301.936 8.72098 258.56 9.52251 215.206 10.5073C223.52 10.8279 231.467 11.0569 238.727 11.034C312.219 10.6676 385.689 11.6525 459.182 13.2099C504.826 12.5228 550.47 12.2709 596.182 12.6373C632.001 12.935 667.865 13.897 703.684 12.6602C711.815 12.3854 719.968 12.0647 728.098 11.6753C730.869 11.5608 735.885 11.5836 740.373 11.5607Z" fill="${getColor(spanUnderline)}"/>
      `;

      document.body.appendChild(svgUnderline);
      allSvgElements.push(svgUnderline);

      function positionUnderline() {
        const rect = spanUnderline.getBoundingClientRect();

        // Adjust positioning to place underline below text
        const paddingY = 5; // vertical offset below text

        svgUnderline.style.position = 'absolute';
        svgUnderline.style.left = (rect.left + window.scrollX) + 'px';
        svgUnderline.style.top = (rect.bottom + window.scrollY + paddingY) + 'px';
        svgUnderline.style.width = rect.width + 'px';
        svgUnderline.style.height = 'auto';
      }

      positionUnderline();
      window.addEventListener('resize', positionUnderline);
    });

    // === UNDERLINE 3 ===
    const spanUnderline3 = document.querySelectorAll('.sct_text_decoration_word.underline_3');

    spanUnderline3.forEach((spanUnderline, index) => {
      console.log('Found underline_3 span:', spanUnderline);

      // Create SVG container with the UNDERLINE_3.SVG content
      const svgUnderline = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgUnderline.id = `underline-3-${index}`;
      svgUnderline.setAttribute('viewBox', '0 0 701 41');
      svgUnderline.setAttribute('fill', 'none');
      svgUnderline.style.position = 'absolute';
      svgUnderline.style.pointerEvents = 'none';
      svgUnderline.style.zIndex = '1';
      svgUnderline.style.opacity = '0'; // Initial hidden state

      // Add the SVG path content
      svgUnderline.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M297.372 3.8421C264.478 5.15876 231.969 6.77771 200.269 8.54764C155.392 11.0514 110.534 13.6416 65.9454 17.7427C51.9099 19.0377 37.6568 19.8579 23.7091 21.4767C14.9537 22.4912 3.34411 23.9372 1.82051 24.2393C1.0236 24.412 0.675935 24.6713 0.563595 24.7576C-0.226293 25.362 -0.0821673 25.9445 0.363681 26.3978C0.542722 26.5921 0.995464 27.0671 2.25226 27.1319C86.3034 31.5567 172.25 22.9229 256.403 22.0163C402.339 20.4623 552.699 26.6354 697.477 40.1042C698.74 40.2121 699.969 39.6723 700.145 38.8737C700.355 38.0967 699.443 37.3412 698.179 37.2333C553.156 23.7429 402.55 17.5482 256.333 19.1238C177.906 19.9656 97.9305 27.5419 19.3946 24.9518C21.199 24.736 22.9685 24.52 24.5834 24.3258C38.4749 22.7069 52.6683 21.9084 66.6475 20.6133C111.141 16.5122 155.908 13.9221 200.725 11.4399C256.333 8.33172 314.363 5.65522 372.85 4.40332C393.773 4.59758 414.626 4.79193 435.479 5.02936C480.591 5.54738 525.913 7.05831 570.919 9.08725C584.47 9.7132 598.021 10.3607 611.572 10.9219C616.066 11.1161 627.651 11.6772 629.266 11.6341C631.267 11.5909 631.653 10.5549 631.688 10.3823C631.793 9.99375 631.723 9.45411 630.74 9.00083C630.634 8.93608 630.003 8.7201 628.598 8.59059C546.766 0.949676 459.387 -0.323609 372.921 1.51107C281.715 0.712447 190.158 0.366936 99.1839 0C97.8815 0 96.8177 0.64763 96.8072 1.44626C96.8002 2.24488 97.8498 2.89253 99.1522 2.91412C165.025 3.17313 231.232 3.432 297.372 3.8421Z" fill="${getColor(spanUnderline)}"/>
      `;

      document.body.appendChild(svgUnderline);
      allSvgElements.push(svgUnderline);

      function positionUnderline() {
        const rect = spanUnderline.getBoundingClientRect();

        // Adjust positioning to place underline below text
        const paddingY = 5; // vertical offset below text

        svgUnderline.style.position = 'absolute';
        svgUnderline.style.left = (rect.left + window.scrollX) + 'px';
        svgUnderline.style.top = (rect.bottom + window.scrollY + paddingY) + 'px';
        svgUnderline.style.width = rect.width + 'px';
        svgUnderline.style.height = 'auto';
      }

      positionUnderline();
      window.addEventListener('resize', positionUnderline);
    });

    // === UNDERLINE 1 ===
    const spanUnderline1 = document.querySelectorAll('.sct_text_decoration_word.underline_1');

    spanUnderline1.forEach((spanUnderline, index) => {
      console.log('Found underline_1 span:', spanUnderline);

      // Create SVG container with the UNDERLINE_1.SVG content
      const svgUnderline = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgUnderline.id = `underline-1-${index}`;
      svgUnderline.setAttribute('viewBox', '0 0 600 54');
      svgUnderline.setAttribute('fill', 'none');
      svgUnderline.style.position = 'absolute';
      svgUnderline.style.pointerEvents = 'none';
      svgUnderline.style.zIndex = '1';
      svgUnderline.style.opacity = '0'; // Initial hidden state

      // Add the SVG path content
      svgUnderline.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M359.081 24.664C279.232 25.6231 199.343 29.4278 119.842 36.2287C82.0441 39.4627 38.1499 39.0584 1.49101 50.0841C-0.335611 50.639 0.0122627 52.3035 0.0517999 52.47C0.130874 52.8108 0.463072 53.9442 1.91804 53.9997C2.07619 54.0076 3.19106 53.8491 3.61806 53.7936C14.4433 52.3669 25.2291 50.7024 36.0623 49.3549C73.4645 44.6863 110.977 41.159 148.546 38.0677C198.41 33.9618 248.701 31.774 298.7 30.0619C326.068 29.1266 354.092 30.371 381.546 28.437C391.628 28.3815 401.71 28.3737 411.792 28.4054C453.939 28.556 496.038 30.1571 538.114 32.3528C551.643 33.0582 561.962 33.8191 575.207 34.3344C580.237 34.5325 588.215 34.6673 593.766 34.7545C594.581 34.7703 596.66 34.786 597.522 34.794C597.609 34.8098 597.696 34.8098 597.791 34.8098C598.123 34.8098 598.281 34.786 598.313 34.786C600.195 34.5086 600.021 32.7252 599.974 32.4557C599.966 32.4002 599.681 30.8942 598.06 30.8387C597.673 30.8228 594.897 30.8071 593.829 30.7913C588.31 30.7041 580.363 30.5693 575.358 30.3791C562.137 29.8639 551.825 29.1029 538.319 28.3975C496.18 26.2019 454.018 24.5928 411.808 24.4422C406.652 24.4263 401.489 24.4184 396.333 24.4263C396.159 23.9745 395.772 23.4672 394.918 23.2453C394.119 23.0392 388.402 22.8569 386.196 22.6746C369.867 21.3271 370.349 21.3905 352.384 20.2887C325.174 18.6163 321.031 18.2356 292.73 17.5302C241.324 16.2461 189.894 16.3493 138.48 16.4761C113.097 16.5474 85.9187 18.2674 60.1483 15.0572C68.6409 14.0585 77.1652 13.3293 85.6736 12.497C114.726 9.65933 143.801 7.89958 172.972 6.66305C242.945 3.69857 313.028 2.51762 382.978 6.5601C368.088 6.70278 353.206 7.03559 338.316 7.2496C277.706 8.13736 216.51 7.47161 156.026 12.0769C154.943 12.1641 154.128 13.1152 154.207 14.2011C154.286 15.295 155.243 16.1114 156.327 16.0322C216.731 11.4269 277.84 12.1006 338.372 11.2128C360.861 10.8878 383.341 10.3013 405.83 10.4757C413.548 10.5391 421.265 10.8245 428.983 10.9196C430.509 10.9434 434.439 11.2446 435.001 11.1178C436.242 10.8404 436.511 9.92085 436.59 9.46904C436.629 9.19955 436.756 7.64596 434.858 7.09111C421.906 3.30228 398.002 3.47666 385.413 2.73157C314.602 -1.46944 243.648 -0.296356 172.806 2.69984C143.564 3.94429 114.417 5.71199 85.2861 8.55758C75.1093 9.54839 64.9087 10.4044 54.7713 11.7202C53.1345 11.9342 49.4576 12.2434 47.6784 12.5684C46.9351 12.7032 46.3974 12.8933 46.1601 13.028C45.235 13.5512 45.0689 14.3121 45.0689 14.8273C45.061 15.2236 45.2271 16.6187 47.1644 16.9992C76.6829 22.7934 108.803 20.5186 138.487 20.4393C189.87 20.3125 241.26 20.2093 292.635 21.4934C320.865 22.1988 324.992 22.5716 352.146 24.244C354.827 24.4026 357.096 24.5451 359.081 24.664Z" fill="${getColor(spanUnderline)}"/>
      `;

      document.body.appendChild(svgUnderline);
      allSvgElements.push(svgUnderline);

      function positionUnderline() {
        const rect = spanUnderline.getBoundingClientRect();

        // Adjust positioning to place underline below text
        const paddingY = 5; // vertical offset below text

        svgUnderline.style.position = 'absolute';
        svgUnderline.style.left = (rect.left + window.scrollX) + 'px';
        svgUnderline.style.top = (rect.bottom + window.scrollY + paddingY) + 'px';
        svgUnderline.style.width = rect.width + 'px';
        svgUnderline.style.height = 'auto';
      }

      positionUnderline();
      window.addEventListener('resize', positionUnderline);
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
      svgHighlight.style.opacity = '0'; // Initial hidden state

      // Add the SVG path content
      svgHighlight.innerHTML = `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="${getColor(spanHighlight)}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="${getColor(spanHighlight)}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="${getColor(spanHighlight)}"/>
      `;

      document.body.appendChild(svgHighlight);
      allSvgElements.push(svgHighlight);

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

    // Return all SVG elements so they can be used in GSAP animations
    return allSvgElements;
  } // Close init() function

  // Call init immediately and return the SVG elements array
  return init();
}

// if (document.body.classList.contains('sct_text_decoration_svg')) {
  sct_text_decoration_svg();
// }

export default sct_text_decoration_svg