import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** JS to get the SJS nav bar sites have a blur w bg when scrolling down */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


function sj_navbar_blur() {
  console.log('sj_navbar_blur.js is working')

  function init() {

    console.log('sj_navbar_blur init function is working')
     
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
          const bgOpacity = progress * 85; // 0 to 85 (representing 0% to 85%)
          const bgColor = `color-mix(in srgb, var(--_theme---sjs_body_bg) ${bgOpacity}%, transparent)`;
          
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

// if (document.body.classList.contains('sj_navbar_blur')) {
//   sj_navbar_blur();
// }

sj_navbar_blur();


export default sj_navbar_blur
