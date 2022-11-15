// setting icon
document.querySelector(".toggle-setting .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".setting-box").classList.toggle("open");
};
// check if there is localStorage color Option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      // add active class
      element.classList.add("active");
    }
  });
}
// switch color
let colorsList = document.querySelectorAll(".colors-list li");
// loop on all list item
colorsList.forEach((li) => {
  // set color on root
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color on localStorage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});
// random Background Option
let BackgroundOption = true;

// variable to  control the interval
let BackgroundInterval;
// check if there is localStorage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
// check if randomBackground local is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    BackgroundOption = true;
  } else {
    BackgroundOption = false;
  }
  // remove active class from all span
  document.querySelectorAll(".random span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random   .yes").classList.add("active");
  } else {
    document.querySelector(".random  .no").classList.add("active");
  }
}

// BackgroundOption
let randomBackground = document.querySelectorAll(".random span");
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.image === "yes") {
      BackgroundOption = true;
      randomImage();
      localStorage.setItem("background_option", true);
    } else {
      BackgroundOption = false;
      clearInterval(BackgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// select landingPage Element
let landingPage = document.querySelector(".landing-page");

// get Array of Image
let imgArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

// function to randomImage
function randomImage() {
  if (BackgroundOption === true) {
    BackgroundInterval = setInterval(() => {
      // get random Number
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      // change backgroundImage url
      landingPage.style.backgroundImage =
        'url("img/' + imgArray[randomNumber] + '")';
    }, 3000);
  }
}
randomImage();

// handle Active state
function handleActive(ev) {
  // remove active class from all children's
  ev.target.parentElement.querySelectorAll(".active").forEach((Element) => {
    Element.classList.remove("active");
  });
  // add active class
  ev.target.classList.add("active");
}
// skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // skill outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  // window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach(function (skill) {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup with the img
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = "popup-overlay";
    // append overlay to the body
    document.body.appendChild(overlay);
    // create the popup box
    let popupBox = document.createElement("div");
    // add class to popupBox
    popupBox.className = "popup-box";
    // create image
    let popupImage = document.createElement("img");
    // set image source
    popupImage.src = img.src;
    // add image to popupBox
    popupBox.appendChild(popupImage);
    // append the popupBoxto body /
    document.body.appendChild(popupBox);

    // exitImg
    let exitImg = document.createElement("div");
    exitImg.className = "exitImg";
    // document.querySelector(".gallery img").appendChild(exitImg);
    popupBox.appendChild(exitImg);
    exitImg.innerHTML = "X";
    exitImg.onclick = function () {
      //  document.body.overlay.remove("popup-overlay");
      overlay.classList.remove("popup-overlay");
      popupBox.classList.remove("popup-box");
      popupImage.remove("img");
      exitImg.classList.remove("exitImg");
      exitImg.innerHTML = "";
    };
  });
});

// start nav bullets
let allBullets = document.querySelectorAll(".nav-bullets ");

let allLinks = document.querySelectorAll("header .sidebar a");

function goToAnySection(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
goToAnySection(allLinks);
goToAnySection(allBullets);

// nav bullets option
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalItem = localStorage.getItem("bullets-option");
if (bulletsLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActive(e);
  });
});
// end nav bullets

// reset button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  localStorage.clear();
  window.location.reload();
};

// Button in header
let button_header = document.querySelector("header button");
let sidebar = document.querySelector("header .sidebar");
let linksInSidebar = document.querySelector("header .sidebar a");
button_header.onclick = function (e) {
  e.stopPropagation();
  sidebar.classList.toggle("open");
};
sidebar.onclick = function (e) {
  e.stopPropagation();
};
// Button in header

// click any where outside menu  and sidebar
document.addEventListener("click", (e) => {
  if (e.target !== button_header && e.target !== sidebar) {
    // check if menu is open
    if (sidebar.classList.contains("open")) {
      sidebar.classList.toggle("open");
    }
  }
});
