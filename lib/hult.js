// import '../src/styles/style.css'

import { gsap } from 'gsap'

import example_17 from './example_17'

console.log('hult.js is working. this is npm run dev working.')



gsap.registerPlugin(Flip)
console.log(Flip)
console.log(gsap)

gsap.registerPlugin(GSDevTools)
console.log(GSDevTools)


function init(){


    const preloaderBackground = document.querySelector('.preloader__background')
    const preloaderText = document.querySelector('.preloader__text span')
    const heroTitles = document.querySelectorAll('.hero__title__line')
    const heroImageStart = document.querySelector('.hero-image-start')
    const heroCaption = document.querySelector('.hero__caption')
    const heroButton = document.querySelector('.hero__button')
    const heroImageWrapper = document.querySelector('.hero__image')
    const heroImage = document.querySelector('.hero__image img')
    const headerItems = [document.querySelectorAll('.header *')]
    const heroImageContainer = document.querySelector('.hero__image');


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
            y: 64,
            autoAlpha: 0
        })

        // we can add an array in gsap of the things we want it to affect
        gsap.set([preloaderText, heroTitles, heroCaption], {
            yPercent: 100
        })
    }


    const preloaderAnimation = () => {
        // we're setting a timeline here within this timeline function
        const tl = gsap.timeline()
        defaults: {
            ease: 'power2.out'
        }
        tl
            .to(preloaderText, {
                yPercent: 0,
                delay: 0.3
            })
            .to(preloaderText, {
                yPercent: -105,
                delay: 1
            })
            .to(preloaderBackground, {
                yPercent: -100, 
                duration: 1.5,
                ease: 'power4.inOut'
            }, '<' )

        return tl
    }

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
        borderRadius: '16px'
    }, '<')


    // below will let us go back to the original state that we have in the variable
    .add(() => {
        Flip.to(state, {
            duration: 2,
            ease: 'power3.inOut',
            onProgress: () => {
                // Change the width after the Flip animation
                // heroImageContainer.style.Width = 'calc(100% - 48px)';
                // heroImageContainer.style.minWidth = 'calc(100% - 48px)';
                heroImageContainer.style.maxWidth = 'calc(100% - 48px)';
                // heroImageContainer.style.minHeight = 'calc(100% - 124px)';
                // heroImageContainer.style.maxHeight = 'calc(100% - 124px)';
                // heroImageContainer.style.position = 'relative';

            },
            onComplete: () => {
                // Change the width after the Flip animation
                // heroImageContainer.style.Width = 'calc(100% - 48px)';
                heroImageContainer.style.minWidth = 'calc(100% - 48px)';
                heroImageContainer.style.maxWidth = 'calc(100% - 48px)';
                heroImageContainer.style.minHeight = 'calc(100% - 124px)';
                heroImageContainer.style.maxHeight = 'calc(100% - 124px)';
                // heroImageContainer.style.position = 'relative';


            }
        })
    }, '<')

        
    // document.addEventListener('DOMContentLoaded', () => {
    //     const heroImageContainer = document.querySelector('.hero__image');
        
    //     // Ensure heroImage is not null
    //     if (heroImageContainer) {
    //         heroImageContainer.style.minWidth = '96vw';
    //     }
    //   });
      
    return tl
    }

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
        .add(preloaderAnimation())
        .add(heroImageAnimation(), '-=1.5')
        .add(UIAnimation(),'<')

    // GSDevTools.create({ animation: mainTimeline });


}



// Addressing the Flash of unstyled content issue
window.addEventListener("load", function(event) { 
init(); // do stuff
// GSDevTools.create({animation: home_tl});
});

