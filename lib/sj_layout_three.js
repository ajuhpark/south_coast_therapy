import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'
// import sj_menu from './sj_menu.js';
// sj_menu();


/** Rejoice Menu - https://rejouice.com/ */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger);


function sj_layout_three() {
  console.log('sj_layout_three.js is working')

  function init() {

    console.log('sj_layout_three init function is working')

    gsap.from("html", {duration: 0, autoAlpha:0})
      
    // navbar animation
    
    // Get your navbar element
  const navbar = document.getElementById('sjs_sticky_nav');
  
  // Store the target background color
  const targetBgColor = "rgba(250, 251, 252, 0.85)";
  
  // Clear any existing backdrop-filter and set initial background color
  navbar.style.backdropFilter = "blur(0px)";
  navbar.style.webkitBackdropFilter = "blur(0px)";
  navbar.style.backgroundColor = "rgba(250, 251, 252, 0)"; // Start transparent
  
  // Create the scroll tween
  gsap.fromTo(navbar, 
    {
      autoAlpha: 1,
      onStart: function() {
        gsap.set(this.targets()[0], {
          backdropFilter: "blur(0px)",
        });
      },
    },
    {
      autoAlpha: 1, // Keep opacity at 1
      onUpdate: function() {
        // Calculate progress (0 to 1)
        const progress = this.progress();
        
        // Calculate blur amount based on progress (0 to 5px)
        const blurAmount = progress * 5;
        const blurValue = `blur(${blurAmount}px)`;
        
        // Calculate background color based on progress
        // From rgba(250, 251, 252, 0) to rgba(250, 251, 252, 0.85)
        const bgOpacity = progress * 0.85;
        const bgColor = `rgba(250, 251, 252, ${bgOpacity})`;
        
        // Apply the styles
        const target = this.targets()[0];
        target.style.backdropFilter = blurValue;
        target.style.webkitBackdropFilter = blurValue;
        target.style.backgroundColor = bgColor;
      },
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "100px top",
        scrub: true,
        // markers:true
      }
    }
  );

    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('sj_layout_three')) {
  sj_layout_three();
}

export default sj_layout_three
