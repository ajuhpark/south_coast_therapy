/** SJ Modules */

import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 

import colorModeToggle from './color_mode_toggle.js'

// Register ALL plugins
// gsap.registerPlugin(ScrollTrigger, GSDevTools); 
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(SplitText)
console.log(SplitText)

function example_16() {
  console.log('example_16.js is working')
  
  // Declare these variables at the function level so they're accessible to all inner functions
  let splitTextInstances = [];
    
  function init() {
    console.log('example_16 init function is working')
    gsap.from('html', { duration: 0, autoAlpha: 0 }, 'gsap_pinning_tl')

    // Clear previous instances when re-initializing
    splitTextInstances = [];

    // this gets the page to scroll to the top after refresh.
    $(window).on('beforeunload', function() {
        $('body').hide();
        $(window).scrollTop(0);
    })

    // we're splitting into lines and adding a lines class of 'line'. can see in inspect.
          
    // Get all cards and containers in reverse order
    const sc_cards = gsap.utils.toArray(".sc_1_card").reverse();
    const sc_card_containers = gsap.utils.toArray(".sc_1_card_container");


    // Hide all cards initially except the first one
    gsap.set(sc_cards.slice(1), { autoAlpha: 0 });

    sc_cards.forEach((card, index) => {
        let cards_index = sc_cards[index];
        let card_containers_index = sc_card_containers[index];
        
        let sc_1_card_text_header = card_containers_index.querySelector(".sc_1_card_text_header")
        let sc_1_card_text_subheader = card_containers_index.querySelector(".sc_1_card_text_subheader")

        // After creating your SplitText instances
        let sc_1_card_text_header_split = new SplitText(sc_1_card_text_header, {type: "lines", linesClass: "line"});
        let sc_1_card_text_subheader_split = new SplitText(sc_1_card_text_subheader, {type: "lines", linesClass: "line"});
        
        // Store the instances in our array for later cleanup
        splitTextInstances.push(sc_1_card_text_header_split, sc_1_card_text_subheader_split);

        // Get the lines
        let headerLines = sc_1_card_text_header_split.lines;
        let subheaderLines = sc_1_card_text_subheader_split.lines;

        // Wrap each line in a container div with overflow hidden
        headerLines.forEach(line => {
            // Create a wrapper div
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden'; // Set overflow hidden
            
            // Insert the wrapper before the line in the DOM
            line.parentNode.insertBefore(wrapper, line);
            
            // Move the line into the wrapper
            wrapper.appendChild(line);
        });

        // Do the same for subheader lines
        subheaderLines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });


        // Debug logging
        console.log("Card:", cards_index);
        console.log("Header element:", sc_1_card_text_header);
        console.log("Subheader element:", sc_1_card_text_subheader);

        // Create the animation timeline
        let tl_cards = gsap.timeline({
            defaults: {
                ease: "none"
            }
        });
        
        // Only add the fade in for cards after the first one
        if (index > 0) {
            tl_cards.fromTo(cards_index, 
                { autoAlpha: 0 }, 
                { autoAlpha: 1, duration: 0.1 }
            );
        }
        
        // Add the rotation animation with extended center position
        
        // Clear sequence with position parameters
        tl_cards
        // Initial card position
        .fromTo(cards_index, 
            {
                rotationX: -90,
                rotationY: 40,
                translateX: "40%",
                transformOrigin: "50% 100% 0",
                autoAlpha: index > 0 ? 0 : 1
            },
            {
                rotationX: 0,
                rotationY: 0,
                translateX: "0%",
                transformOrigin: "50% 100% 0",
                autoAlpha: 1,
                duration: 3
            }, 0
        )

        // Text animations - header lines
        .from(headerLines, {
            translateY:"100%",
            duration: 2,
            stagger: 0.4
        }, 0.5) // Start slightly after card begins moving

        // Text animations - subheader lines
        .from(subheaderLines, {
            translateY:"100%",
            duration: 2,
            stagger: 0.4  
        }, 1.5) // Start after headers begin

        // Hold in central position
        .to(cards_index, {
            rotationX: 0,
            rotationY: 0,
            translateX: "0%",
            transformOrigin: "50% 100% 0",
            duration: 5 
        }, 3) // Start after initial animation completes

        // Exit animations for text
        .to(headerLines, {
            translateY:"100%",
            duration: 2,
            stagger: 0.4  
        }, 7) // Start as hold completes

        .to(subheaderLines, {
            translateY:"100%",
            duration: 2,
            stagger: 0.4  
        }, 8) // Start after headers begin exiting

        // Flip back animation
        .to(cards_index, {
            rotationX: -90,
            rotationY: 40,
            translateX: "-10%",
            transformOrigin: "50% -100% 0",
            duration: 3
        }, 8) // Start alongside subheader exit

        // Fade out
        .to(cards_index, { 
            autoAlpha: 0, 
            duration: 0.5 
        }, 10.5); // Start near end of flip animation


        // Create ScrollTrigger with expanded scroll range
        ScrollTrigger.create({
            trigger: card_containers_index,
            start: "top 0%",
            end: "100% 100%", // Increase this value to make the animation take longer
            animation: tl_cards,
            markers: true,
            ease: "power1.in", 
            scrub: 1,
        });
    });
  }



// we're trying to make it responsive.
// this killAll function we created will handle reverting of splitText objects. 
  // Updated killAll function that uses the splitTextInstances array
  function killAll(){
    // Revert all SplitText instances
    splitTextInstances.forEach(instance => {
      instance.revert();
    });
    
    // Kill all ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    
    // Reinitialize
    init();
  }
  
  
  // this bit of code from stackoverflow is going to help us when resizing
  function debounce(func){
    var timer;
    return function(event){
      if(timer) clearTimeout(timer)
      timer = setTimeout(func,300,event)
    }
  }
  
  window.addEventListener("resize", debounce(function(e){
    console.log("end of resizing")
    // we're going to run our code here once it debounces and resizes.
    killAll()
  }))
  

  window.addEventListener('load', function (event) {
    init()
  })
}



// Only run the marquee code if we're on the correct page
// This prevents the code from running unnecessarily on other pages
if (document.body.classList.contains("example_16")) {
  example_16();
}

export default example_16;