import '../src/styles/style.css'
import { gsap } from 'gsap'
import example_7 from './example_7'
// example_7()

// import { SplitText } from 'gsap/SplitText'

/** Camille Mormal Tutorail */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


const mormal_tl = gsap.timeline({delay: 0})

function example_8() {
  console.log('example_8.js is working')

  function init() {

    console.log('example_8 init function is working')

    mormal_tl
      .from("html", {duration: 0, autoAlpha:0}, 'mormal_tl')

      // I had to get the original container to be huge to get images good quality. Here, I'm setting the the container back to the 100% width and height. 
      .set(".mormal_container", {
        width: "100%",
        height: "100%",
        duration: 0,
      }, "mormal_tl+=0") // Starts at the beginning

      // Starts at the beginning
      // .set(".mormal_container_copy", {
      //   width: "100%",
      //   height: "100%",
      //   // bottom: "0",
      //   // left: "0",
      //   display: "none",
      //   duration: 0,
      // }, "mormal_tl+=0") 

      .set(".mormal_container_copy", {
        display: "none",
        duration: 0,
      }, "mormal_tl+=0") 

      // .to(".mormal_container_copy", {
      //   display: "flex",
      //   duration: 0,
      // }, "mormal_tl+=6.85") 

      // Starts at 3 seconds
      // .to(".mormal_container_copy", {
      //   scale: 6,
      //   duration: 4,
      //   ease: "power4.inOut"
      // }, "mormal_tl+=3") 

      // can add this back later - ", .mormal_col_copy"
      .to(".mormal_col", {
        top: "0",
        duration: 3,
        ease: "power4.inOut"
      }, "mormal_tl+=0") // Starts at the beginning

      .to(".mormal_c-1 .mormal_item", {
        top: "0",
        stagger: .25,
        duration: 3,
        ease: "power4.inOut"
      }, "mormal_tl+=0") // Starts at the beginning

      // 2 and 4 have negative stagger because they're going opposite direction of elements.
      .to(".mormal_c-2 .mormal_item", {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "mormal_tl+=0") // Starts at the beginning

      .to(".mormal_c-3 .mormal_item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "mormal_tl+=0") // Starts at the beginning
      
      /* 
      .to(".mormal_item_copy", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "mormal_tl+=0") // Starts at the beginning
      */
      
      .to(".mormal_c-4 .mormal_item", {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "mormal_tl+=0") // Starts at the beginning

      .to(".mormal_c-5 .mormal_item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "mormal_tl+=0") // Starts at the beginning

      .to(".mormal_container", {
        // scale: 6.26,
        scale: 6,
        // width: "600vw",
        // height: "600vh",
        // left: "-250%",
        // bottom: "-250%",
        duration: 4,
        ease: "power4.inOut"
      }, "mormal_tl+=3") // Starts at 3 seconds

      /** Another way to scale the container
      .to(".mormal_container", {
        width: "600vw",
        height: "600vh",
        bottom: "-250%",
        left: "-250%",
        duration: 4,
        ease: "power4.inOut"
      }, "mormal_tl+=3") // Starts at 3 seconds
      */
      .to(".mormal_nav-item_text, .mormal_title_text, .mormal_slide-num_text, .mormal_img.preview", {
        top: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      }, "mormal_tl+=5.5") // Starts at 5.5 seconds

      .to(".mormal_ion-icon, .mormal_ion-icon", {
        scale: 1,
        stagger: 0.05,
        ease: "power3.out",
      }, "mormal_tl+=6.5") // Starts at 6.5 seconds



      GSDevTools.create({})


  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('example_8')) {
  example_8();
}


export default example_8
