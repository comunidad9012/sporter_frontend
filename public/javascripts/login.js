import { usuarioApi } from "/static/classes/resources.js";

        $(document).ready(function() {
  // Función para alternar la visualización de la contraseña
        $('#togglePassword').click(function() {
            const passwordField = $('#contraseña');
            const passwordFieldType = passwordField.attr('type');
            const icon=$(this).find('img');
            // Cambia el tipo de campo de contraseña entre 'password' y 'text'
            if (passwordFieldType === 'password') {
                passwordField.attr('type', 'text');
                icon.attr('src','/static/icons/eyeClosed.svg')
            } else {
                passwordField.attr('type', 'password');
                icon.attr('src','/static/icons/eyePassword.svg')
            }
        });
        });
document.addEventListener("DOMContentLoaded", async function () {
  document
    .getElementById("login-btn")
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
