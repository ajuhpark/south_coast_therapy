import '../src/styles/style.css'
import { gsap } from 'gsap'

function colorModeToggle() {
  console.log('colorModeToggle.js is working');
  
  // Check if document is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeButtons();
  } else {
    document.addEventListener("DOMContentLoaded", initializeButtons);
  }
  
  function initializeButtons() {
    console.log('DOM is ready, initializing buttons');
    
    // Get all color set buttons
    for (let i = 1; i <= 4; i++) {
      const button = document.querySelector(`.sjs_button_color_set_${i}`);
      
      // Log whether the button was found or not
      if (button) {
        console.log(`Button ${i} found:`, button);
        
        button.addEventListener("click", function() {
          // Log when a button is clicked
          console.log(`Button ${i} clicked - applying color_set_${i}`);
          
          // Run the GSAP animation with the appropriate theme
          gsap.to(".sjs_body", { ...colorThemes.getTheme(`color_set_${i}`) });
          
          // For color_set_2, add filter: invert(1) to logo and hamburger
          if (i === 2) {
            console.log("Adding invert filter to logo and hamburger");
            gsap.to(".sjs_logo_image, .sjs_hamburger_lottie", { 
              filter: "invert(1)",
              duration: 0.5 // Match the duration of your theme transition
            });
          } else {
            // For other color sets, remove the invert filter
            console.log("Removing invert filter from logo and hamburger");
            gsap.to(".sjs_logo_image, .sjs_hamburger_lottie", { 
              filter: "invert(0)",
              duration: 0.5
            });
          }
        });
      } else {
        console.warn(`Button ${i} with class .sjs_button_color_set_${i} not found in the DOM`);
      }
    }
    
    // Log all buttons found (alternative method)
    console.log("All color set buttons found in DOM:", {
      button1: document.querySelector('.sjs_button_color_set_1'),
      button2: document.querySelector('.sjs_button_color_set_2'),
      button3: document.querySelector('.sjs_button_color_set_3'),
      button4: document.querySelector('.sjs_button_color_set_4')
    });
  }
}

// Execute the function immediately
colorModeToggle();

export default colorModeToggle