// Mobile menu

const mobileMenuButton = document.querySelector(".mobile-menu-icon");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinkList = document.querySelector(".header-nav__list");
const backgroundOverlay = document.querySelector(".background-overlay");

function mobileMenuToggle() {
  mobileMenuButton.classList.toggle("mobile-menu-icon--active");
  mobileMenu.classList.toggle("mobile-menu--active");
  backgroundOverlay.classList.toggle("background-overlay--active");
  document.body.classList.toggle("body--scroll-disabled");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Close menu when click the link:
  mobileMenuLinkList.addEventListener("click", function (e) {
    if (e.target.classList.contains("header-nav__link")) {
      mobileMenuToggle();
    }
  });

  // Close menu when click outside menu:
  backgroundOverlay.addEventListener("click", function (e) {
    if (mobileMenu.classList.contains("mobile-menu--active")) {
      mobileMenuToggle();
    }
  });
}

mobileMenuButton.addEventListener("click", mobileMenuToggle);

window.addEventListener("keydown", function (e) {
  // Close menu by escape button:
  if (
    mobileMenu.classList.contains("mobile-menu--active") &&
    e.key === "Escape"
  )
    mobileMenuToggle();
});

// Slider

import pets from "../json/pets.json" assert { type: "json" };

const slider = document.querySelector(".slider__cards");
const sliderButtonPrev = document.querySelector(".slider__button-prev");
const sliderButtonNext = document.querySelector(".slider__button-next");

let sliderLeftElements = document.querySelector(".slider__cards-block-left");
let sliderCenterElements = document.querySelector(
  ".slider__cards-block-center"
);
let sliderRightElements = document.querySelector(".slider__cards-block-right");

let uniqueRandomNums = [];
let oldNums = [];

function getRandomNum(min, max, counter) {
  oldNums = uniqueRandomNums;
  uniqueRandomNums = [];
  let i = 0;
  let result;
  while (i < counter) {
    result = Math.floor(Math.random() * (max - min + 1) + min);
    if (!uniqueRandomNums.includes(result) && !oldNums.includes(result)) {
      uniqueRandomNums.push(result);
      i++;
    }
  }
  return uniqueRandomNums;
}

sliderButtonPrev.addEventListener("click", sliderMoveLeft);
sliderButtonNext.addEventListener("click", sliderMoveRight);

let sliderButtonPrevious;

function sliderMoveLeft(event) {
  slider.classList.add("slider-animation-left");
  sliderButtonNext.removeEventListener("click", sliderMoveRight);
  sliderButtonPrev.removeEventListener("click", sliderMoveLeft);

  if (sliderButtonPrevious == this || !sliderButtonPrevious) {
    sliderLeftElements.innerHTML = "";
    getRandomNum(0, 7, 3);
    uniqueRandomNums.forEach((num) =>
      sliderLeftElements.append(createCard(pets[num]))
    );
    console.log("new asset left");
  } else {
    uniqueRandomNums = oldNums;
  }
  console.log("oldNums:", oldNums, "uniqueRandomNums:", uniqueRandomNums);
  sliderButtonPrevious = this;
}

function sliderMoveRight() {
  slider.classList.add("slider-animation-right");
  sliderButtonPrev.removeEventListener("click", sliderMoveLeft);
  sliderButtonNext.removeEventListener("click", sliderMoveRight);

  if (sliderButtonPrevious == this || !sliderButtonPrevious) {
    sliderRightElements.innerHTML = "";
    getRandomNum(0, 7, 3);
    uniqueRandomNums.forEach((num) =>
      sliderRightElements.append(createCard(pets[num]))
    );
    console.log("new asset right");
  } else {
    uniqueRandomNums = oldNums;
  }
  console.log("oldNums:", oldNums, "uniqueRandomNums:", uniqueRandomNums);
  sliderButtonPrevious = this;
}

function createCard(object) {
  const card = document.createElement("div");
  card.classList.add("slider__card");

  const cardImageBlock = document.createElement("div");
  cardImageBlock.classList.add("slider__card-image-block");

  const cardImage = document.createElement("img");
  cardImage.classList.add("slider__card-image");
  cardImage.src = object.img;
  cardImage.alt = object.name;

  cardImageBlock.append(cardImage);
  card.append(cardImageBlock);

  const cardTextBlock = document.createElement("div");
  cardTextBlock.classList.add("slider__card-description");

  const cardText = document.createElement("p");
  cardText.classList.add("slider__card-text");
  cardText.innerText = object.name;

  const cardButton = document.createElement("button");
  cardButton.classList.add("button");
  cardButton.classList.add("slider__card-open-button");
  cardButton.innerText = "Learn more";

  cardTextBlock.append(cardText);
  cardTextBlock.append(cardButton);
  card.append(cardTextBlock);
  card.addEventListener("click", () => console.log("click on card"));

  return card;
}

sliderCenterElements.innerHTML = "";
getRandomNum(0, 7, 3);
uniqueRandomNums.forEach((num) =>
  sliderCenterElements.append(createCard(pets[num]))
);

slider.addEventListener("animationend", (animationEvent) => {
  if (animationEvent.animationName === "slider-left") {
    slider.classList.remove("slider-animation-left");
    sliderRightElements.innerHTML = sliderCenterElements.innerHTML;
    sliderCenterElements.innerHTML = sliderLeftElements.innerHTML;
  } else if (animationEvent.animationName === "slider-right") {
    slider.classList.remove("slider-animation-right");
    sliderLeftElements.innerHTML = sliderCenterElements.innerHTML;
    sliderCenterElements.innerHTML = sliderRightElements.innerHTML;
  }
  sliderButtonPrev.addEventListener("click", sliderMoveLeft);
  sliderButtonNext.addEventListener("click", sliderMoveRight);
});

/*
window.addEventListener("click", function (e) {
  console.log(e.target.classList);
});
*/
