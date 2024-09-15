import '../src/styles/style.css'
import { gsap } from 'gsap'
import example_7 from './example_7'
// example_7()

// import { SplitText } from 'gsap/SplitText'

/** Jomor Tutorail */

// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger)


function example_10() {
  console.log('example_10.js is working')

  function init() {

    console.log('example_10 init function is working')

    gsap.from("html", {duration: 0, autoAlpha:0}, 'fut_hover')

    
    // gsap.from(".jomor_project_frame", {
    //   scale: "1.15", 
    //     scrollTrigger: {
    //       trigger: ".jomor_project_link",
    //       markers: true,
    //       scrub: 1,
    //     }
    // })

    // gsap.from(".jomor_project_frame", {
    //   top: '0%', 
    //   scrollTrigger: {
    //     trigger: ".jomor_project_link",
    //     markers: true,
    //     scrub: 1,
    //     top: "20%"
    //   }
    // })

    // gsap.from(".jomor_project-name-div", {
    //   top: '20%', 
    //   scrollTrigger: {
    //     trigger: ".jomor_project_link",
    //     markers: true,
    //     scrub: 1,
    //     top: "25%"
    //   }
    // })



    /** example gsap scrolltrigger timeline 
    gsap.from(".herman", {
      duration:10, x:"-50vw", rotation:-360, ease:"linear", 
        scrollTrigger: {
          trigger:".herman",
          markers:true,
          start:"top 75%", //when top of herman passes 75% viewport height
          end:"bottom 25%", //when bottom of herman passes 25% viewport height
          
               //events: onEnter onLeave onEnterBack onLeaveBack
          toggleActions:"restart complete reverse reset"
              //options: play, pause, resume, reset, restart, complete, reverse,none
        }
    }) 
    */
    

  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('example_10')) {
  example_10();
}


export default example_10
