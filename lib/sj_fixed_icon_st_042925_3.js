import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Rejoice Menu - https://rejouice.com/ */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)

function sj_fixed_icon_st() {
  console.log('sj_fixed_icon_st.js is working')
  
  // Store our specific ScrollTrigger instance in a module-level variable
  let fixed_icon_group_st = null;

  function init() {
    console.log('sj_fixed_icon_st init function is working')

    // First kill any existing instance to avoid duplicates
    if (fixed_icon_group_st) {
      fixed_icon_group_st.kill();
      fixed_icon_group_st = null;
    }

    let sj_banner_1_icon_group_container_fixed_icons = document.querySelector('.sj_banner_1_icon_group_container_fixed_icons')
    
    // Create the fixed icon group tween with smoother animation
    let fixed_icon_group_animation = gsap.timeline()
      .fromTo(sj_banner_1_icon_group_container_fixed_icons, 
        {
          width: "66%",
          height: "80%",
          y: 0
        },
        {
          width: "85%",
          height: "90%",
          y: "-50%",
          duration: 3, // Longer duration for smoother animation when scrubbing
          ease: "power1.out", // Smoother easing
          id: "fixed_icon_group_animation"
        }
      )
      // Add the second part with a smoother transition
      .to(sj_banner_1_icon_group_container_fixed_icons, {
        width: "100%",
        height: "100%",
        y: "50", 
        duration: 2, // Longer duration for smoother animation
        ease: "power1.inOut", // More subtle easing for smoother movement
      });

    // Create the ScrollTrigger with improved smoothness and store it in our module-level variable
    fixed_icon_group_st = ScrollTrigger.create({
      trigger: document.querySelector(".small_joys_home") || document.body,
      start: "top 0%",
      end: "bottom 100%",
      scrub: 2, // Higher scrub value for smoother animation (less direct connection to scroll)
      // markers: true,
      animation: fixed_icon_group_animation,
      id: "fixed_icon_group_st" // Give it an ID for easier identification
    });
  }

  // Kill only our specific ScrollTrigger instance
  function kill_sj_fixed_icon_st() {
    console.log("Killing sj_fixed_icon_st Animation");

    // Kill our specific ScrollTrigger instance
    if (fixed_icon_group_st) {
      fixed_icon_group_st.kill();
      fixed_icon_group_st = null;
    }
    
    // Reset element to original position
    let sj_banner_1_icon_group_container_fixed_icons = document.querySelector('.sj_banner_1_icon_group_container_fixed_icons');
    if (sj_banner_1_icon_group_container_fixed_icons) {
      gsap.set(sj_banner_1_icon_group_container_fixed_icons, { clearProps: "all" });
    }
  }
  
  // Reset function that kills and then initializes again
  function reset_sj_fixed_icon_st() {
    kill_sj_fixed_icon_st();
    
    // Reinitialize after a short delay
    setTimeout(() => {
      init();
    }, 50);
  }

  // Debounce function for resize events
  function debounce(func) {
    var timer;
    return function(event) {
      if(timer) clearTimeout(timer);
      timer = setTimeout(func, 300, event);
    }
  }

  // Handle resize - only reset our specific animation
  window.addEventListener("resize", debounce(function(e) {
    console.log("end of resizing - resetting fixed icon only");
    reset_sj_fixed_icon_st();
  }));

  // Initial setup on load
  window.addEventListener("load", function(event) { 
    init(); 
  });
  
  // Export functions that might be useful for the parent module
  return {
    init: init,
    kill: kill_sj_fixed_icon_st,
    reset: reset_sj_fixed_icon_st
  };
}

export default sj_fixed_icon_st