import {
  APIProductURL,
  makeGetQueryURL,
} from "/static/javascripts/catalogRequestHelpers.js";

import {
  clearCatalog,
  createCardArray,
  makeRowOfCards,
} from "/static/javascripts/productsUI.js";

import {
  cleanPagesLists,
  createPageList,
  populatePagesLists,
} from "/static/javascripts/pagination.js";

document.addEventListener("DOMContentLoaded", async function () {
  await fetch(APIProductURL)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("catalogo");
      clearCatalog();
      container.appendChild(makeRowOfCards(createCardArray(data)));
      cleanPagesLists();
      populatePagesLists([
        createPageList(data["total_pages"], APIProductURL + "?"),
        createPageList(data["total_pages"], APIProductURL + "?"),
      ]);
    });

  const searchBox = document.getElementById("nombre");

  searchBox.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
      const nombre = document.getElementById("nombre");
      const precio_min = document.getElementById("precio_min");
      const precio_max = document.getElementById("precio_max");
      const exis_min = document.getElementById("exis_min");
      const exis_max = document.getElementById("exis_max");

      const keyInputs = [nombre, precio_min, precio_max, exis_min, exis_max];

      const completeQuery = APIProductURL + makeGetQueryURL(keyInputs);

      console.log("rNu", completeQuery);

      await fetch(completeQuery)
        .then((response) => response.json())
        .then((data) => {
          const container = document.getElementById("catalogo");
          clearCatalog();
          container.appendChild(makeRowOfCards(createCardArray(data)));
          cleanPagesLists();
          populatePagesLists([
            createPageList(data["total_pages"], completeQuery),
            createPageList(data["total_pages"], completeQuery),
          ]);
        });
    }
  });
});
