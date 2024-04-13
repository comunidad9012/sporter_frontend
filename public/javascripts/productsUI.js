function clearCatalog() {
  const container = document.getElementById("catalogo");
  if (container.querySelector("#productsFlexRow") != undefined) {
    container.removeChild(container.querySelector("#productsFlexRow"));
  }
}

function createCard(productData) {
  // Create elements
  const cardEl = document.createElement("div");
  cardEl.setAttribute("id", productData["id"]);
  cardEl.classList.add(
    "col-sm-2",
    "m-3",
    "cardElement",
    "d-flex",
    "flex-column"
  );

  const btnEl = document.createElement("button");
  btnEl.classList.add("btn", "btn-secondary");
  btnEl.textContent = "Modificar";
  btnEl.setAttribute("id", productData["id"]);

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
  numRow.appendChild(priceEl);
  numRow.appendChild(exisEl);
  numRow.append(btnEl);
  cardEl.appendChild(numRow);

  btnEl.addEventListener("click", (evento) => {
    window.location = `/actualizar/${productData["id"]}`;
  });

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

export { clearCatalog, createCard, createCardArray, makeRowOfCards };
