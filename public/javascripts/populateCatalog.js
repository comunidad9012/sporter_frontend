import { productoApi } from "/static/classes/resources.js";
import { populateCatalog } from "/static/javascripts/productsUI.js";

import { renderPageButtons } from "/static/javascripts/pagination.js";
import { displayResponseMessages } from "/static/javascripts/alertMessages.js";

document.addEventListener("DOMContentLoaded", async function () {
  await productoApi.buscar().then(async (data) => {
    if (data.search_result === undefined || data.search_result === null) {
      productoApi.queryHandler.clearQuery();
      data = await productoApi.buscar();
    }

    populateCatalog(data);
    renderPageButtons(data);
  });

  // ESTE CAMBIO EVITA TENER QUE CLICKAR EN EL INPUT NOMBRE PARA DAR ENTER Y BUSCAR
  const searchBox = document.getElementById("searchBox");

  searchBox.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
      await productoApi.buscar(true).then((data) => {
        if (data.search_result === undefined || data.search_result === null) {
          productoApi.queryHandler.clearQuery();
          data.status_code = 400;
          displayResponseMessages({ data: data });
        } else {
          populateCatalog(data);
          renderPageButtons(data);
        }
      });
    }
  });

  const brandHomeButton = document.getElementById("brand-home-button");

  brandHomeButton.addEventListener("click", function () {
    productoApi.queryHandler.clearQuery();
    window.location.href = "/";
  });
});
