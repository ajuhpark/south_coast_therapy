import '../src/styles/style.css'
import { gsap } from 'gsap'
import example_7 from './example_7'
example_7()
// import { SplitText } from 'gsap/SplitText'

/** Camille Mormal Tutorail */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


const mormal_tl = gsap.timeline({delay: 0})

function example_8() {
  console.log('example_8.js is working')

  function init() {

    console.log('example_8 init function is working')

    gsap.from("html", {duration: 0, autoAlpha:0})

    mormal_tl
      .to(".mormal_col", {
        top: "0",
        duration: 3,
        ease: "power4.inOut"
      })
      
      //css for this element below is in css in webflow.
      .to(".mormal_c-1 .mormal_item", {
        top: "0",
        stagger: .25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=2")

      .to(".mormal_c-2 .mormal_item", {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=4")

      .to(".mormal_c-3 .mormal_item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=4")

      .to(".mormal_c-4 .mormal_item", {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=4")

      .to(".mormal_c-5 .mormal_item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=4")

      .to(".mormal_container", {
        scale: 5.5,
        duration: 4,
        ease: "power4.inOut"
      }, "-=2")

      // .to(".mormal_img_container", {
      //   scale: 0.1667,
      //   duration: 4,
      //   ease: "power4.inOut"
      // }, "<")

      // .to(".mormal_img", {
      //   scale: 6,
      //   duration: 4,
      //   ease: "power4.inOut"
      // }, "<")

      .to(".mormal_nav-item_text, .mormal_title_text, .mormal_slide-num_text, .mormal_img.preview", {
        top: 0,
        stagger: 0.075,
        duration: 1,
        ease: "power3.out",
      }, "-=1.5")

      .to(".mormal_ion-icon, .mormal_ion-icon", {
        scale: 1,
        stagger: 0.05,
        ease: "power3.out",
      }, "-=1")


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
