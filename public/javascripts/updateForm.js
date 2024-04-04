import { requestURL } from "/static/javascripts/catalogRequestHelpers.js";

document.addEventListener("DOMContentLoaded", async function () {
  const nombreElement = document.getElementById("nombre");
  const descripcionElement = document.getElementById("descripcion");
  const precioElement = document.getElementById("precio");
  const existenciasElement = document.getElementById("existencias");
  const imagenElement = document.getElementById("imagen");
  const imagenDisplay = document.getElementById("image_display");

  await fetch(requestURL + document.querySelector("#productID").value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      nombreElement.value = data["nombre"];
      descripcionElement.value = data["descripcion"];
      precioElement.value = data["precio"];
      existenciasElement.value = data["existencias"];
      imagenDisplay.src = `data:image/jpeg;base64,${data["imagen"]}`;
      // imagenElement.value = data["img_orig_name"];
    });
});
