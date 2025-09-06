import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// localStorage'dagi matnga qarab id aniqlanadi
const sl_option_id =
  localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
    ? 0
    : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
    ? 1
    : localStorage.getItem("sl_option_nav") === "Gold Klinker"
    ? 2
    : 0;

const updateFaviconAndTitle = (value) => {
  let faviconPath = "/photo_2.png";
  let pageTitle = "Stroy Baza | Xush kelibsiz";

  if (value === 0) {
    faviconPath = "/photo_2.png";
    pageTitle = "Stroy Baza №1 | Xush kelibsiz";
  } else if (value === 1) {
    faviconPath = "/photo_1.png";
    pageTitle = "Giaz Mebel | Xush kelibsiz";
  } else if (value === 2) {
    faviconPath = "/photo_3.png";
    pageTitle = "Gold Klinker | Xush kelibsiz";
  }

  const link = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = faviconPath + `?v=${Date.now()}`;
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = faviconPath + `?v=${Date.now()}`;
    document.head.appendChild(newLink);
  }

  document.title = pageTitle;
};

updateFaviconAndTitle(sl_option_id);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
