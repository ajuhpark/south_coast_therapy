import '../src/styles/style.css'

import { gsap } from 'gsap'

// importing the gsdevtools
{/* <script src="https://uploads-ssl.webflow.com/64e3f970ea8b5a18219f286f/66941a3b8f89ae0468a8ed24_GSDevTools.txt"></script> */}


// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)

console.log('example_1.js is working outside of function')


function example_1() {
  console.log('example_1.js is working')
  // console.log(gsap)

  function init(){
    // gsap.from("html", {duration: 0, autoAlpha:0})

    gsap.to("#overlay-dark", {
      duration: 2,
      top: "-100%",
      ease: "power3.inOut",
      delay: 4,
    });
    gsap.from(".divider", {
      duration: 3,
      scaleX: 0,
      ease: "power3.inOut",
      delay: 1,
      stagger: {
        amount: 1,
      },
    });
    gsap.from(".row > .col", {
      duration: 2, 
      opacity: 0,
      y: 40,
      ease: "power3.inOut",
      delay: 2,
      stagger: {
        amount: 1.5,
      },
    });

    gsap.from(".marquee", {
      duration: 1, 
      bottom: "-5%",
      opacity: 0,
      ease: "power3.inOut",
      delay: 4.5,
    });

    GSDevTools.create({})

  }



  // addressing the Flash of unstyled content issue.
  window.addEventListener("load", function(event) { 
    init(); //do stuff
    // GSDevTools.create({animation:tl})
   });
}

if ($('body').hasClass('example_1')) {
  example_1();
}


export default example_1
