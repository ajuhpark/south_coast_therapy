/** SJ Contact */
import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 
import sj_menu from './sj_menu.js'
sj_menu()

import colorModeToggle from './color_mode_toggle.js'
import sj_navbar_blur from './sj_navbar_blur.js';

// Register ALL plugins
// gsap.registerPlugin(ScrollTrigger, GSDevTools); 
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(Flip)

function small_joys_contact() {
  console.log('small_joys_contact.js is working')

  function init() {
    console.log('small_joys_contact init function is working')

    // this gets the page to scroll to the top after refresh.
    $(window).on('beforeunload', function() {
      $('body').hide();
      $(window).scrollTop(0);
    });

    let sj_contact_tl = gsap.from("html", { duration: 0, autoAlpha: 0});
    sj_contact_tl.play();

    // Properly select the container and icons
    let contact_page_icon_group_trigger = document.querySelector("#contact_page_icon_group_trigger");
    let sj_banner_1_icon_group_icons_contact_page = document.querySelectorAll(".sj_banner_1_icon_group_icon.contact_page");
    console.log(sj_banner_1_icon_group_icons_contact_page);

    // Animation for icon group on contact page
    let tl_icon_group_contact_page = gsap.timeline();

    // Add staggered animation for icons moving from top to bottom
    tl_icon_group_contact_page.from(sj_banner_1_icon_group_icons_contact_page, {
      top: "0%",
      ease: "none", // Changed to power2.out for smoother acceleration/deceleration
      stagger: {
        amount: 0.3, // Increased stagger time for slower effect
        from: "start"
      }
    }).to(sj_banner_1_icon_group_icons_contact_page, {
      top: "100%",
      ease: "none", // Matching ease for consistency
      stagger: {
        amount: 0.3, // Matching stagger time
        from: "start"
      }
    });

    ScrollTrigger.create({
      trigger: contact_page_icon_group_trigger,
      // Adjusted these values to create a longer scroll range
      start: "top top", 
      end: "75% 60%", 
      // markers: true,
      animation: tl_icon_group_contact_page,
      scrub: 2.5, // Increased scrub value for smoother animation (adds lag to follow scroll)
    });


  }

  // Initialize everything once the page has fully loaded
  window.addEventListener('load', function (event) {
    init()
  })
}

// Only run the code if we're on the correct page
if (document.body.classList.contains("small_joys_contact")) {
  small_joys_contact();
}

export default small_joys_contact;