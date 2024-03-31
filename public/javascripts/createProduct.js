import { requestURL } from "/static/javascripts/catalogRequestHelpers.js";

document.addEventListener("DOMContentLoaded", function () {
  const modalCreatProduct = document.querySelector("#exampleModal");

  const productName = modalCreatProduct.querySelector("#nombre");
  const productDescription = modalCreatProduct.querySelector("#descripcion");
  const productPrice = modalCreatProduct.querySelector("#precio");
  const productExist = modalCreatProduct.querySelector("#existencias");
  const productImage = modalCreatProduct.querySelector("#imagen");
  const sumbitButton = modalCreatProduct.querySelector("#createBtn");

  modalCreatProduct.addEventListener("shown.bs.modal", () => {
    productName.focus();
  });

  sumbitButton.addEventListener("click", async function () {
    console.log("SUMBIT BUTTON SUBMITTED");
    const dataCreate = new FormData();

    dataCreate.append("nombre", productName.value);
    dataCreate.append("descripcion", productDescription.value);
    dataCreate.append("precio", productPrice.value);
    dataCreate.append("existencias", productExist.value);
    dataCreate.append("filename", productImage.files[0]);

    const postOptions = {
      method: "POST",
      body: dataCreate,
    };

    await fetch(requestURL + "crear", postOptions);
  });
});
