import '../src/styles/style.css'
import { gsap } from 'gsap'
import example_17 from './example_17'


// import { SplitText } from 'gsap/SplitText'

/** Gsap Pinning 2 */

// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger)
console.log(ScrollTrigger)

function example_15() {
  console.log('example_15.js is working')

  function init() {
    console.log('example_15 init function is working')
    gsap.from('html', { duration: 0, autoAlpha: 0 }, 'gsap_pinning_tl')

    // Get all cards and containers in reverse order
    const sc_cards = gsap.utils.toArray(".sc_card").reverse();
    const sc_card_containers = gsap.utils.toArray(".sc_card_container");

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
                translateY: "50%",
                translateX: "10%",
                transformOrigin: "50% 100% 0",
            },
            {
                rotationX: 0,
                rotationY: 0,
                translateY: "0%",
                translateX: "0%",
                transformOrigin: "50% 100% 0",
                duration: 1
            }
        )
      
        // Add a "pause" by repeating the same values
        .to(cards_index, {
            rotationX: 0,
            rotationY: 0,
            translateY: "0%",
            translateX: "0%",
            transformOrigin: "50% 100% 0",
            duration: 2 // This makes it stay longer in the center
        })
        .to(cards_index, {
            rotationX: -90,
            rotationY: 40,
            translateY: "50%",
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
            scrub: true,
        });
    });
  }

  window.addEventListener('load', function (event) {
    init()
  })
}

if (document.body.classList.contains('example_15')) {
  example_15()
}

export default example_15
