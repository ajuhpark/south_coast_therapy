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


        // Create two separate timelines
        // Timeline for the card animations
        let tl_cards = gsap.timeline({
            defaults: {
                ease: "none"
            }
        });

        // Timeline for text animations
        let tl_text = gsap.timeline({
            defaults: {
                ease: "none"
            }
        });

        // Card animations timeline
        tl_cards
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
                duration: 2,
                ease: "power1.out" // Adding an ease to smooth the animation
            }, 0
        )
        
        // Hold position (no animation during this period)
        .to({}, { duration: 7 }, 2) // Empty tween just to create a pause
        
        // Flip back animation
        .to(cards_index, {
            rotationX: -90,
            rotationY: 40,
            translateX: "-10%",
            transformOrigin: "50% -100% 0",
            duration: 2,
            ease: "power1.in" // Smoother exit ease
        }, 10)
        
        // Fade out
        .to(cards_index, { 
            autoAlpha: 0, 
            duration: 1.5,
            ease: "power1.in" // Smoother fade
        }, 10.3);

        // Text animations timeline
        tl_text
        // Text animations with smoother transition
        .fromTo(headerLines, 
            { translateY: "100%" },
            { 
                translateY: "0%", 
                duration: 1.5,  
                stagger: 0.2,
                ease: "power2.out" // Smoother ease
            }, 
        0.3)
        
        .fromTo(subheaderLines, 
            { translateY: "100%" },
            { 
                translateY: "0%", 
                duration: 1.5,  
                stagger: 0.2,
                ease: "power2.out" // Smoother ease
            }, 
        1)
        
        // Hold position (no animation during this period)
        .to({}, { duration: 7 }, 2) // Empty tween just to create a pause
        
        // Exit animations start much later - explicit from/to values
        .to(headerLines, {
            translateY: "100%",
            duration: 1.5,
            stagger: 0.2,
            ease: "power2.in" // Smoother exit ease
        }, 9)
        
        .to(subheaderLines, {
            translateY: "100%",
            duration: 1.5,
            stagger: 0.2,
            ease: "power2.in" // Smoother exit ease
        }, 9.5);

        // Create ScrollTrigger for card animations with scrub: 2
        ScrollTrigger.create({
            trigger: card_containers_index,
            start: "top 0%",
            end: "bottom 100%", 
            animation: tl_cards,
            // markers: true,
            ease: "power1.inOut", 
            scrub: 1.5, // Card animation scrub value of 2
            id: "card-trigger" 
        });
        
        // Create ScrollTrigger for text animations with scrub: 1
        ScrollTrigger.create({
            trigger: card_containers_index,
            start: "top 0%",
            end: "100% 100%",
            animation: tl_text,
            // markers: true,
            ease: "power1.inOut", 
            // ease: "none", 
            scrub: true, // Text animation scrub value of 1
            id: "text-trigger" 
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