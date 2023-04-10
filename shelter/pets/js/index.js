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

import pets from "../../json/pets.json" assert { type: "json" };

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

  modalPetImage.src = "../" + selectedPet.img;
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

// Pagination

function getRandomNum(min, max, counter) {
  let uniqueRandomNums = [];
  let oldNums = [];
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

let variants = [];

function getVariants(array, memory) {
  let fragmentOfArray;
  memory = memory || [];

  for (let i = 0; i < array.length; i++) {
    fragmentOfArray = array.splice(i, 1);
    if (array.length === 0) {
      variants.push(memory.concat(fragmentOfArray));
    }
    getVariants(array.slice(), memory.concat(fragmentOfArray));
    array.splice(i, 0, fragmentOfArray[0]);
  }
  return variants;
}

function getCardsOrder() {
  const uniqueCards = getRandomNum(0, 7, 8);
  const uniqueCardsPart1 = uniqueCards.slice(0, 3);
  const uniqueCardsPart2 = uniqueCards.slice(3, 6);
  const uniqueCardsPart3 = uniqueCards.slice(-2);

  const res1 = getVariants(uniqueCardsPart1);
  const res2 = getVariants(uniqueCardsPart2);
  let result = [];

  for (let i = 0; i <= Math.trunc(11 / 2); i++) {
    res2[i].forEach((num) => {
      result.push(num);
    });

    res2[i + Math.ceil(11 / 2)].forEach((num) => {
      result.push(num);
    });

    uniqueCardsPart3
      .sort((num1, num2) => 0.5 - Math.random())
      .forEach((num) => {
        result.push(num);
      });
  }
  return result;
}

const cardsOrder = getCardsOrder();

function createCard(object) {
  const card = document.createElement("div");
  card.classList.add("slider__card");

  const cardImageBlock = document.createElement("div");
  cardImageBlock.classList.add("slider__card-image-block");

  const cardImage = document.createElement("img");
  cardImage.classList.add("slider__card-image");
  cardImage.src = "../" + object.img;
  cardImage.alt = object.name;
  cardImage.dataset.name = object.name;

  cardImageBlock.append(cardImage);
  card.append(cardImageBlock);

  const cardTextBlock = document.createElement("div");
  cardTextBlock.classList.add("slider__card-description");

  const cardText = document.createElement("p");
  cardText.classList.add("slider__card-text");
  cardText.innerText = object.name;
  cardText.dataset.name = object.name;

  const cardButton = document.createElement("button");
  cardButton.classList.add("button");
  cardButton.classList.add("slider__card-open-button");
  cardButton.innerText = "Learn more";
  cardButton.dataset.name = object.name;

  cardTextBlock.append(cardText);
  cardTextBlock.append(cardButton);
  cardTextBlock.dataset.name = object.name;
  card.dataset.name = object.name;
  card.append(cardTextBlock);

  return card;
}

let currentPage = 1;

function displayCards(
  cards = cardsOrder,
  cardsPerPage = getCardsPerPage(),
  currPage = currentPage
) {
  const startCard = cardsPerPage * (currPage - 1);
  const endCard = startCard + cardsPerPage;
  const visibleCards = cards.slice(startCard, endCard);
  slider.innerHTML = "";
  visibleCards.forEach((num) => slider.append(createCard(pets[num])));
}

displayCards();

// Get cards per page

function getCardsPerPage() {
  const windowWidth = window.innerWidth;
  if (windowWidth < 648) {
    return 3;
  } else if (windowWidth <= 1200) {
    return 6;
  } else {
    return 8;
  }
}

function pagesCounter() {
  return Math.ceil(cardsOrder.length / getCardsPerPage());
}

// Pagination buttons

const firstPageButton = document.querySelector(".slider__button-first");
const prevPageButton = document.querySelector(".slider__button-prev");
const nextPageButton = document.querySelector(".slider__button-next");
const lastPageButton = document.querySelector(".slider__button-last");

function displayPaginationButtons() {
  document.querySelector(".slider__page").innerText = currentPage;
  if (currentPage === 1) {
    firstPageButton.classList.add("slider__button--disabled");
    prevPageButton.classList.add("slider__button--disabled");
    lastPageButton.classList.remove("slider__button--disabled");
    nextPageButton.classList.remove("slider__button--disabled");
  } else if (currentPage === pagesCounter()) {
    lastPageButton.classList.add("slider__button--disabled");
    nextPageButton.classList.add("slider__button--disabled");
    firstPageButton.classList.remove("slider__button--disabled");
    prevPageButton.classList.remove("slider__button--disabled");
  } else {
    document
      .querySelectorAll(".slider__button")
      .forEach((button) => button.classList.remove("slider__button--disabled"));
  }
}

displayPaginationButtons();

firstPageButton.addEventListener("click", () => {
  currentPage = 1;
  displayCards();
  displayPaginationButtons();
});

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayCards();
    displayPaginationButtons();
  }
});

nextPageButton.addEventListener("click", () => {
  if (currentPage < pagesCounter()) {
    currentPage++;
    displayCards();
    displayPaginationButtons();
  }
});

lastPageButton.addEventListener("click", () => {
  currentPage = pagesCounter();
  displayCards();
  displayPaginationButtons();
});

window.addEventListener("resize", function () {
  if (currentPage > pagesCounter()) {
    currentPage = pagesCounter();
  }
  displayCards();
  displayPaginationButtons();
});

screen.orientation.addEventListener("change", function () {
  if (currentPage > pagesCounter()) {
    currentPage = pagesCounter();
  }
  displayCards();
  displayPaginationButtons();
});
