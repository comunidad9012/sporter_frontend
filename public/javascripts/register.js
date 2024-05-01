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

//envio de datos a la db

document.addEventListener("DOMContentLoaded", function() {
  var botonRegistro = document.querySelector("#button-registro");
  botonRegistro.addEventListener("click", registrarUsuario);
});

async function registrarUsuario() {

  var nombre = document.getElementById("nombre").value;
  var usuario = document.getElementById("usuario").value;
  var contraseña = document.getElementById("contraseña").value;
  var correo = document.getElementById("correo").value;

  var data = {
      nombre: nombre,
      usuario: usuario,
      contraseña: contraseña,
      correo: correo,
  };

  await usuarioApi.crear(data)
      .then(response => response.json())
      .then(async (data) => {
          if (data.error) {
              document.getElementById("mensaje").innerText = data.error;
          } else {
              document.getElementById("mensaje").innerText = data.mensaje;
              await usuarioApi.login(usuario, contraseña).then((response) => {
                if (response.status === 200) {
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 2000);
                } 
              });
          }
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById("mensaje").innerText = "Error en el servidor";
      });
}
