// Mobile menu

const mobileMenuButton = document.querySelector(".mobile-menu-icon");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinkList = document.querySelector(".header-nav__list");
const backgroundOverlay = document.querySelector(".background-overlay");

mobileMenuButton.addEventListener("click", mobileMenuToggle);

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
}

window.addEventListener("keydown", function (e) {
  // Close menu by escape button:
  if (
    mobileMenu.classList.contains("mobile-menu--active") &&
    e.key === "Escape"
  )
    mobileMenuToggle();
});

window.addEventListener("click", function (e) {
  console.log(e.target.classList);
});
