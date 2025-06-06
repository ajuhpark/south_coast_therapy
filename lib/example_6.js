import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'
import example_17 from './example_17'


/** Constance Souville Tutorial */


// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


const constance_tl = gsap.timeline();

function example_6() {
  console.log('example_6.js is working')

  function init() {

    console.log('example_6 init function is working')



    constance_tl
    .from("html", {duration: 0, autoAlpha:0}, 'constance_tl')

    .from(".constance_p", {
      opacity: 0,
      y: -100,
      ease: "power4.out",
      // delay: 1,
      duration: 1.8,
      stagger: {
        amount: 0.3,
      },
    }, "constance_tl<+=1")

    .from(".hr", {
        width: 0,
        ease: "power4.out",
        duration: 1.8,
        // delay: 1,
        stagger: {
          amount: 0.3,
        },
      },
      "constance_tl<+=1.5"
    )
    
    .from(
      ".constance_reveal div", {
        y: 200,
        ease: "power4.out",
        duration: 1.8,
        stagger: {
          amount: 0.8,
        },
      },
      "constance_tl<+=2"
    )
    
    .from(
      ".constance_nav-item", {
        opacity: 0,
        y: 100,
        ease: "power4.out",
        duration: 1.8,
        stagger: {
          amount: 0.3,
        },
      },
      "constance_tl<+=2"
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
