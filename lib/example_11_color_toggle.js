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
      let lightValue = computed.getPropertyValue(`--color-set_pale_green--${item}`).trim();
      let darkValue = computed.getPropertyValue(`--color-set_blue--${item}`).trim();
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
      if (dark) {
        localStorage.setItem("dark-mode", "true");
        htmlElement.classList.add("dark-mode");
        setColors(darkColors, animate);
        console.log("Switched to Dark Mode");
      } else {
        localStorage.setItem("dark-mode", "false");
        htmlElement.classList.remove("dark-mode");
        setColors(lightColors, animate);
        console.log("Switched to Light Mode");
      }
    }

    // Event listener for mode toggle buttons
    document.addEventListener("click", (e) => {
      const paleGreenButton = e.target.closest("[sj_color_pale_green]");
      const blueButton = e.target.closest("[sj_color_blue]");

      if (paleGreenButton) {
        console.log("Button with 'sj_color_pale_green' attribute clicked.");
        goDark(false, true); // Switch to Light Mode
      } else if (blueButton) {
        console.log("Button with 'sj_color_blue' attribute clicked.");
        goDark(true, true); // Switch to Dark Mode
      }
    });

    // Initialize based on local storage or system preference
    const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");
    let storagePreference = localStorage.getItem("dark-mode");
    if (storagePreference !== null) {
      storagePreference === "true" ? goDark(true, false) : goDark(false, false);
    } else {
      goDark(colorPreference.matches, false);
    }
  }

  // window.addEventListener("DOMContentLoaded", () => {
    colorModeToggle();
  // });

// console.log("Color toggle function executed!");
// }

// export default example_11_color_toggle
