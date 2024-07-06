import '../src/styles/style.css'

import { gsap } from 'gsap'
// import { SplitText } from "gsap/SplitText";

// import barba from '@barba/core';

// import barbaCss from '@barba/css';
// barba.use(barbaCss);

// import feature from './features/feature'
import case_study from './case_study'
import cs_website_builder_tools from './cs_website_builder_tools'

gsap.registerPlugin(Flip)
console.log(Flip)
console.log(gsap)
// gsap.registerPlugin(SplitText)
// console.log(SplitText)

console.log('homepage.js is working. Say hello to n3')


const preloaderBackground = document.querySelector('.preloader__background')
const preloaderText = document.querySelector('.preloader__text span')

// our main timeline that we're putting other ones in
const mainTimeline = gsap.timeline()



// setting up a function for initial states
const setInitialStates = () => {
    gsap.set(preloaderText, {
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
        })

    return tl
}

mainTimeline
    .add(setInitialStates())
    .add(preloaderAnimation())
