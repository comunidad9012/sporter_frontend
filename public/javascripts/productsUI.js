function clearCatalog() {
  const container = document.getElementById("catalogo");
  if (container.querySelector("#productsFlexRow") != undefined) {
    container.removeChild(container.querySelector("#productsFlexRow"));
  }
}

function createCard(infoProducto) {
  const productoTarjeta = document.createElement("div");

  const productoNombre = document.createElement("h5");
  const productoPrecio = document.createElement("h6");
  const productoExistencias = document.createElement("h6");
  const productoImagen = document.createElement("img");

  const filaNumericos = document.createElement("div");
  const botonModificar = crearBotonModicar(infoProducto.id);

  productoTarjeta.setAttribute("id", infoProducto.id);

  productoImagen.src = `data:image/jpeg;base64,${infoProducto.imagen}`;

  productoNombre.textContent = infoProducto.nombre;
  productoPrecio.textContent = "Precio: " + infoProducto.precio;
  productoExistencias.textContent = "Existencias: " + infoProducto.existencias;

  productoImagen.classList.add(
    "img-thumbnail",
    "img",
    "img-responsive",
    "full-width",
    "thumbnailElement"
  );
  productoImagen.style = "width: 100%; height: auto";
  productoNombre.classList.add("text-center", "mt-2", "nameElement");
  productoPrecio.classList.add("col", "text-center", "priceElement");
  productoExistencias.classList.add("col", "text-center", "priceElement");
  productoTarjeta.classList.add(
    "col-sm-2",
    "m-3",
    "cardElement",
    "d-flex",
    "flex-column"
  );

  filaNumericos.classList.add("row");
  filaNumericos.appendChild(productoPrecio);
  filaNumericos.appendChild(productoExistencias);
  productoTarjeta.appendChild(productoImagen);
  productoTarjeta.appendChild(productoNombre);
  productoTarjeta.appendChild(filaNumericos);
  productoTarjeta.append(botonModificar);

  return productoTarjeta;
}

function createCardArray(dataResponse) {
  const cardArray = [];

  for (const product of dataResponse.search_result) {
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

function crearBotonModicar(id_producto) {
  const botonModificar = document.createElement("button");

  botonModificar.classList.add("btn", "btn-secondary");
  botonModificar.textContent = "Modificar";

  botonModificar.addEventListener("click", (evento) => {
    window.location = `/actualizar/${id_producto}`;
  });

  return botonModificar;
}

export { clearCatalog, createCard, createCardArray, makeRowOfCards };
