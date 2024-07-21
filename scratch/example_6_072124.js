import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Constance Souville Tutorial */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


const constance_tl = gsap.timeline();

function example_6() {
  console.log('example_6.js is working')

  function init() {

    console.log('example_6 init function is working')

    gsap.from("html", {duration: 0, autoAlpha:0})


      constance_tl.from(".constance_p", 1.8, {
        opacity: 0,
        y: -100,
        ease: "power4.out",
        delay: 1,
        stagger: {
          amount: 0.3,
        },
      });

      constance_tl.from(
        ".hr",
        1.8,
        {
          width: 0,
          ease: "power4.out",
          delay: 1,
          stagger: {
            amount: 0.3,
          },
        },
        "-=1.5"
      );

      constance_tl.from(
        ".constance_reveal div",
        1.8,
        {
          y: 200,
          ease: "power4.out",
          stagger: {
            amount: 0.8,
          },
        },
        "-=2"
      );

      constance_tl.from(
        ".constance_nav-item",
        1.8,
        {
          opacity: 0,
          y: 100,
          ease: "power4.out",
          stagger: {
            amount: 0.3,
          },
        },
        "-=2"
      );
    
    GSDevTools.create({})

    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('example_6')) {
  example_6();
}

export default example_6
