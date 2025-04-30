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
    
        // Create the fixed icon group tween 
        let fixed_icon_group_animation = gsap
        // .from(sj_banner_1_icon_group_container_fixed_icons, {
        //   // height: "90%",
        // })
        .to(sj_banner_1_icon_group_container_fixed_icons, {
          width: "100%",
          height:"100%",
          duration: 1, // 1 second duration, adjust as needed
          ease: "power2.inOut", // smooth easing, change if you prefer a different style
          id: "fixed_icon_group_animation" // naming the animation;
        })

        // Create the ScrollTrigger that will update the tween's progress.
        let fixed_icon_group_st = ScrollTrigger.create({
          trigger: document.querySelector(".small_joys_home") || document.body,
          start: "top 0%",
          end: "bottom 100%",
          // scrub: true, 
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
