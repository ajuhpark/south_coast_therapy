import '../src/styles/style.css'
import { gsap } from 'gsap'
import example_7 from './example_7'


console.log('example_11_color_toggle.js is working')



// function example_11_color_toggle() {

  function colorModeToggle() {
    function attr(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean") return true;
      if (attrVal === "false" && defaultValType === "boolean") return false;
      if (isNaN(attrVal) && defaultValType === "string") return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
      return defaultVal;
    }

    const htmlElement = document.documentElement;
    const computed = getComputedStyle(htmlElement);
    let toggleEl;
    let togglePressed = "false";

    const scriptTag = document.querySelector("[sj_color_vars]");
    if (!scriptTag) {
      console.warn("Script tag with sj_color_vars attribute not found");
      return;
    }

    let colorModeDuration = attr(0.5, scriptTag.getAttribute("duration"));
    let colorModeEase = attr("power1.out", scriptTag.getAttribute("ease"));

    const cssVariables = scriptTag.getAttribute("sj_color_vars");
    if (!cssVariables.length) {
      console.warn("Value of sj_color_vars attribute not found");
      return;
    }

    let lightColors = {};
    let darkColors = {};
    cssVariables.split(",").forEach(function (item) {
      let lightValue = computed.getPropertyValue(`--color-set_pale_green--${item}`);
      let darkValue = computed.getPropertyValue(`--color-set_blue--${item}`);
      if (lightValue.length) {
        if (!darkValue.length) darkValue = lightValue;
        lightColors[`--color-set_pale_green--${item}`] = lightValue;
        darkColors[`--color-set_pale_green--${item}`] = darkValue;
      }
    });

    // Log the arrays to the console
    console.log("Light Colors:", lightColors);
    console.log("Dark Colors:", darkColors);

    if (!Object.keys(lightColors).length) {
      console.warn("No variables found matching sj_color_vars attribute value");
      return;
    }

    function setColors(colorObject, animate) {
      if (typeof gsap !== "undefined" && animate) {
        gsap.to(htmlElement, {
          ...colorObject,
          duration: colorModeDuration,
          ease: colorModeEase,
        });
      } else {
        Object.keys(colorObject).forEach(function (key) {
          htmlElement.style.setProperty(key, colorObject[key]);
        });
      }
    }

    function goDark(dark, animate) {
      console.log("goDark called with dark:", dark);
      if (dark) {
        localStorage.setItem("dark-mode", "true");
        htmlElement.classList.add("dark-mode");
        setColors(darkColors, animate);
        togglePressed = "true";
        console.log("Current mode: Dark Mode");
      } else {
        localStorage.setItem("dark-mode", "false");
        htmlElement.classList.remove("dark-mode");
        setColors(lightColors, animate);
        togglePressed = "false";
        console.log("Current mode: Light Mode");
      }
      if (typeof toggleEl !== "undefined") {
        toggleEl.forEach(function (element) {
          element.setAttribute("aria-pressed", togglePressed);
        });
      }
    }
    
    function getCurrentMode() {
      return htmlElement.classList.contains("dark-mode") ? "Dark Mode" : "Light Mode";
    }
    
    // Example usage:
    console.log("Current mode:", getCurrentMode());
    

    function checkPreference(e) {
      goDark(e.matches, false);
    }
    const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");
    colorPreference.addEventListener("change", (e) => {
      checkPreference(e);
    });

    let storagePreference = localStorage.getItem("dark-mode");
    if (storagePreference !== null) {
      storagePreference === "true" ? goDark(true, false) : goDark(false, false);
    } else {
      checkPreference(colorPreference);
    }



    // added from chatgpt to check if the sj_color_blue is working
    document.addEventListener("click", function (e) {
      const targetElement = e.target.closest("[sj_color_blue]");
      // console.log("Clicked element:", e.target);
      if (targetElement) {
        console.log("Button with sj_color_blue clicked:", targetElement);
        e.preventDefault();
      }
    });
    
    window.addEventListener("DOMContentLoaded", () => {
      const testElement = document.querySelector("[sj_color_blue]");
      if (!testElement) {
        console.error("No element with the 'sj_color_blue' attribute found in the DOM.");
      } else {
        console.log("Element with 'sj_color_blue' found:", testElement);
      }
    });

    /** 
    window.addEventListener("DOMContentLoaded", (event) => {

      toggleEl = document.querySelectorAll("[sj_color_blue]");
      console.log("Elements with sj_color_blue:", toggleEl);
      toggleEl.forEach(function (element) {
        element.setAttribute("aria-label", "View Dark Mode");
        element.setAttribute("role", "button");
        element.setAttribute("aria-pressed", togglePressed);
      });
      document.addEventListener("click", function (e) {
        const targetElement = e.target.closest("[sj_color_blue]");
        if (targetElement) {
          e.preventDefault(); // Prevent default anchor behavior
          console.log("Button with 'sj_color_blue' attribute was pressed:", targetElement);
          let darkClass = htmlElement.classList.contains("dark-mode");
          console.log("Is dark mode currently active?", darkClass);
          darkClass ? goDark(false, true) : goDark(true, true);
        }
      });
    });
    */

    // Check for elements with `sj_color_blue`
    toggleEl = document.querySelectorAll("[sj_color_blue]");
    if (toggleEl.length === 0) {
      console.error("No elements with the 'sj_color_blue' attribute found.");
    } else {
      console.log("Elements with 'sj_color_blue':", toggleEl);
      toggleEl.forEach((element) => {
        element.setAttribute("aria-label", "View Dark Mode");
        element.setAttribute("role", "button");
        element.setAttribute("aria-pressed", togglePressed);
      });
    }

    document.addEventListener("click", (e) => {
      const targetElement = e.target.closest("[sj_color_blue]");
      if (targetElement) {
        e.preventDefault();
        console.log("Button with 'sj_color_blue' attribute was pressed:", targetElement);
        let darkClass = htmlElement.classList.contains("dark-mode");
        console.log("Is dark mode currently active?", darkClass);
        darkClass ? goDark(false, true) : goDark(true, true);
      }
    });
  }
  // window.addEventListener("DOMContentLoaded", () => {
    colorModeToggle();
  // });

// console.log("Color toggle function executed!");
// }

// export default example_11_color_toggle
