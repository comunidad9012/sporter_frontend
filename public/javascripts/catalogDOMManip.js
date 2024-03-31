function clearCatalog() {
  const container = document.getElementById("catalogo");
  if (container.querySelector("#productsFlexRow") != undefined) {
    container.removeChild(container.querySelector("#productsFlexRow"));
  }
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

function createCard(productData) {
  // Create elements
  const cardEl = document.createElement("div");
  cardEl.classList.add(
    "col-sm-2",
    "m-3",
    "cardElement",
    "d-flex",
    "flex-column"
  );

  const imgEl = document.createElement("img");
  imgEl.src = `data:image/jpeg;base64,${productData["imagen"]}`;
  imgEl.classList.add(
    "img-thumbnail",
    "img",
    "img-responsive",
    "full-width",
    "thumbnailElement"
  );
  imgEl.style = "width: 100%; height: auto";
  // img.alt = "texto alternativo";

  const nameEl = document.createElement("h5");
  nameEl.classList.add("text-center", "mt-2", "nameElement");
  nameEl.textContent = productData["nombre"];

  // const descrEl = document.createElement("p");
  // descrEl.classList.add("text-center", "descrElement");
  // descrEl.classList.add("size");
  // descrEl.textContent = productData["descripcion"];

  const numRow = document.createElement("div");
  numRow.classList.add("row");

  const priceEl = document.createElement("h6");
  priceEl.textContent = "Precio: " + productData["precio"];
  priceEl.classList.add("col", "text-center", "priceElement");

  const exisEl = document.createElement("h6");
  exisEl.textContent = "Existencias: " + productData["existencias"];
  exisEl.classList.add("col", "text-center", "priceElement");

  cardEl.appendChild(imgEl);
  cardEl.appendChild(nameEl);
  // cardEl.appendChild(descrEl);
  numRow.appendChild(priceEl);
  numRow.appendChild(exisEl);
  cardEl.appendChild(numRow);

  return cardEl;
}

function createCardArray(data) {
  const cardArray = [];
  for (const product of data["search_result"]) {
    cardArray.push(createCard(product));
  }

  return cardArray;
}

function makeRowOfCards(arrayOfCards) {
  const rowFlex = document.createElement("div");
  rowFlex.classList.add(
    "flex-row",
    "mb-4",
    "d-flex",
    "flex-wrap",
    "align-items-center"
  );

  rowFlex.id = "productsFlexRow";

  for (const card of arrayOfCards) {
    const col = document.createElement("div");
    col.classList.add("col-lg-2", "col-md-4", "col-sm-6", "m-5");
    col.appendChild(card);

    rowFlex.appendChild(card);
  }

  return rowFlex;
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

export {
  clearCatalog,
  cleanPagesLists,
  createCard,
  createCardArray,
  makeRowOfCards,
  createPageBtn,
  createPageList,
  populatePagesLists,
};
