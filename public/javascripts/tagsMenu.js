import { APIEtiquetaURL } from "/static/javascripts/catalogRequestHelpers.js";

// Función para filtrar y mostrar solo los productos relacionados con el tag seleccionado
async function filterProducts(tagName) {
  const requestURL = `${document.getElementById("requestURL").value}?tag=${tagName}`;
  populateTable(requestURL);
}

// Función para hacer la solicitud a la API y poblar la tabla
async function populateTable(requestURL) {
  const response = await fetch(APIEtiquetaURL + "/leer/");
  const data = await response.json();

  const tableBody = document.getElementById("tag-table-body");

  tableBody.innerHTML = "";

  // Iteramos sobre los datos y creamos filas para la tabla
  data.forEach(tag => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tag.id}</td>
      <td><button class="tag-button" data-tag="${tag.nombre}">${tag.nombre}</button></td>
      <td>${tag.total_productos}</td>
    `;
    tableBody.appendChild(row);
  });

  // Agregar un event listener a cada botón para manejar el clic
  document.querySelectorAll('.tag-button').forEach(button => {
    button.addEventListener('click', () => {
      const tagName = button.getAttribute('data-tag');
      // Llamar a la función para filtrar los productos relacionados con el tag
      filterProducts(tagName);
    });
  });
}

// Llamamos a la función para poblar la tabla al cargar la página
window.onload = () => populateTable();
