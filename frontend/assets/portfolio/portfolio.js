
import './portfolio.scss';

import './js/carousel.js';
import './js/zoom.js';

import Navigation from './js/navigation.js';

import CompareModule from './js/compare.js';
import ThreeModule from './js/three.js';
import UnityModule from './js/unity.js';
import VideoModule from './js/video.js';

const navigation = document.getElementById("navigation");
new Navigation(navigation);

const compareModules = document.getElementsByClassName("compare-module");
for (let i = 0; i < compareModules.length; i++) {
    new CompareModule(compareModules[i]);
}

const videoModules = document.getElementsByClassName("video-player");
for (let i = 0; i < videoModules.length; i++) {
    new VideoModule(videoModules[i]);
}

window.addEventListener("DOMContentLoaded", (event) => {

  const threeModules = document.getElementsByClassName("three-module");
  for (let i = 0; i < threeModules.length; i++) {
      new ThreeModule(threeModules[i]);
  }

  const unityModules = document.getElementsByClassName("unity-module");
  for (let i = 0; i < unityModules.length; i++) {
      new UnityModule(unityModules[i]);
  }

});
