import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Pagination Exercise 
 * this one has the description of what's going on.
*/

gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger)


function example_19() {
  console.log('example_19.js is working')

  function init() {
    console.log('example_19 init is working')

    gsap.set('html', { autoAlpha: 1 });

    // let tl_cards = gsap.timeline();

    //     let tr_sticky_track_content_text_container = document.querySelector(".tr_sticky_track_content_text_container")
        
    //     // Timeline for text animations
    //     let tl_text = gsap.timeline()

        

    //     tl_text
    //     // Starting visibility state
    //     .set(text, 
    //       {
    //         display: "flex",
    //         autoAlpha: 0
    //     }, 0)
        
      // Get all the content divs and the trigger element
      const tr_sticky_track_content_1 = document.querySelectorAll('.tr_sticky_track_content_1');
      const tr_sticky_trigger = document.querySelector('.tr_sticky_trigger');
      const tr_sticky_element = document.querySelector('.tr_sticky_element')
      const tr_sticky_wrap = document.querySelector('.tr_sticky_wrap')

      const tl_tr_sticky_image = gsap.timeline()
      tl_tr_sticky_image
        .from(tr_sticky_element, {
          // scaleX: 0.5,
          // scaleY: 0.5,
          scale:0.25
        })

      ScrollTrigger.create({
        trigger:tr_sticky_wrap,
        start:"top top",
        end:"bottom bottom",
        markers: true,
        // on enter, on leave, on enter back, on leave back
        // toggleActions:"play none none reverse",
        scrub:1,
        animation:tl_tr_sticky_image,
      })


      // Register slideUp effect
      gsap.registerEffect({
        name:"slideUp", 
        extendTimeline:true,
        defaults:{
          y:"110%",
          x:0
        },
        effect: (targets, config) => {
          let tl = gsap.timeline();
          tl.from(targets, {
            duration:1,
            x:config.x,
            y:config.y,
            stagger:{
              each:0.03,
              ease:"power1.in"
            }
          });
          return tl;
        }
      });

      // Register slideDown effect
      gsap.registerEffect({
        name:"slideDown", 
        extendTimeline:true,
        defaults:{
          y:"-110%",
          x:0
        },
        effect: (targets, config) => {
          let tl = gsap.timeline();
          tl.to(targets, {
            duration:1,
            x:config.x,
            y:config.y,
            stagger:{
              each:0.03,
              ease:"power1.in"
            }, 
            opacity:1
          });
          return tl;
        }
      });


      // Banner text timeline
      // let banner_text_tl = gsap.timeline();
      // banner_text_tl
      //   .slideUp(split_ux_home_banner_v2_header_text_container.chars)
      //   .slideUp(split_sj_banner_1_header_link.chars, {}, "<")
      //   .slideUp(split_sj_banner_4_header_text.chars, {}, "-=0.2")
      //   .slideUp(split_sj_banner_4_subheader_text.chars, {}, "<")
      //   .slideUp(split_ux_home_v2_card_number_text.chars, {}, "<");


      // Make sure elements exist before proceeding
      if (!tr_sticky_trigger || tr_sticky_track_content_1.length === 0) {
        console.log('Trigger or content divs not found');
        return;
      }
      
      console.log(`Found ${tr_sticky_track_content_1.length} content divs`);
      
      // Set initial state - all content divs and text to opacity 0
      gsap.set(tr_sticky_track_content_1, { opacity: 0 });
      gsap.set('.tr_sticky_track_content_text_title', { opacity: 0 });
      
      // Create a timeline for the sequential animation
      const tl_content_text = gsap.timeline({
        scrollTrigger: {
          trigger: tr_sticky_trigger,
          start: "top top",
          end: "bottom top",
          scrub: 1, // smooth scrubbing
          markers: true, // remove this in production
          onUpdate: self => {
            console.log("Progress:", self.progress);
          }
        }
      });

      // Animation sequence for each content section
      // Section 1: Youth Programs (0% - 28%)
      // Section 2: Skills Academy (33% - 60%) 
      // Section 3: Summer Camp (66% - end)
      
      tr_sticky_track_content_1.forEach((contentDiv, index) => {
        const textElement = contentDiv.querySelector('.tr_sticky_track_content_text_title');
        
        if (index === 0) {
          // First section (Youth Programs): appears at 0%, text disappears at 28%, div disappears at 28%
          tl_content_text
            .to(contentDiv, { opacity: 1, duration: 0.05 }, 0) // div appears immediately
            .slideUp(textElement, { opacity: 1, duration: 0.05 }, 0) // text appears immediately
            .slideDown(textElement, { opacity: 0, duration: 0.05 }, 0.28) // text fades at 28%
            .to(contentDiv, { opacity: 0, duration: 0.05 }, 0.285); // div fades slightly after
            
        } else if (index === 1) {
          // Second section (Skills Academy): appears at 33%, text disappears at 55% (moved up from 60%)
          tl_content_text
            .to(contentDiv, { opacity: 1, duration: 0.05 }, 0.33) // div appears at 33%
            .slideUp(textElement, { opacity: 1, duration: 0.05 }, 0.33) // text appears at 33%
            .slideDown(textElement, { opacity: 0, duration: 0.05 }, 0.55) // text fades at 55% (was 60%)
            .to(contentDiv, { opacity: 0, duration: 0.05 }, 0.555); // div fades slightly after
            
        } else if (index === 2) {
          // Third section (Summer Camp): appears at 60%, stays visible until end (40% of timeline!)
          tl_content_text
            .to(contentDiv, { opacity: 1, duration: 0.05 }, 0.60) // div appears at 60% (was 66%)
            .slideUp(textElement, { opacity: 1, duration: 0.05 }, 0.60); // text appears at 60%
            // No fade out - stays visible for the full last 40% of the scroll
        }
      });
      
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

// if (document.body.classList.contains('example_19')) {
  example_19();
// }

export default example_19
