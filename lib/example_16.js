/** SJ Modules */

import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 

import colorModeToggle from './color_mode_toggle.js'

// Register ALL plugins
// gsap.registerPlugin(ScrollTrigger, GSDevTools); 
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools)

function example_16() {
  console.log('example_16.js is working')

  function init() {
    console.log('example_16 init function is working')
    gsap.from('html', { duration: 0, autoAlpha: 0 }, 'gsap_pinning_tl')

    // Get all cards and containers in reverse order
    const sc_cards = gsap.utils.toArray(".sc_1_card").reverse();
    const sc_card_containers = gsap.utils.toArray(".sc_1_card_container");

    // Hide all cards initially except the first one
    gsap.set(sc_cards.slice(1), { autoAlpha: 0 });

    sc_cards.forEach((card, index) => {
        let cards_index = sc_cards[index];
        let card_containers_index = sc_card_containers[index];
        
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
        tl_cards.fromTo(cards_index, 
            {
                rotationX: 90,
                rotationY: -40,
                // translateY: "50%",
                translateX: "10%",
                transformOrigin: "50% 100% 0",
            },
            {
                rotationX: 0,
                rotationY: 0,
                // translateY: "0%",
                translateX: "0%",
                transformOrigin: "50% 100% 0",
                duration: 1
            }
        )
      
        // Add a "pause" by repeating the same values
        .to(cards_index, {
            rotationX: 0,
            rotationY: 0,
            // translateY: "0%",
            translateX: "0%",
            transformOrigin: "50% 100% 0",
            duration: 2 // This makes it stay longer in the center
        })
        .to(cards_index, {
            rotationX: -90,
            rotationY: 40,
            // translateY: "50%",
            translateX: "-10%",
            transformOrigin: "50% -100% 0",
            duration: 1
        })
        .to(cards_index, 
            { autoAlpha: 0, duration: 0.1 },
            "-=0.1"
        );

        // Create ScrollTrigger with expanded scroll range
        ScrollTrigger.create({
            trigger: card_containers_index,
            start: "top 60%",
            end: "bottom 60%", // Increase this value to make the animation take longer
            animation: tl_cards,
            markers: true,
            ease: "power1.in", 
            scrub: 2,
        });
    });
  }

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