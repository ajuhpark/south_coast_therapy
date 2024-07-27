import '../src/styles/style.css'

import { gsap } from 'gsap'

import example_7 from './example_7'
example_7()

// import cs_website_builder_tools from './cs_website_builder_tools'
// importing the gsdevtools

// Fix Studio Animation

{/* <script src="https://uploads-ssl.webflow.com/64e3f970ea8b5a18219f286f/66941a3b8f89ae0468a8ed24_GSDevTools.txt"></script> */}


// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)

// console.log('example_1.js is working outside of function')


function example_1() {
  console.log('example_1.js is working')
  // console.log(gsap)

  function init(){
    // gsap.from("html", {duration: 0, autoAlpha:0})

    /* 
    so the overlay-dark div is z-index: 2 and it's filling the page. 
    It's moving up to out of the screen.
    */
    gsap.from("html", {duration: 0, autoAlpha:0})

    gsap.to("#overlay-dark", {
      duration: 2,
      top: "-100%",
      ease: "power3.inOut",
      delay: 4,
    });

    /* 
    More notes:
    The overlay-light div is z-index: 1 and it's filling the page. 
    There's no blending mode. It's just normal.
    It actually doesn't have an animation so it just stays there 
    below the black overlay and the text. 

    The text and divider are originally white. 

    Since the black overlay is there and has that blending: difference, 
    the black text and lines are white. But as soon as that's lifted, 
    the original colors show up there.


    */

    gsap.from(".divider", {
      duration: 3,
      scaleX: 0,
      ease: "power3.inOut",
      delay: 1,
      stagger: {
        amount: 1,
      },
    });

    // gsap.fromTo(".divider", 
    //   { width: "0%" }, 
    //   { width: "100%", 
    //     duration: 3, 
    //     ease: "power2.inOut",
    //     delay: 1,
    //     // stagger: 
    //     // {
    //     //   amount: 1
    //     // },
    //     stagger:{
    //       from:"end", //try "center" and "edges"
    //       each:0.05, 
    //       // repeat: 2
    //       // grid: 'auto'
    //     }

    //   }
    // )

    // ".row > .col" means all the children of .row that are .col
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
