import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Rejoice Menu - https://rejouice.com/ */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


const rejoice_tl = gsap.timeline({ paused: true });

function example_17() {
  console.log('ep_menu.js is working')

  function init() {

    console.log('ep_menu init function is working')

    // gsap.from("html", {duration: 0, autoAlpha:0})

    rejoice_tl
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
      // .from(
      //   "ep_banner_1_icon_group_container.menu_overlay",
      //   {
      //     opacity: 0,
      //     y: 100,
      //     duration: 1
      //   },
      //   "<"
      // // )
      // .from(".ep_menu_video-preview",
      //   {
      //     height: "1px",
      //   },
      //   "<")
      .to(
        ".ep_menu_video-preview",
        {
          duration: 1,
          height: "200px",
          ease: "power2.out",
          // opacity: 100
        },
        "<"
        // "<=+10",
      )
      // .to(
      //   ".ep_menu_menu-divider",
      //   {
      //     duration: 2,
      //     width: "100%",
      //     ease: "power4.out",
      //   },
      //   "<",
      // )
  
    function openMenu() {
      document.querySelector(".ep_menu_menu-overlay").style.pointerEvents = "all";
      rejoice_tl.play();
    }
  
    function closeMenu() {
      document.querySelector(".ep_menu_menu-overlay").style.pointerEvents = "none";
      rejoice_tl.reverse();
    }
  
    document.querySelector(".ep_menu_menu-open-btn").addEventListener("click", openMenu);
    document
      .querySelector(".ep_menu_menu-close-btn")
      .addEventListener("click", closeMenu);
    rejoice_tl.reverse();
  
    
    // GSDevTools.create({})

    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

// if (document.body.classList.contains('example_17')) {
  example_17();
// }

export default example_17
