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

function createPageBtn(number, pagedQuery) {
  const listItem = document.createElement("li");
  listItem.classList.add("page-item");
  const linker = document.createElement("a");
  linker.classList.add("page-link");
  linker.textContent = number;
  linker.href = "#";

  linker.addEventListener("click", async function () {
    console.log("rNu", pagedQuery);
    await fetch(pagedQuery)
      .then((response) => response.json())
      .then((data) => {
        const container = document.getElementById("catalogo");
        clearCatalog();
        container.appendChild(makeRowOfCards(createCardArray(data)));
      });
  });

  listItem.appendChild(linker);
  return listItem;
}

function createPageList(totalPages, query) {
  const pageBtnArray = [];

  for (let i = 1; i <= totalPages; i++) {
    pageBtnArray.push(createPageBtn(i, query + `&page=${i}`));
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

export { cleanPagesLists, createPageBtn, createPageList, populatePagesLists };
