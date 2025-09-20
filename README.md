# ViteJs + JS + Webflow = ❤️

This is a basic setup with [ViteJs](https://vitejs.dev/) that you can use for your Webflow website.
`jQuery` is already installed and declared as an external dependency.

I'm using [Netlify](https://www.netlify.com/) to build and host my code because it's easy to use, free, and has serverless functions out of the box. Feel free to use your favorite CDN.

**If you prefer TypeScript you can use [this template](https://github.com/armandsalle/vite-typescript-webflow)**

<br />

## Live demo

You can find a simple example of a Webflow site using this setup [here](https://vite-javascript.webflow.io/). The code is hosted on Netlify [here](https://vite-javascript-webflow.netlify.app/main.js). If you want to see the Webflow preview, it's [here](https://preview.webflow.com/preview/vite-javascript?utm_medium=preview_link&utm_source=designer&utm_content=vite-javascript&preview=65fac120c82ee6a81780f5a5cd5ecc59&workflow=preview) 👍

<br />

## How to use with Webflow

### 🇫🇷 French
The doc is [here](https://github.com/armandsalle/vite-javascript-webflow/blob/main/HowToUse_JS_FR.md) 

### 🇬🇧 English
The doc is [here](https://github.com/armandsalle/vite-javascript-webflow/blob/main/HowToUse_JS_EN.md) 

<br />

## Building and running on localhost

This project is using `yarn`.

First, install dependencies:

```sh
yarn
```

To launch a local dev server:

```sh
yarn dev
```

To create a production build:

```sh
yarn build
```

To clean the local `/dist` folder:

```sh
yarn clean
```

To lint the code with ESLint and Prettier:

```sh
yarn lint:fix
```

--

npx vite build to build.

do npm run dev to start server. 

--

Tried building a library using this:
Use Vite for JavaScript Libraries
https://andrewwalpole.com/blog/use-vite-for-javascript-libraries/

There's also a medium article on how to get multiple js working:
Build multiple javascripts in Library Mode with vitejs
https://medium.com/@tristan.wyl/build-multiple-javascripts-in-library-mode-with-vitejs-fc3fac4ea653


--

Some scratch 062024






var home_tl = gsap.timeline({ defaults: { ease: 'power1.inOut'} })
//autoAlpha below is for the Flash of Unstyled Content issue.

// letter by letter animation - https://codepen.io/ajuhpark/pen/oNVLmvg
gsap.registerPlugin(SplitText)
let split

function init(){
  home_tl
    .from("html", {duration: 0, autoAlpha:0}, 'home_start')
    //#f7f7f2 is light beige. #f7dcdc is light pink.
    .from('Body', { backgroundColor: '#f7dcdc', opacity: 0, duration: 0.4 }, '<')
    .from('.home_aboutSection_text_1', { yPercent: 110, duration: 1.1 }, 'home_start+=.3')
    .from('.home_aboutSection_text_1', { opacity: 0, duration: .9 }, 'home_start+=.6')
    .from('.home_aboutSection_text_2', { yPercent: 110, duration: 1.1 }, 'home_start+=.4')
    .from('.home_aboutSection_text_2', { opacity: 0, duration: .9 }, 'home_start+=.7')
    .from('.home_name', { yPercent: 110, duration: .7 }, 'home_start+=.3' )
    // .from('.home_name', { opacity: 0, duration: .9 }, 'home_start+=.3' )
    split = new SplitText('.home_name', {type:"chars"})
    .from(split.chars, {opacity:0, y:50, ease:"back(4)", stagger:0.5})


    .from('.cs_component_container_1', { yPercent: 10, duration: 1.2 }, 'home_start+=.5' )
    .from('.cs_component_container_1', { opacity: 0, duration: 1.7 }, 'home_start+=.3' )
    }

//addressing the Flash of unstyled content issue.
window.addEventListener("load", function(event) { 
  init(); //do stuff
  // GSDevTools.create({animation:tl})
  });


--

Previously I made a .npmrc file and put this in it

//npm.greensock.com/:_authToken=ce690915-b140-4149-88f6-3ce3e5a3d98c
@gsap:registry=https://npm.greensock.com/

But I don't need it anymore because i just used the actual file and put it in webflow.

--

test change before i delete yarn.lock.
--

maybe it was becauase i didn't merge the feature/gsap branch to the main. 

--

trying a diff version of yarn. 

--

for some reason other case_study.js file didn't build. 1

--

070624 removing flip to see if that's issue

071724 for some reason it didn't push 3.config.js last time. 

--

073024

    "build:part1": "yarn build-script-1 & yarn build-script-2 & yarn build-script-3",
    "build:part2": "yarn build-script-4 & yarn build-script-5 & yarn build-script-6",
    "build:part3": "yarn build-script-7 & yarn build-script-8 & yarn build-script-9",
    "build:part4": "yarn build-script-10",
    "build": "yarn build:part1 & yarn build:part2 & yarn build:part3 & yarn build:part4",

    "build": "yarn build-script-1 & yarn build-script-2 & yarn build-script-3 & yarn build-script-4 & yarn build-script-5 & yarn build-script-6 & yarn build-script-7 & yarn build-script-8 & yarn build-script-9 & yarn build-script-10",

--


    "build:part1": "yarn build-script-1 & yarn build-script-2 & yarn build-script-3",
    "build:part2": "yarn build-script-4 & yarn build-script-5 & yarn build-script-6",
    "build:part3": "yarn build-script-7 & yarn build-script-8 & yarn build-script-9",
    "build:part4": "yarn build-script-10 & yarn build-script-11",
    "build": "yarn build:part1 & yarn build:part2 & yarn build:part3 & yarn build:part4",
    "build-script-1": "vite build --config 1.vite.config.js",
    "build-script-2": "vite build --config 2.vite.config.js",
    "build-script-3": "vite build --config 3.vite.config.js",
    "build-script-4": "vite build --config 4.vite.config.js",
    "build-script-5": "vite build --config 5.vite.config.js",
    "build-script-6": "vite build --config 6.vite.config.js",
    "build-script-7": "vite build --config 7.vite.config.js",
    "build-script-8": "vite build --config 8.vite.config.js",
    "build-script-9": "vite build --config 9.vite.config.js",
    "build-script-10": "vite build --config 10.vite.config.js",
    "build-script-11": "vite build --config 11.vite.config.js",


--

090625

what does this mean?

andrewpark@MacBook-Pro-10 south_coast_therapy % npm run dev
> vite-javascript-webflow@0.0.1 dev
> vite
sh: vite: command not found

This error means that Vite is not installed on your system or not properly set up in your project.

Here's what's happening:

npm run dev is trying to run the "dev" script from your package.json
That script is calling vite (a development server)
But your system can't find the vite command
How to fix it:
1. Install the project dependencies first:

bash
npm install
This will install all the packages listed in your package.json file, including Vite.


--



I added this in terminal
echo "18" > .nvmrc

I deleted yarn.lock and then did yarn install to create a new yarn.lock
