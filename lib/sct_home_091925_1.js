/** SCT */
import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 
// import sj_menu from './sj_menu.js'
// sj_menu()

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
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
    
    // swiper 
    // so it's looking for the .swiper element.
    const swiper_sj_sports_cards = new Swiper('.swiper.sj_sports_cards', {
      // Add this line to enable the modules
      modules: [Navigation, Pagination],
      speed: 400,
      spaceBetween: 24,
      // one slide visible by default so that applies to mobile.
      slidesPerView: 1,
      // this gets it to first slide after it reaches the last
      rewind:1,
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
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 991px
        991: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });

    // Debug the instance
    console.log('Swiper instance:', swiper_sj_sports_cards);
    console.log('Swiper slides count:', swiper_sj_sports_cards.slides.length);
    console.log('Active slide index:', swiper_sj_sports_cards.activeIndex);

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