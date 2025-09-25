/** 
 * SCT Menu
 * Rejoice Menu - https://rejouice.com/
 * From sj file.
 */

// import { gsap } from 'gsap'
// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)


const rejoice_tl = gsap.timeline({ paused: true });

function sct_menu() {
  console.log('sj_menu.js is working')

  function init() {

    console.log('sj_menu init function is workinggggg')
    
    // Mobile Menu - Dropdown
    // Remove existing event listeners to prevent duplicates
    const openBtn = document.querySelector(".sj_menu_menu-open-btn_2");
    const closeBtn = document.querySelector(".sj_menu_menu-close-btn_2");

    const sct_mobile_menu_dropdown_row_container = document.querySelectorAll(".sct_mobile_menu_dropdown_row_container")
    const menuElements = Array.from(document.querySelectorAll(".sct_mobile_menu_dropdown_row_container, .sj_menu_menu-link_container"))


    if (openBtn) {
      openBtn.replaceWith(openBtn.cloneNode(true));
    }
    if (closeBtn) {
      closeBtn.replaceWith(closeBtn.cloneNode(true));
    }

    // Reset timeline and clear any existing animations
    rejoice_tl.clear();
    rejoice_tl.pause();
    
    // Reset menu elements to initial state
    gsap.set(".sj_menu_menu-overlay", {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      clearProps: "pointerEvents"
    });
    // gsap.set(".sj_menu_menu-link, .sj_menu_btn", {
    // gsap.set([sct_mobile_menu_dropdown_row_container, ".sj_menu_menu-link, .sj_menu_btn"], {
    gsap.set(menuElements, {
      opacity: 1,
      y: 0,
      clearProps: "all"
    });
    gsap.set(".sj_menu_video-preview", {
      height: "1px"
    });

    // gsap.from("html", {duration: 0, autoAlpha:0})

    rejoice_tl
      .set(".sct_mobile_menu_dropdown_list", {
        y:0
      })
      .to(".sj_menu_menu-overlay", {
        duration: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power2.out",
      })
      // .from([sct_mobile_menu_dropdown_row_container, ".sj_menu_menu-link, .sj_menu_btn"], {
      .from(menuElements, {
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
      // .from(".sj_menu_video-preview",
      //   {
      //     height: "1px",
      //   },
      //   "<")
      .to(
        ".sj_menu_video-preview",
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
      //   ".sj_menu_menu-divider",
      //   {
      //     duration: 2,
      //     width: "100%",
      //     ease: "power4.out",
      //   },
      //   "<",
      // )
  
    function openMenu() {
      document.querySelector(".sj_menu_menu-overlay").style.pointerEvents = "all";
      rejoice_tl.play();
    }
  
    function closeMenu() {
      // Check for sct_mobile_menu_dropdown_list elements with height not zero
      const dropdownLists = document.querySelectorAll('.sct_mobile_menu_dropdown_list');

      dropdownLists.forEach((dropdownList, index) => {
        const computedStyle = window.getComputedStyle(dropdownList);

        if (computedStyle.height !== '0px') {
          // Find sibling sct_mobile_menu_dropdown_row element within the same container
          const container = dropdownList.parentElement;
          const dropdownRow = container?.querySelector('.sct_mobile_menu_dropdown_row');

          if (dropdownRow) {
            dropdownRow.click();
            gsap.to(dropdownList, {
            y: 35,
            stagger: .55,
            duration: 1.1,
            ease: "power3.in",
            }
          )
          }
        }
      });

      document.querySelector(".sj_menu_menu-overlay").style.pointerEvents = "none";
      rejoice_tl.reverse();
    }
  
    document.querySelector(".sj_menu_menu-open-btn_2").addEventListener("click", openMenu);
    document
      .querySelector(".sj_menu_menu-close-btn_2")
      .addEventListener("click", closeMenu);
    
    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
      const menu = document.querySelector("#sj_sticky_nav");
      const menuOverlay = document.querySelector(".sj_menu_menu-overlay");
      
      // Check if menu is open and click is outside the menu
      if (menuOverlay && menuOverlay.style.pointerEvents === "all" && 
          menu && !menu.contains(event.target)) {
        closeMenu();
      }
    });
       
    rejoice_tl.reverse();
  
    
    // GSDevTools.create({})

    // Desktop Menu - Dropdown
    // dropdown link variables - select ALL dropdown elements
    const sct_banner_1_header_text_wrapper__dropdowns = document.querySelectorAll(".sct_banner_1_header_text_wrapper.dropdown");

    // console.log('Found dropdown elements:', sct_banner_1_header_text_wrapper__dropdowns.length);

    // Handle each dropdown individually
    sct_banner_1_header_text_wrapper__dropdowns.forEach((dropdown, index) => {
      // console.log('Setting up dropdown', index);

      const dropdownList = dropdown.querySelector(".sct_banner_1_dropdown_list");
      const dropdownRows = dropdown.querySelectorAll(".sct_banner_1_dropdown_list_row");
      const dropdownBorders = dropdown.querySelectorAll(".sct_banner_1_dropdown_list_border_div");

      // console.log('Dropdown', index, '- List:', dropdownList, 'Rows:', dropdownRows.length, 'Borders:', dropdownBorders.length);

      if (dropdownList) {
        // Set initial state for this specific dropdown
        gsap.set(dropdownList, {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
        });
        gsap.set(dropdownRows, {
          y: 20,
          opacity: 0
        });

        // Create individual timeline for each dropdown
        const dropdownTimeline = gsap.timeline({ paused: true });

        dropdown.addEventListener("mouseenter", function() {
          // console.log('Mouse enter on dropdown', index);
          dropdownTimeline.clear();

          // Set z-index to 3 on hover
          gsap.set(dropdownList, {
            zIndex: 3
          });

          gsap.set(dropdownList, {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
          });
          gsap.set(dropdownBorders, {
            height: "0%"
          });
          gsap.set(dropdownRows, {
            y: 20,
            opacity: 0
          });

          dropdownTimeline
            .to(dropdownList, {
              duration: .6,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              ease: "power2.out",
            })
            .to(dropdownBorders, {
              duration: .6,
              height: '100%',
              ease: "power2.out",
            }, "<")
            .fromTo(dropdownRows, {
              y: 20,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.45,
              ease: "power1.inOut",
            }, "<");

          dropdownTimeline.play();
        });

        dropdown.addEventListener("mouseleave", function() {
          // console.log('Mouse leave on dropdown', index);
          dropdownTimeline.reverse();

          // Set z-index back to 2 on hover out
          gsap.set(dropdownList, {
            zIndex: 2
          });
        });
      }
    });

    
  }

  // Initialize immediately and also on load
  init();
  
  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('sj_menu')) {
  sj_menu();
}

export default sct_menu