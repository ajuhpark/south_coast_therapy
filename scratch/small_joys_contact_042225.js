/** SJ Contact */
import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 
import sj_menu from './sj_menu.js'
sj_menu()

import colorModeToggle from './color_mode_toggle.js'

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

    // variables for icon group animation on contact page.
    // let sj_banner_1_icon_group_icon_contact_page = document.querySelector(".sj_banner_1_icon_group_icon.contact_page");
    let contact_page_form_container = document.querySelector("#contact_page_form_container");
    
    // then doing a loop on the elements and logging them out.
    contact_page_form_container.forEach( (element) => {
	
    // for the current banner we're looping through, we're going to find the h1 that's in there. We're also gonna find h2s
    let sj_banner_1_icon_group_icon_contact_page = element.querySelectorAll(".sj_banner_1_icon_group_icon.contact_page")
    console.log(sj_banner_1_icon_group_icon_contact_page)


    // animation for icon group on contact page
    let tl_icon_group_contact_page = gsap.timeline()
    .from(sj_banner_1_icon_group_icon_contact_page, {
      // i need an animation that positions it to the bottom its parent container.
    })


    ScrollTrigger.create({
      trigger:contact_page_form_container,
      start:"top 20%",
      end:"bottom 100%",
      markers: true,
      animation:tl_icon_group_contact_page,
      scrub: 1,
      // i also want each element to stagger.
    })


    })


    // Debounce function to prevent excessive function calls during resize
    // This improves performance by waiting until resizing stops before recalculating
    // function ms_debounce(func) {
    //   var timer
    //   return function (event) {
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(
    //       () => {
    //         func()
    //       },
    //       500, // Wait 500ms after last resize event before executing
    //       event
    //     )
    //   }
    // }
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