import { usuarioApi } from "/static/classes/resources.js";

document.addEventListener("DOMContentLoaded", async function () {
  document
    .getElementById("loginForm")
    .addEventListener("click", async function (event) {
      const usuario = document.getElementById("usuario").value;
      const contraseña = document.getElementById("contraseña").value;
      const messageElement = document.getElementById("message");

      await usuarioApi.login(usuario, contraseña).then((response) => {
        if (response.status === 200) {
          messageElement.textContent = "Inicio de sesión exitoso.";
          document.getElementById("loggedInUser").style = "";
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          messageElement.textContent =
            "Nombre de usuario o contraseña erróneos";
        }
      });
    });
});
