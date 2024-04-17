import { populateCatalog } from "/static/javascripts/productsUI.js";
import { productoApi } from "/static/classes/resources.js";

function setCurrentPageNumber(pageNumber) {
  if (pageNumber < 0) {
    pageNumber = -pageNumber;
  }

  window.sessionStorage.setItem(
    "oldPage",
    window.sessionStorage.getItem("page")
  );
  window.sessionStorage.setItem("page", pageNumber);
}

function setActivePageButtonsOnClick() {
  let previousPageNumber = window.sessionStorage.getItem("oldPage");
  const pageNumber = window.sessionStorage.getItem("page");

  if (previousPageNumber === "null") {
    previousPageNumber = 1;
  }

  document.querySelectorAll(`.page-btn-${previousPageNumber}`).forEach((e) => {
    e.classList.remove("active");
  });

  document.querySelectorAll(`.page-btn-${pageNumber}`).forEach((e) => {
    e.classList.add("active");
  });
}

function setActivePageButtonsOnCreation(pageNumber, pageButton = null) {
  if (String(pageNumber) === window.sessionStorage.getItem("page")) {
    pageButton.classList.add("active");
  }
  if (
    window.sessionStorage.getItem("page") === null &&
    pageNumber === 1 &&
    pageButton !== null
  ) {
    pageButton.classList.add("active");
  }
}

function makePageSearchElement(pageNumber) {
  const SearchByPageNumberElement = document.createElement("a");
  SearchByPageNumberElement.classList.add("page-link");
  SearchByPageNumberElement.textContent = pageNumber;
  SearchByPageNumberElement.href = "#";

  SearchByPageNumberElement.addEventListener("click", async function (event) {
    setCurrentPageNumber(pageNumber);
    setActivePageButtonsOnClick(pageNumber);
    await productoApi.buscar().then((data) => {
      populateCatalog(data);
    });
  });

  return SearchByPageNumberElement;
}

function cleanPagesLists() {
  const bothPageListsElements = document.querySelectorAll(".pageList");

  for (const pageList of bothPageListsElements) {
    const pageListChildren = pageList.children;

    for (let i = pageListChildren.length - 1; i >= 0; i--) {
      if (
        !pageListChildren[i].classList.contains("nextPageEl") &&
        !pageListChildren[i].classList.contains("previousPageEl")
      ) {
        pageListChildren[i].parentNode.removeChild(pageListChildren[i]);
      }
    }
  }
}

function createPageBtn(number) {
  const listItem = document.createElement("li");

  setActivePageButtonsOnCreation(number, listItem);
  listItem.classList.add("page-item", `page-btn-${number}`);

  const getSearchByPageNumber = makePageSearchElement(number);

  listItem.appendChild(getSearchByPageNumber);
  return listItem;
}

function createPageList(totalPages) {
  const pageBtnArray = [];

  for (let i = 1; i <= totalPages; i++) {
    pageBtnArray.push(createPageBtn(i));
  }

  return pageBtnArray;
}

function populatePagesLists(pageBtnArray2D) {
  const bothPageListsElements = document.querySelectorAll(".pageList");
  const bothNextElements = document.querySelectorAll(".nextPageEl");

  for (let i = 0; i < 2; i++) {
    for (const pageEl of pageBtnArray2D[i]) {
      bothPageListsElements[i].insertBefore(pageEl, bothNextElements[i]);
    }
  }
}

export function renderPageButtons(data) {
  cleanPagesLists();
  populatePagesLists([
    createPageList(data["total_pages"]),
    createPageList(data["total_pages"]),
  ]);
}
