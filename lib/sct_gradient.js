/** 
 * sct gradient
*/


import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'


// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(ScrollTrigger)

// make the mobile size stay the same
// ScrollTrigger.normalizeScroll(true);
// ScrollTrigger.config({
//   ignoreMobileResize: true,
// });


function sct_gradient() {
  console.log('sct_gradient.js is working')

  function init() {
    console.log('sct_gradient init is working')


    // Select all gradient elements
    const gradients = document.querySelectorAll('.sct_card_gradient-block__gradient');

    gradients.forEach((gradient) => {
    // Create and start the gradient animation timeline
    const gradientTimeline = gsap.timeline({
        repeat: -1,
    });
    
    gradientTimeline.to(gradient, {
        duration: 8,
        ease: 'none',
        x: '-50%',
        y: '-50%',
    });
    
    gradientTimeline.to(gradient, {
        duration: 2.5,
        ease: 'none',
        x: '-50%',
        y: 0,
    });
    
    gradientTimeline.to(gradient, {
        duration: 5,
        ease: 'none',
        x: 0,
        y: '-50%',
    });
    
    gradientTimeline.to(gradient, {
        duration: 2.5,
        ease: 'none',
        x: 0,
        y: 0,
    });
    
    // Restart gradient animation on resize to prevent visual glitches
    window.addEventListener('resize', () => {
        const currentTime = gradientTimeline.time();
        gradientTimeline.restart();
        gradientTimeline.invalidate();
        gradientTimeline.time(currentTime);
    });
    });




    } // Close init() function





  window.addEventListener("load", function(event) { 
    init(); 
  });
}

// if (document.body.classList.contains('sct_gradient')) {
  sct_gradient();
// }

export default sct_gradient