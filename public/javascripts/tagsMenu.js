import { etiquetaApi, productoApi } from "/static/classes/resources.js";
import { populateCatalog } from "/static/javascripts/productsUI.js";
import { renderPageButtons } from "/static/javascripts/pagination.js";
import { hideModify } from "/static/helpers/hideActions.js";

function tagButtonQuery(tagButton, tagName) {
  tagButton.addEventListener("click", async function () {
    await productoApi.buscarPorEtiqueta(tagName).then((data) => {
      populateCatalog(data);
      renderPageButtons(productoApi, data);
    });
    hideModify();
  });
}

// Función para hacer la solicitud a la API y poblar la lista
async function populateList() {
  const data = await etiquetaApi.readAll();

  const tagList = document.getElementById("tag-list");

  tagList.innerHTML = "";

  // Iteramos sobre los datos y creamos elementos de lista para la lista
  data.forEach((tag) => {
    const listItem = document.createElement("li");
    listItem.classList.add("tag-list-item");

    // Crear el botón con las mismas clases de estilo que los botones del navbar
    const button = document.createElement("button");
    button.classList.add("btn", "btn-4", "tag-button");
    button.setAttribute("data-tag", tag.nombre);
    button.textContent = `${tag.nombre} `;

    // Agregar el botón al elemento de lista
    listItem.appendChild(button);

    // Agregar el evento de clic al botón
    tagButtonQuery(button, tag.nombre);

    // Agregar el elemento de lista a la lista
    tagList.appendChild(listItem);
  });

  // Agregar la lista al contenedor adecuado en tu HTML
  const divBotones = document.querySelector("#botones");
  divBotones.appendChild(tagList);
}

// Llamamos a la función para poblar la lista al cargar la página
window.onload = () => populateList();
