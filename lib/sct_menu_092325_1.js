/** Rejoice Menu - https://rejouice.com/
 * From sj file.
 */

// import { gsap } from 'gsap'
// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)


const sct_menu_tl = gsap.timeline({ paused: true });

function sct_menu() {
  console.log('sct_menu.js is working')

  function init() {

    console.log('sct_menu init function is working')
    
    // Remove existing event listeners to prevent duplicates
    const openBtn = document.querySelector(".sct_navbar_menu_link_dropdown_w_toggle");
    const closeBtn = document.querySelector(".sct_menu_menu-close-btn");
    
    if (openBtn) {
      openBtn.replaceWith(openBtn.cloneNode(true));
    }
    if (closeBtn) {
      closeBtn.replaceWith(closeBtn.cloneNode(true));
    }

    // Reset timeline and clear any existing animations
    sct_menu_tl.clear();
    sct_menu_tl.pause();
    
    // Reset menu elements to initial state
    gsap.set(".sct_menu_menu-overlay", {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      clearProps: "pointerEvents"
    });
    gsap.set(".sct_menu_menu-link, .sct_menu_btn", {
      opacity: 1,
      y: 0,
      clearProps: "all"
    });
    gsap.set(".sct_menu_video-preview", {
      height: "1px"
    });

    // gsap.from("html", {duration: 0, autoAlpha:0})

    sct_menu_tl
      .to(".sct_menu_menu-overlay", {
        duration: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power2.out",
      })
      .from(
        ".sct_menu_menu-link, .sct_menu_btn",
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
      //   "sj_banner_1_icon_group_container.menu_overlay",
      //   {
      //     opacity: 0,
      //     y: 100,
      //     duration: 1
      //   },
      //   "<"
      // // )
      // .from(".sct_menu_video-preview",
      //   {
      //     height: "1px",
      //   },
      //   "<")
      .to(
        ".sct_menu_video-preview",
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
      //   ".sct_menu_menu-divider",
      //   {
      //     duration: 2,
      //     width: "100%",
      //     ease: "power4.out",
      //   },
      //   "<",
      // )
  
    function openMenu() {
      document.querySelector(".sct_menu_menu-overlay").style.pointerEvents = "all";
      sct_menu_tl.play();
    }
  
    function closeMenu() {
      document.querySelector(".sct_menu_menu-overlay").style.pointerEvents = "none";
      sct_menu_tl.reverse();
    }
  
    document.querySelector(".sct_navbar_menu_link_dropdown_w_toggle").addEventListener("click", openMenu);
    document
      .querySelector(".sct_menu_menu-close-btn")
      .addEventListener("click", closeMenu);
    
    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
      const menu = document.querySelector("#sj_sticky_nav");
      const menuOverlay = document.querySelector(".sct_menu_menu-overlay");
      
      // Check if menu is open and click is outside the menu
      if (menuOverlay && menuOverlay.style.pointerEvents === "all" && 
          menu && !menu.contains(event.target)) {
        closeMenu();
      }
    });
    
    sct_menu_tl.reverse();
  
    
    // GSDevTools.create({})

    
  }

  // Initialize immediately and also on load
  init();
  
  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('sct_menu')) {
  sct_menu();
}

export default sct_menu