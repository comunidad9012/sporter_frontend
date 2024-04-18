import { productoApi } from "/static/classes/resources.js";
import { populateCatalog } from "/static/javascripts/productsUI.js";

import { renderPageButtons } from "/static/javascripts/pagination.js";

document.addEventListener("DOMContentLoaded", async function () {
  await productoApi.buscar().then((data) => {
    populateCatalog(data);
    renderPageButtons(data);
  });

  // ESTE CAMBIO EVITA TENER QUE CLICKAR EN EL INPUT NOMBRE PARA DAR ENTER Y BUSCAR
  const searchBox = document.getElementById("searchBox");

  searchBox.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
      await productoApi.buscar(true).then((data) => {
        populateCatalog(data);
        renderPageButtons(data);
      });
    }
  });

  const brandHomeButton = document.getElementById("brand-home-button");

  brandHomeButton.addEventListener("click", function () {
    productoApi.queryHandler.clearQuery();
  });
});
