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

const slider = document.querySelector(".slider__cards");
const sliderButtonPrev = document.querySelector(".slider__button-prev");
const sliderButtonNext = document.querySelector(".slider__button-next");

let sliderLeftElements = document.querySelector(".slider__cards-block-left");
let sliderCenterElements = document.querySelector(
  ".slider__cards-block-center"
);
let sliderRightElements = document.querySelector(".slider__cards-block-right");

sliderButtonPrev.addEventListener("click", sliderMoveLeft);
sliderButtonNext.addEventListener("click", sliderMoveRight);

function sliderMoveLeft() {
  slider.classList.add("slider-animation-left");
  sliderButtonNext.removeEventListener("click", sliderMoveRight);
  sliderButtonPrev.removeEventListener("click", sliderMoveLeft);
}

function sliderMoveRight() {
  slider.classList.add("slider-animation-right");
  sliderButtonPrev.removeEventListener("click", sliderMoveLeft);
  sliderButtonNext.removeEventListener("click", sliderMoveRight);
}

function createCard() {
  const card = document.createElement("div");
  card.classList.add("slider__card");

  const cardImageBlock = document.createElement("div");
  cardImageBlock.classList.add("slider__card-image-block");

  const cardImage = document.createElement("img");
  cardImage.classList.add("slider__card-image");

  cardImageBlock.append(cardImage);
  card.append(cardImageBlock);

  const cardTextBlock = document.createElement("div");
  cardTextBlock.classList.add("slider__card-description");

  const cardText = document.createElement("p");
  cardText.classList.add("slider__card-text");
  cardText.innerText = "pet";

  const cardButton = document.createElement("button");
  cardButton.classList.add("button");
  cardButton.classList.add("slider__card-open-button");
  cardButton.innerText = "Learn more";

  cardTextBlock.append(cardText);
  cardTextBlock.append(cardButton);
  card.append(cardTextBlock);

  // li.addEventListener("click", playPauseSelected);
}

slider.addEventListener("animationend", (animationEvent) => {
  if (animationEvent.animationName === "slider-left") {
    slider.classList.remove("slider-animation-left");
    sliderCenterElements.innerHTML = sliderLeftElements.innerHTML;
  } else if (animationEvent.animationName === "slider-right") {
    slider.classList.remove("slider-animation-right");
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
