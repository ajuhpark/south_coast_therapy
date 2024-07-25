import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Rejoice Menu */

// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


const constance_tl = gsap.timeline();

function example_7() {
  console.log('example_7.js is working')

  function init() {

    console.log('example_7 init function is working')

    let tl = gsap.timeline({ paused: true });
  
    tl.to(".menu-overlay", {
      duration: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "power2.out",
    });
  
    tl.from(
      ".menu-link, .btn",
      {
        opacity: 0,
        y: 60,
        stagger: 0.05,
        duration: 0.75,
        ease: "power1.inOut",
      },
      "<",
    );
  
    tl.to(
      ".video-preview",
      {
        duration: 1,
        height: "200px",
        ease: "power2.out",
      },
      "<",
    );
  
    tl.to(
      ".menu-divider",
      {
        duration: 2,
        width: "100%",
        ease: "power4.out",
      },
      "<",
    );
  
    function openMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "all";
      tl.play();
    }
  
    function closeMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "none";
      tl.reverse();
    }
  
    document.querySelector(".menu-open-btn").addEventListener("click", openMenu);
    document
      .querySelector(".menu-close-btn")
      .addEventListener("click", closeMenu);
    tl.reverse();
  
    
    GSDevTools.create({})

    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('example_7')) {
  example_7();
}

export default example_7
