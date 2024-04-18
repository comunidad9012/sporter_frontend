import { productoApi } from "/static/classes/resources.js";

document.addEventListener("DOMContentLoaded", function () {
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  confirmDeleteBtn.addEventListener("click", async function () {
    // Me falta la obtencion del id del producto, esto es de prueba
    const productId = window.location.href.split("/").reverse()[0];

    try {
      const response = await productoApi.eliminar(productId);

      if (response.ok) {
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar el producto:", errorData.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  });
  // botón de cancelar
  cancelDeleteBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
});
