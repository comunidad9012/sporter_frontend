import { etiquetaApi, productoApi } from "/static/classes/resources.js";
import { populateCatalog } from "/static/javascripts/productsUI.js";
import { renderPageButtons } from "/static/javascripts/pagination.js";

function tagButtonQuery(tagButton, tagName) {
  tagButton.addEventListener("click", async function () {
    await productoApi.buscarPorEtiqueta(tagName).then((data) => {
      populateCatalog(data);
      renderPageButtons(data);
    });
  });
}

// Función para hacer la solicitud a la API y poblar la lista
async function populateList() {
  const data = await etiquetaApi.readAll();

  const tagList = document.getElementById("tag-list");

  tagList.innerHTML = "";

  // Iteramos sobre los datos y creamos elementos de lista para la lista
  data.forEach((tag) => {
    const divBotones = document.querySelector("#botones");
    const listItem = document.createElement("li");
    listItem.classList.add("tag-list-item");
    listItem.innerHTML = `
      <button class="tag-button" data-tag="${tag.nombre}">${tag.nombre} (${tag.total_productos})</button>
    `;

    tagButtonQuery(listItem, tag.nombre);
    tagList.appendChild(listItem);
    divBotones.appendChild(tagList);
  });

  // Agregar un event listener a cada botón para manejar el clic
}

// Llamamos a la función para poblar la lista al cargar la página
window.onload = () => populateList();
