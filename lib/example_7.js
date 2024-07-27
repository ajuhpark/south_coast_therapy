import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Rejoice Menu - https://rejouice.com/ */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


const rejoice_tl = gsap.timeline({ paused: true });

function example_7() {
  console.log('example_7.js is working')

  function init() {

    console.log('example_7 init function is working')

    gsap.from("html", {duration: 0, autoAlpha:0})

    rejoice_tl
      .to(".rejoice_menu-overlay", {
        duration: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power2.out",
      })
      .from(
        ".rejoice_menu-link, .rejoice_btn",
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
        ".rejoice_video-preview",
        {
          duration: 1,
          height: "200px",
          ease: "power2.out",
        },
        "<",
      ).to(
        ".rejoice_menu-divider",
        {
          duration: 2,
          width: "100%",
          ease: "power4.out",
        },
        "<",
      )
  
    function openMenu() {
      document.querySelector(".rejoice_menu-overlay").style.pointerEvents = "all";
      rejoice_tl.play();
    }
  
    function closeMenu() {
      document.querySelector(".rejoice_menu-overlay").style.pointerEvents = "none";
      rejoice_tl.reverse();
    }
  
    document.querySelector(".rejoice_menu-open-btn").addEventListener("click", openMenu);
    document
      .querySelector(".rejoice_menu-close-btn")
      .addEventListener("click", closeMenu);
    rejoice_tl.reverse();
  
    
    // GSDevTools.create({})

    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('example_7')) {
  example_7();
}

export default example_7
