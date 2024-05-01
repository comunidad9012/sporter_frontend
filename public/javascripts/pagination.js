import { populateCatalog } from "/static/javascripts/productsUI.js";
import { productoApi } from "/static/classes/resources.js";
import { hideModify } from "/static/helpers/hideActions.js";

function setCurrentPageNumber(resouce, pageNumber) {
  if (pageNumber < 0) {
    pageNumber = -pageNumber;
  }

  window.sessionStorage.setItem(
    "oldPage",
    window.sessionStorage.getItem(resouce.getPageParam())
  );
  window.sessionStorage.setItem(resouce.getPageParam(), pageNumber);
}

function setActivePageButtonsOnClick(resouce) {
  let previousPageNumber = window.sessionStorage.getItem("oldPage");
  const pageNumber = window.sessionStorage.getItem(resouce.getPageParam());

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

function setActivePageButtonsOnCreation(
  resouce,
  pageNumber,
  pageButton = null
) {
  if (
    String(pageNumber) === window.sessionStorage.getItem(resouce.getPageParam())
  ) {
    pageButton.classList.add("active");
  }
  if (
    window.sessionStorage.getItem(resouce.getPageParam()) === null &&
    pageNumber === 1 &&
    pageButton !== null
  ) {
    pageButton.classList.add("active");
  }
}

function makePageSearchElement(resouce, pageNumber) {
  const SearchByPageNumberElement = document.createElement("a");
  SearchByPageNumberElement.classList.add("page-link");
  SearchByPageNumberElement.textContent = pageNumber;
  SearchByPageNumberElement.href = "#";

  SearchByPageNumberElement.addEventListener("click", async function (event) {
    setCurrentPageNumber(resouce, pageNumber);
    setActivePageButtonsOnClick(resouce, pageNumber);
    await productoApi.buscar().then((data) => {
      populateCatalog(data);
    });
    hideModify()
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

function createPageBtn(resouce, number) {
  const listItem = document.createElement("li");

  setActivePageButtonsOnCreation(resouce, number, listItem);
  listItem.classList.add("page-item", `page-btn-${number}`);

  const getSearchByPageNumber = makePageSearchElement(resouce, number);

  listItem.appendChild(getSearchByPageNumber);
  return listItem;
}

function createPageList(resouce, totalPages) {
  const pageBtnArray = [];

  for (let i = 1; i <= totalPages; i++) {
    pageBtnArray.push(createPageBtn(resouce, i));
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

export function renderPageButtons(resouce, data) {
  cleanPagesLists();
  populatePagesLists([
    createPageList(resouce, data["total_pages"]),
    createPageList(resouce, data["total_pages"]),
  ]);
}
