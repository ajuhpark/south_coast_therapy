// this is for splittext that needs to be wrapped. 
// it helps w resize and gives css property that has overflow none 


function split_text_additional() {
  console.log("split_text_additional.js is working")  

  // Function to wrap lines in container divs with overflow:hidden
  function wrapLines(lines) {
  }

  // Advanced cleanup function for SplitText
  function cleanupSplitText() {
  }


    // Add CSS for properly hiding split lines
    const styleId = 'split-line-styles';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = `
        .split-line-container {
          overflow: hidden !important;
          display: block !important;
          position: relative !important;
        }
        .split-line {
          position: relative !important;
          display: block !important;
        }
      `;
      document.head.appendChild(styleElement);
    }

    // Register slideUp effect (FIXED VERSION)
    gsap.registerEffect({
      name: "slideUp", 
      extendTimeline: true,
      defaults: {
        y: "110%",
        x: 0,
        duration: 0.5  // Default duration, can be overridden
      },
      effect: (targets, config) => {
        let tl = gsap.timeline();
        tl.from(targets, {
          duration: config.duration,  // Now uses the passed duration
          x: config.x,
          y: config.y,
          opacity: 0,  // Start invisible
          stagger: {
            each: 0.2,
            ease: "power1.in"
          }
        });
        return tl;
      }
    });


    // Kill and reset all animations and properties
    function killAll() {
    }

    // This bit of code from stackoverflow is going to help us when resizing
    function debounce(func){
    }

    // Add resize listener with debounce
    window.addEventListener("resize", debounce(function(e){
      console.log("Resize detected - reinitializing");
      killAll();
    }))
    
}


export default split_text_additional
