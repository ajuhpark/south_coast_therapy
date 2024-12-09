// import '../src/styles/style.css'

import { gsap } from 'gsap'

/* 
// I don't need the menu for now.
import example_7 from './example_7'
example_7()
*/

console.log('bm_test.js is working. this is npm run dev working.')



// gsap.registerPlugin(Flip)
// console.log(Flip)
console.log(gsap)

gsap.registerPlugin(GSDevTools)
console.log(GSDevTools)


function init(){


    // const preloaderBackground = document.querySelector('.bm_preloader__background')
    // const preloaderText = document.querySelector('.preloader__text span')
    const heroTitles = document.querySelectorAll('.bm_hero__title__line')
    const heroImageStart = document.querySelector('.bm_hero-image-start')
    const heroCaption = document.querySelector('.hero__caption')
    const heroButton = document.querySelector('.bm_button_1_banner')
    // const heroButton = document.querySelector('.hero__button-container')
    const heroImageWrapper = document.querySelector('.bm_hero__image')
    const heroImage = document.querySelector('.bm_hero__image img')
    // const headerItems = [document.querySelectorAll('.bm_header_webflowNav *')]
    const headerItems = document.querySelectorAll('.bm_header_phone-link, .bm_header__logo, .bm_button_1');

    const heroImageContainer = document.querySelector('.bm_hero__image');


    // our main timeline that we're putting other ones in
    const mainTimeline = gsap.timeline()



    // setting up a function for initial states
    const setInitialStates = () => {
        // to address fuoc
        gsap.from("html", {duration: 0, autoAlpha:0})

        gsap.set(headerItems, {
            y:24,
            // autoAlpha is same as visibility hidden and opacity 0
            autoAlpha: 0
        })

        gsap.set(heroButton, {
        // gsap.set('.bm_button_1', {
            y: 64,
            autoAlpha: 0
        })

        // we can add an array in gsap of the things we want it to affect
        gsap.set([heroTitles, heroCaption], {
            yPercent: 100
        })

        // gsap.set([preloaderText], {
        //     yPercent: 138
        // })
    }


    /* 
    const preloaderAnimation = () => {
        // we're setting a timeline here within this timeline function
        const tl = gsap.timeline()
        defaults: {
            ease: 'power2.out'
        }
        tl
            .to(preloaderText, {
                yPercent: 0,
                delay: 1.4
            })
            .to(preloaderText, {
                yPercent: -120,
                delay: 1.8,
                // opacity: 0, 
            })
            .to(preloaderBackground, {
                yPercent: -100, 
                duration: 1.5,
                ease: 'power4.inOut'
            }, '<' )

        return tl
    }
*/

/*
    const heroImageAnimation = () => {
        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.inOut', 
                duration: 2
            }
        }

        
    )
    // we're saving the state in a variable
    const state = Flip.getState(heroImageWrapper)
    // we're moving heroImageWrapper into the heroImageStart div
    heroImageStart.appendChild(heroImageWrapper)

    tl.from(heroImage, {
        scale: 1.05
    })

    .to(heroImageWrapper, {
    // .to(heroImage, {
        borderRadius: '16px'
    }, '<')

    // Function to check if the current device is a desktop
    function isDesktop() {
        return window.matchMedia('(min-width: 769px)').matches; // Adjust the breakpoint as needed
    }

    if (isDesktop()) {
    // below will let us go back to the original state that we have in the variable
    tl.add(() => {
        Flip.to(state, {
            duration: 2,
            ease: 'power3.inOut',
            onProgress: () => {
                // Change the width after the Flip animation
                // heroImageContainer.style.Width = 'calc(100% - 48px)';
                heroImageContainer.style.minWidth = 'calc(100% - 48px)';
                // heroImageContainer.style.maxWidth = 'calc(100%)';
                // heroImageContainer.style.maxWidth = 'calc(100% - 10%)';
                // heroImageContainer.style.minHeight = 'calc(100% - 124px)';
                // heroImageContainer.style.maxHeight = 'calc(100% - 124px)';
                // heroImageContainer.style.position = 'relative';

            },
            onComplete: () => {
                // Change the width after the Flip animation
                // heroImageContainer.style.Width = 'calc(100% - 48px)';
                heroImageContainer.style.minWidth = 'calc(100% - 48px)';
                heroImageContainer.style.maxWidth = 'calc(100% - 48px)';
                // heroImageContainer.style.minWidth = 'calc(100% - 10%)';
                // heroImageContainer.style.maxWidth = 'calc(100% - 10%)';
                heroImageContainer.style.minHeight = 'calc(100% - 124px)';
                heroImageContainer.style.maxHeight = 'calc(100% - 124px)';
                // heroImageContainer.style.position = 'relative';

            }
        })
    }, '<')
    }
    
    function isTablet() {
        return window.matchMedia('(min-width: 568px) and (max-width: 768px)').matches; // Adjust as needed
    }
    if (isTablet()) {
        // below will let us go back to the original state that we have in the variable
        tl.add(() => {
            Flip.to(state, {
                duration: 2,
                ease: 'power3.inOut',
                onProgress: () => {
                    // Change the width after the Flip animation
                    // heroImageContainer.style.Width = 'calc(100% - 48px)';
                    heroImageContainer.style.minWidth = 'calc(100% - 48px)';
                    // heroImageContainer.style.maxWidth = 'calc(100% - 48px)';
                    // heroImageContainer.style.position = 'relative';
                },
                onComplete: () => {
                    heroImageContainer.style.minWidth = 'calc(100% - 48px)';
                    heroImageContainer.style.maxWidth = 'calc(100% - 48px)';
                    heroImageContainer.style.minHeight = 'calc(100% - 160px)';
                    heroImageContainer.style.maxHeight = 'calc(100% - 160px)';
                }
            })
        }, '<')
    }

    function isMobile() {
        return window.matchMedia('(max-width: 567px)').matches; // Adjust as needed
    }

    if (isMobile()) {
        // below will let us go back to the original state that we have in the variable
        tl.add(() => {
            Flip.to(state, {
                duration: 2,
                ease: 'power3.inOut',
                onProgress: () => {
                    // Change the width after the Flip animation
                    heroImageContainer.style.Width = 'calc(100% - 30px)';
                    // heroImageContainer.style.minWidth = 'calc(100% - 0px)';
                    // heroImageContainer.style.maxWidth = 'calc(100% - 48px)';
                    // heroImageContainer.style.position = 'relative';
                },
                onComplete: () => {
                    heroImageContainer.style.minWidth = 'calc(100% - 30px)';
                    heroImageContainer.style.maxWidth = 'calc(100% - 30px)';
                    heroImageContainer.style.minHeight = 'calc(100% - 180px)';
                    heroImageContainer.style.maxHeight = 'calc(100% - 180px)';
                }
            })
        }, '<')
    }
        
    // document.addEventListener('DOMContentLoaded', () => {
    //     const heroImageContainer = document.querySelector('.hero__image');
        
    //     // Ensure heroImage is not null
    //     if (heroImageContainer) {
    //         heroImageContainer.style.minWidth = '96vw';
    //     }
    //   });
      
    return tl
    }
*/

    const UIAnimation = () => {
        const tl = gsap.timeline({
            delay: 0.5, 
            defaults: {
                ease: 'power3.out',
                duration: 1.7,
                yPercent: 0,
                y:0
            }
        })

        tl.to(heroCaption, {
            duration: 1.2,
            ease: 'power3.inOut'
        })

        .to(heroTitles, {
            stagger: 0.2
        // below makes it overlap the above by 0.9s
        }, '-=0.9')

        .to(heroButton, {
            autoAlpha: 1
        }, 0.5)
        
        .to(headerItems, {
            autoAlpha: 1
        }, 0.5)

        return tl
    }


    mainTimeline
        .add(setInitialStates())
        // .add(preloaderAnimation())
        // .add(heroImageAnimation(), '-=1.5')
        .add(UIAnimation(),'<')

    // GSDevTools.create({ animation: mainTimeline });


}


/*
// Addressing the Flash of unstyled content issue
window.addEventListener("load", function(event) { 
init(); // do stuff
// GSDevTools.create({animation: home_tl});
});
*/

// Add event listeners to the specific links
const linksToHomepage = document.querySelectorAll('#bm-korean, #bm-english'); // Select both links
if (linksToHomepage) {
    linksToHomepage.forEach(link => {
        link.addEventListener('click', () => {
            sessionStorage.setItem('skipInit', 'true'); // Set the flag in sessionStorage
        });
    });
}

// Having animation not run when it's clicking from korean

window.addEventListener('load', () => {
    const skipInit = sessionStorage.getItem('skipInit');

    if (skipInit === 'true') {
        sessionStorage.removeItem('skipInit'); // Clear the flag to avoid unintended behavior
        console.log('init() skipped because the user navigated via bm-korean or bm-english.');

        /** 
        // Hide the bm_preloader element
        const preloader = document.querySelector('.bm_preloader');
        if (preloader) {
            preloader.style.display = 'none'; // Change CSS to hide the preloader
            console.log('bm_preloader is hidden.');
        }
        */
       
        // Make the HTML element visible
        const htmlElement = document.querySelector('html');
        if (htmlElement) {
            htmlElement.style.backgroundColor = '#fcf7f3'; // Change background color
            htmlElement.style.visibility = 'visible'; // Set HTML visibility to visible
            console.log('HTML visibility set to visible.');
        }

    } else {
        init(); // Run init() if no flag is set
    }
});
