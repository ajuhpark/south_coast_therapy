import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** 
 * ep_menu. Example Projects
 * Rejoice Menu - https://rejouice.com/ 
 * */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


const ep_menu_tl = gsap.timeline({ paused: true });

function example_17() {
  console.log('example_17.js is working')

  function init() {

    console.log('example_17 init function is working')

    // gsap.from("html", {duration: 0, autoAlpha:0})

    ep_menu_tl
      .to(".ep_menu_menu-overlay", {
        duration: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power2.out",
      })
      .from(
        ".ep_menu_menu-link, .ep_menu_btn",
        {
          opacity: 0,
          y: 60,
          stagger: 0.05,
          duration: 0.75,
          ease: "power1.inOut",
        },
        "<",
      )
      .to(
        ".ep_menu_video-preview",
        {
          duration: 1,
          height: "200px",
          ease: "power2.out",
        },
        "<",
      ).to(
        ".ep_menu_menu-divider",
        {
          duration: 2,
          width: "100%",
          ease: "power4.out",
        },
        "<",
      )
  
    function openMenu() {
      document.querySelector(".ep_menu_menu-overlay").style.pointerEvents = "all";
      ep_menu_tl.play();
    }
  
    function closeMenu() {
      document.querySelector(".ep_menu_menu-overlay").style.pointerEvents = "none";
      ep_menu_tl.reverse();
    }
  
    document.querySelector(".ep_menu_menu-open-btn").addEventListener("click", openMenu);
    document
      .querySelector(".ep_menu_menu-close-btn")
      .addEventListener("click", closeMenu);
    ep_menu_tl.reverse();
  
    
    // GSDevTools.create({})

    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('example_17')) {
  example_17();
}

export default example_17
