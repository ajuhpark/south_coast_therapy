import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Rejoice Menu - https://rejouice.com/ */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


function sj_fixed_icon_st() {
  console.log('sj_fixed_icon_st.js is working')

  function init() {

    console.log('sj_fixed_icon_st init function is working')

    let sj_banner_1_icon_group_container_fixed_icons = document.querySelector('.sj_banner_1_icon_group_container_fixed_icons')
    
    // Create the fixed icon group tween with both width change and y-axis movement
    let fixed_icon_group_animation = gsap.timeline()
      .fromTo(sj_banner_1_icon_group_container_fixed_icons, 
        {
          width: "66%",
          height: "80%",
          y: 0
        },
        {
          width: "90%",
          height:"90%",
          // Move up by 50px when scrolling (adjust value as needed)
          y: "-50%",
          duration: 1,
          ease: "power2.out",
          id: "fixed_icon_group_animation"
        }
      )
      // Add the bounce-back effect as the user continues scrolling
      .to(sj_banner_1_icon_group_container_fixed_icons, {
        width: "100%",
        height:"100%",
        y: 0, // Return to original position
        duration: 1.5,
        // ease: "elastic.out(1, 0.5)", // Elastic ease gives a natural bouncing effect
        ease: "power1.in", // Elastic ease gives a natural bouncing effect
      });

    // Create the ScrollTrigger that will update the tween's progress
    let fixed_icon_group_st = ScrollTrigger.create({
      trigger: document.querySelector(".small_joys_home") || document.body,
      start: "top 0%",
      end: "bottom 100%",
      scrub: 0.5,
      ease: "power2.inOut",
      markers: true,
      animation: fixed_icon_group_animation
    });
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

export default sj_fixed_icon_st