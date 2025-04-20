/** SJ Home */

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


function small_joys_home() {
  console.log("small_joys_home.js is working");
  console.log(Flip);

  function init() {
    console.log("small_joys_home init function is working");

    // high z-index for gsdevtools
    const devTools = document.querySelector(".gs-dev-tools");
    if (devTools) devTools.style.zIndex = "100";

    // Play the initial grid animation immediately
    let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0});
    tl_ap_grid.play();
    // let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0}, 'tl_ap_grid');

    let sj_banner_1_header_text_line_1 = document.querySelector(".sj_banner_1_header_text.line_1");
    console.log("sj_banner_1_header_text_line_1:", sj_banner_1_header_text_line_1);

    // gsap.from(sj_banner_1_header_text_line_1, {
    //   yPercent: 110, 
    //   ease: "power2.out",
    //   duration: 4,
    // })



    let sj_banner_1_icon_group_container = document.querySelector(".sj_banner_1_icon_group_container");
    let ap_grid_1_sj_process_section_1 = document.querySelector(".ap_grid_1.sj_process_section_1");
    console.log("sj_banner_1_icon_group_container:", sj_banner_1_icon_group_container);
    console.log("ap_grid_1_sj_process_section_1:", ap_grid_1_sj_process_section_1);

    let sj_banner_1_subheader_container = document.querySelector(".sj_banner_1_subheader_container")
    let ap_grid_container_sj_process_section_1 = document.querySelector(".ap_grid_container.sj_process_section_1");
    // console.log("ap_grid_container_sj_process_section_1:", ap_grid_container_sj_process_section_1);
    let sj_banner_1_icon_group_icon = document.querySelector(".sj_banner_1_icon_group_icon")
    let sj_banner_1_header_text_container = document.querySelector(".sj_banner_1_header_text_container")



    document.querySelectorAll(".sj_banner_1_icon_group_container").forEach((el, index) => {
      console.log(`Instance ${index}:`, el);
    });

    // Select the element to move
    let sj_banner_1_icon_group_icon_1 = document.querySelector("#w-node-_0b70cb18-2388-89ef-fff0-75b7f977beda-c738a86b")
    console.log("sj_banner_1_icon_group_icon_1:", sj_banner_1_icon_group_icon_1);
    
    // Select the target container
    // const targetContainer_ap_grid_1_sj_process_section_1 = ap_grid_1_sj_process_section_1;
    const targetContainer_sj_banner_1_subheader_container = sj_banner_1_subheader_container;
    // const targetContainer_ap_grid_container_sj_process_section_1 = ap_grid_container_sj_process_section_1;

    // Save the original state before the move
    // const state = Flip.getState(iconGroup);

    // grab state
    // const state_sj_banner_1_icon_group_container = Flip.getState(sj_banner_1_icon_group_container);
    // const state_sj_banner_1_icon_group_icon = Flip.getState(sj_banner_1_icon_group_icon);
    // const state_sj_banner_1_header_text_line_1 = Flip.getState(sj_banner_1_header_text_line_1);

    // Actually move the element in the DOM
    // targetContainer_ap_grid_1_sj_process_section_1.appendChild(sj_banner_1_icon_group_container);
    // targetContainer_sj_banner_1_subheader_container.appendChild(sj_banner_1_icon_group_container);
    // targetContainer_ap_grid_container_sj_process_section_1.appendChild(sj_banner_1_icon_group_container);

    // Apply the new CSS (grid-area)
    // sj_banner_1_icon_group_container.style.gridArea = "2 / 4 / 3 / 12";




    // 1. First get the initial state BEFORE any DOM changes
    // const state = Flip.getState(sj_banner_1_header_text_line_1);
    const state = Flip.getState(sj_banner_1_icon_group_icon_1);

    // 2. Then make your DOM changes
    // targetContainer_sj_banner_1_subheader_container.appendChild(sj_banner_1_header_text_line_1);
    targetContainer_sj_banner_1_subheader_container.appendChild(sj_banner_1_icon_group_icon_1);

    // 3. Finally, animate from the initial state to the new state
    Flip.from(state, {
      duration: 5,
      ease: "power1.inOut",
      absolute: true
    });

    // const element = document.querySelector('#w-node-_0b70cb18-2388-89ef-fff0-75b7f977beda-c738a86b');
    // if (element) {
    //   element.style.transition = 'none';
    // }
    // const data = { success: !!element };

    sj_banner_1_icon_group_container.style.transition = 'none'

    // 1. First get the initial state BEFORE any DOM changes
    // const state_sj_banner_1_header_text_line_1 = Flip.getState(sj_banner_1_header_text_line_1);
    // const state = Flip.getState(sj_banner_1_icon_group_container);
    // const state = Flip.getState(sj_banner_1_icon_group_icon);

    // 2. Then make your DOM changes
    // targetContainer_sj_banner_1_subheader_container.appendChild(sj_banner_1_header_text_line_1);
    // targetContainer_sj_banner_1_subheader_container.appendChild(sj_banner_1_icon_group_container);

    // 3. Finally, animate from the initial state to the new state
    // Flip.from(state, {
    //   duration: 5,
    //   ease: "power1.inOut",
    //   absolute: true
    // });



    // // 1. Disable any existing CSS transitions that might interfere
    // const originalTransition = sj_banner_1_icon_group_container.style.transition;
    // sj_banner_1_icon_group_container.style.transition = "none";
    // targetContainer_sj_banner_1_subheader_container.style.transition = "none";

    // // 2. Force a DOM reflow to ensure the transition property is applied
    // void sj_banner_1_icon_group_container.offsetWidth;

    // // 3. Get the state of the element
    // const state = Flip.getState(sj_banner_1_icon_group_container);

    // // 4. Hide the original element immediately after getting its state
    // const originalParent = sj_banner_1_icon_group_container.parentNode;
    // const placeholder = document.createElement('div');
    // placeholder.style.gridArea = getComputedStyle(sj_banner_1_icon_group_container).gridArea;
    // placeholder.style.visibility = "hidden";

    // // 5. Replace the element with an invisible placeholder in the original spot
    // originalParent.replaceChild(placeholder, sj_banner_1_icon_group_container);

    // // 6. Move the element to its new location
    // targetContainer_sj_banner_1_subheader_container.appendChild(sj_banner_1_icon_group_container);

    // // 7. Animate with Flip
    // Flip.from(state, {
    //   duration: 2,
    //   ease: "power1.inOut",
    //   absolute: true,
    //   onComplete: () => {
    //     // 8. Restore the original transition property and remove the placeholder
    //     sj_banner_1_icon_group_container.style.transition = originalTransition;
    //     targetContainer_sj_banner_1_subheader_container.style.transition = "";
    //     placeholder.remove();
    //   }
    // });

    // Animate the transition
    // Delay applying the layout tweak until after Flip measures everything
    // Flip.from(state_sj_banner_1_icon_group_container, {
    //   duration: 5,
    //   ease: "power1.inOut",
    //   absolute: true,
      // scale: true,
      // onComplete: () => {
      //   sj_banner_1_icon_group_container.style.gridArea = "2 / 4 / 3 / 12";
      // }
    // });
    
  }



  // Initialize everything once the page has fully loaded
  window.addEventListener("load", function (event) {
    init();
  });
}



// Only run the marquee code if we're on the correct page
// This prevents the code from running unnecessarily on other pages
if (document.body.classList.contains("small_joys_home")) {
  small_joys_home();
}

export default small_joys_home;