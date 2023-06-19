// URL Link
const link = document.querySelectorAll("#link");
link.forEach((ele) => {
  ele.onclick = () => {
    console.log(window.scrollX);
    console.log(window.scrollY);
  };
});

// Nav Resizer
var toggle = document.getElementById("toggle");
var content = document.getElementById("content");

toggle.onclick = function () {
  content.classList.toggle("hidden");
};

var resizeWindow = function (event) {
  if (window.innerWidth <= 640) {
    content.classList.add("hidden");
  } else {
    content.classList.remove("hidden");
  }
};
window.onload = resizeWindow;
window.onresize = resizeWindow;

// Typed
var typed = new Typed(".typed", {
  strings: [
    "Web Designer",
    "Web Developer",
    "FrontEnd Developer",
    "BackEnd Developer",
    "App Developer",
  ],
  smartBackspace: true,
  typeSpeed: 50,
  backSpeed: 25,
  loop: true,
});

// Floating Icons
const floaters = () => {
  var aboutTag = document.getElementById("floaters");
  const sizeMin = 30;
  const sizeMax = 105;
  const sizeRange = [15, 30, 45, 60, 75];
  const sizeDiff = sizeMax - sizeMin;

  const left = Math.random() * (100 - -10) + -10;
  const index = Math.floor(Math.random() * sizeRange.length);
  const size = sizeRange[index];

  const negative = -Math.abs(size / 10);
  const gap = (sizeDiff / 10) * 2 + 1;
  const time = negative + gap;

  const iconTag = document.createElement("i");
  const icons = [
    "fa-gear",
    "fa-pen-paintbrush",
    "fa-code",
    "fa-js",
    "fa-react",
  ];
  const iconIndex = Math.floor(Math.random() * icons.length);
  const icon = icons[iconIndex];

  const animations = ["rotate1", "rotate2"];
  const animIndex = Math.floor(Math.random() * animations.length);
  const anim = animations[animIndex];

  if (icon == "fa-js" || icon == "fa-react") {
    iconTag.classList.add("fa-brands");
  } else {
    iconTag.classList.add("fas");
  }
  iconTag.classList.add(icon);
  iconTag.style.left = `${left}%`;
  iconTag.style.fontSize = `${size}px`;
  iconTag.style.animation = `moveUp ${time}s ease-in, ${anim} ${time}s linear`;
  aboutTag.append(iconTag);
  setTimeout(() => {
    iconTag.remove();
  }, time * 1000);
};
setInterval(floaters, 1000);

// Social Media Icons render
var socialTag = document.getElementById("social");
socialIcons.forEach((imgset) => {
  socialTag.innerHTML += `
    <div class="icons cursor-pointer">
      <a href={${imgset[2]}} target="_blank">
        <!-- <img
          class="icon"
          src="./resources/images/icons/${imgset[0]}.png"
          alt=""
        /> -->
        <img
          class="iconc"
          src="./resources/images/icons/${imgset[1]}.png"
          alt=""
        />
      </a>
    </div>
  `;
});

// Programming language Icons
var langTag = document.getElementById("program");
langIcons.forEach((lang) => {
  langTag.innerHTML += `
    <div class="grid-icons">
      <img class="" src="./resources/images/language/${lang[1]}.png" alt="" />
      <span class="language-text fontr">${lang[0]}</span>
    </div>
  `;
});

// Projects render
var projTag = document.querySelector(".all-projects");
projects.forEach((proj) => {
  projTag.innerHTML += `
    <div class="project">
      <img src="./resources/images/projects/${proj.img}.png" alt="" />
      <div class="card flex flex-col fontr gap-2">
        <span class="fontb text-xl">${proj.title}</span>
        <span>${proj.description}</span>
        <div class="buttons flex justify-between">
          <a class="button" href="${proj.link}" target="_blank">
            <i class="far fa-link"></i>
            <span>Link</span>
          </a>
          <a class="button" href="${proj.code}" target="_blank">
            <i class="far fa-code"></i>
            <span>Code</span>
          </a>
        </div>
      </div>
    </div>
  `;
});
