import { APIEtiquetaURL, APIProductURL } from "/static/javascripts/catalogRequestHelpers.js";

// Función para hacer la solicitud a la API y poblar la lista
async function populateList(requestURL) {
  const response = await fetch(requestURL);
  const data = await response.json();

  const tagList = document.getElementById("tag-list");

  tagList.innerHTML = "";

  // Iteramos sobre los datos y creamos elementos de lista para la lista
  data.forEach(tag => {
    const divBotones = document.querySelector('#botones');
    const listItem = document.createElement("li");
    listItem.classList.add("tag-list-item");
    listItem.innerHTML = `
      <button class="tag-button" data-tag="${tag.nombre}">${tag.nombre} (${tag.total_productos})</button>
    `;
    tagList.appendChild(listItem);
    divBotones.appendChild(tagList);
  });

  // Agregar un event listener a cada botón para manejar el clic
  document.querySelectorAll(".tag-button").forEach(button => {
    button.addEventListener("click", () => {
      const tagName = button.getAttribute("data-tag");
      // Llamar a la función para filtrar los productos relacionados con el tag
      filterProducts(tagName);
    });
  });
}

// Llamamos a la función para poblar la lista al cargar la página
window.onload = () => populateList(APIEtiquetaURL + "/leer/");
