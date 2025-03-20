import '../src/styles/style.css'
import { gsap } from 'gsap'

// const script = document.createElement("script");
// script.setAttribute("ap-color-vars", "");
// script.setAttribute("duration", "0.5");
// script.setAttribute("ease", "power1.out");
// document.head.appendChild(script); // Append it to the <head> or use document.body if needed
console.log(document.querySelector('script[ap-color-vars]'));




function color_mode_toggle() {
  console.log('color_mode_toggle.js is working');

  const htmlElement = document.documentElement;
  const computed = getComputedStyle(htmlElement);
  const scriptTag = document.querySelector("[ap-color-vars]");

  if (!scriptTag) {
    console.warn("Script tag with ap-color-vars attribute not found");
    return;
  }

  const cssVariables = scriptTag.getAttribute("ap-color-vars");
  if (!cssVariables) {
    console.warn("Value of ap-color-vars attribute not found");
    return;
  }

  let color_set_1 = {};
  let color_set_2 = {};

  cssVariables.split(",").forEach(function (item) {
    let color_set_1_value = computed.getPropertyValue(`--color--${item}`);
    let color_set_2_value = computed.getPropertyValue(`--dark--${item}`);
    if (color_set_1_value.length) {
      if (!color_set_2_value.length) color_set_2_value = color_set_1_value;
      color_set_1[`--color--${item}`] = color_set_1_value;
      color_set_2[`--color--${item}`] = color_set_2_value;
    }
  });

  function getTheme(themeName) {
    return themeName === "color_set_2" ? color_set_2 : color_set_1;
  }

  return { getTheme }; // ✅ Return an object containing `getTheme`
}

// ✅ Store the return value
const themeManager = color_mode_toggle();

// ✅ Now this will work:
document.addEventListener("color_mode_toggle_ready", () => {
  gsap.to(".my-element", { ...themeManager.getTheme("color_set_2") });
});


document.addEventListener("color_mode_toggle_ready", () => {
  gsap.to(".my-element", { ...color_mode_toggle.getTheme("color_set_2") });
});

// Call the function
color_mode_toggle()

export default color_mode_toggle