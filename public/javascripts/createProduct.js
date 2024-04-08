import { requestURL } from "/static/javascripts/catalogRequestHelpers.js";
import {
  clearAlerts,
  displayResponseMessages,
} from "/static/javascripts/alertMessages.js";

document.addEventListener("DOMContentLoaded", function () {
  const modalCreatProduct = document.querySelector("#exampleModal");

  const productName = modalCreatProduct.querySelector("#nombre");
  const productDescription = modalCreatProduct.querySelector("#descripcion");
  const productPrice = modalCreatProduct.querySelector("#precio");
  const productExist = modalCreatProduct.querySelector("#existencias");
  const productImage = modalCreatProduct.querySelector("#imagen");
  const productEtiqueta = modalCreatProduct.querySelector("#select");
  const sumbitButton = modalCreatProduct.querySelector("#createBtn");

  modalCreatProduct.addEventListener("shown.bs.modal", async function () {
    productName.focus();
    const selectForm = document.querySelector("#select")
    await fetch("http://127.0.0.1:5000/api/etiqueta/leer/").then(resp=> resp.json()).then(datos=>{
      datos.forEach(etiqueta => {
        let optionEtiqueta= document.createElement("option")
        optionEtiqueta.textContent=etiqueta.nombre
        optionEtiqueta.setAttribute("value", `${etiqueta.id}`)
        selectForm.appendChild(optionEtiqueta)
  })})})

  sumbitButton.addEventListener("click", async function () {
    
    const dataCreate = new FormData();

    dataCreate.append("nombre", productName.value);
    dataCreate.append("descripcion", productDescription.value);
    dataCreate.append("precio", productPrice.value);
    dataCreate.append("existencias", productExist.value);
    dataCreate.append("id_etiqueta", productEtiqueta.value);
    dataCreate.append("filename", productImage.files[0]);

    const postOptions = {
      method: "POST",
      body: dataCreate,
    };

    await fetch(requestURL + "crear", postOptions)
      .then((response) =>
        response
          .json()
          .then((data) => ({ status_code: response.status, data: data }))
      )
      .then((obj) => {
        console.log(obj);
        clearAlerts();
        displayResponseMessages(obj);
      });
  });
});
