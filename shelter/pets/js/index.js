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
  ) {
    mobileMenuToggle();
  }
  if (
    document.querySelector(".modal").classList.contains("modal--visible") &&
    e.key === "Escape"
  ) {
    modalClose();
  }
});

// Popup pet card

import pets from "/shelter/json/pets.json" assert { type: "json" };

const slider = document.querySelector(".slider__cards");

const modal = document.querySelector(".modal");
const modalPetImage = document.querySelector(".modal-window__image");
const modalPetName = document.querySelector(".modal-window__name");
const modalPetType = document.querySelector(".modal-window__type");
const modalPetDescription = document.querySelector(
  ".modal-window__description"
);
const modalPetAge = document.querySelector(".feature-age");
const modalPetInoculations = document.querySelector(".feature-inoculations");
const modalPetDiseases = document.querySelector(".feature-diseases");
const modalPetParasites = document.querySelector(".feature-parasites");

function modalOpen() {
  modal.classList.add("modal--visible");
  document.body.classList.add("body--scroll-disabled");
}

function modalClose() {
  modal.classList.remove("modal--visible");
  document.body.classList.remove("body--scroll-disabled");
}

function modalRender(selectedPetName) {
  const selectedPet = pets.find((pet) => pet.name === selectedPetName);

  modalPetImage.src = selectedPet.img;
  modalPetImage.alt = selectedPet.name;
  modalPetName.innerText = selectedPet.name;
  modalPetType.innerText = `${selectedPet.type} - ${selectedPet.breed}`;
  modalPetDescription.innerText = selectedPet.description;
  modalPetAge.innerText = selectedPet.age;
  modalPetInoculations.innerText = selectedPet.inoculations;
  modalPetDiseases.innerText = selectedPet.diseases;
  modalPetParasites.innerText = selectedPet.parasites;
}

slider.addEventListener("click", (e) => {
  if (!e.target.classList.contains("slider__cards")) {
    modalRender(e.target.dataset.name);
    modalOpen();
  }
});

document
  .querySelector(".modal-window__close-button")
  .addEventListener("click", modalClose);

document.querySelector(".modal-overlay").addEventListener("click", modalClose);

/*
window.addEventListener("click", function (e) {
  console.log(e.target.classList);
});


window.addEventListener("resize", function (event) {
  windowWidth = window.innerWidth;
  // console.log(window.innerWidth + " wide");
});
*/
