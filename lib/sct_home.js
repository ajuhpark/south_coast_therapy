/** SCT */
import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 
// import sj_menu from './sj_menu.js'
// sj_menu()
import example_20 from './example_20.js'


// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Register ALL plugins
// gsap.registerPlugin(ScrollTrigger, GSDevTools); 
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(Flip)

function sct_home() {
  console.log('sct_home.js is working')

  function init() {
    console.log('sct_home init function is working')

    gsap.from("html", {duration: 0, autoAlpha:0})
    
    // matter js - example_20.js
    example_20()

    // swiper 
    // so it's looking for the .swiper element.
    const swiper_sct_banner_1_images = new Swiper('.swiper.sct_banner_1_images', {
      // Add this line to enable the modules
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
      delay: 2000, // 2 seconds
      centeredSlides: true,
      disableOnInteraction: false, // Keep autoplay after user interaction
      },
      slidesPerView: 'auto',
      speed: 1400,
      spaceBetween: 0,
      // one slide visible by default so that applies to mobile.
      // slidesPerView: 1.1,
      slidesPerView: 1,
      // this gets it to first slide after it reaches the last
      // rewind:1,
      loop:true,
      navigation: {
        // nextEl: '.swiper.sj_sports_cards .swiper-arrow-card.is-next',
        // prevEl: '.swiper.sj_sports_cards .swiper-arrow-card.is-prev',
        nextEl: '.swiper-arrow-card.is-next',
        prevEl: '.swiper-arrow-card.is-prev',
      },
      // keyboard: {
      //   enabled: true,
      //   // only when swiper instance is in viewport
      //   onlyInViewport: true,
      // },
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 768px
        768: {
          // slidesPerView: 1,          
          slidesPerView: 'auto',
          spaceBetween: 0,
          // spaceBetween: '0%',

          centeredSlides: true,

        },
        // when window width is >= 991px
        991: {
          // slidesPerView: 'auto',
          // slidesPerView: 1.2,
          // spaceBetween: 20
          spaceBetween: '-45%',
          // spaceBetween: '0%',
          centeredSlides: true,
          slidesPerView: 1.01,

        }
      }
    });



    // swiper 
    // so it's looking for the .swiper element.
    const swiper_sct_banner_1_bg = new Swiper('.swiper.sct_banner_1_bg', {
      // Add this line to enable the modules
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
      reverseDirection: true,
      // delay: 5400, // 2:1 ratio
      delay:9000, // 3:1 ratio
      centeredSlides: true,
      disableOnInteraction: false, // Keep autoplay after user interaction
      },
      slidesPerView: 'auto',
      speed: 1400,
      spaceBetween: 0,
      // one slide visible by default so that applies to mobile.
      slidesPerView: 1,
      // this gets it to first slide after it reaches the last
      // rewind:1,
      loop:true,
      navigation: {
        // nextEl: '.swiper.sj_sports_cards .swiper-arrow-card.is-next',
        // prevEl: '.swiper.sj_sports_cards .swiper-arrow-card.is-prev',
        nextEl: '.swiper-arrow-card.is-next',
        prevEl: '.swiper-arrow-card.is-prev',
      },
      // keyboard: {
      //   enabled: true,
      //   // only when swiper instance is in viewport
      //   onlyInViewport: true,
      // },
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 768px
        768: {
          slidesPerView: 1,
          // spaceBetween: 30
          spaceBetween: '0%',
          centeredSlides: true,

        },
        // when window width is >= 991px
        991: {
          // slidesPerView: 'auto',
          slidesPerView: 1,
          // spaceBetween: 20
          spaceBetween: '0%',
          centeredSlides: true,
          // reverseDirection: true,
        }
      }
    });


    // Debug the instance
    console.log('Swiper instance:', swiper_sct_banner_1_images);
    console.log('Swiper slides count:', swiper_sct_banner_1_images.slides.length);
    console.log('Active slide index:', swiper_sct_banner_1_images.activeIndex);

  }

  // Initialize everything once the page has fully loaded
  window.addEventListener('load', function (event) {
    init()
  })
}

// Only run the code if we're on the correct page
if (document.body.classList.contains("sct_home")) {
  sct_home();
}

export default sct_home;