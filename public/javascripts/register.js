import { usuarioApi } from "/static/classes/resources.js";

$(document).ready(function() {
  // Función para alternar la visualización de la contraseña
  $('#togglePassword').click(function() {
      const passwordField = $('#contraseña');
      const passwordFieldType = passwordField.attr('type');
      
      // Cambia el tipo de campo de contraseña entre 'password' y 'text'
      if (passwordFieldType === 'password') {
          passwordField.attr('type', 'text');
          $(this).text('Ocultar');
      } else {
          passwordField.attr('type', 'password');
          $(this).text('Mostrar');
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
  var is_admin = document.getElementById("is_admin").checked ? 1 : 0;

  var data = {
      nombre: nombre,
      usuario: usuario,
      contraseña: contraseña,
      correo: correo,
      is_admin: is_admin
  };

  await usuarioApi.crear(data)
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              document.getElementById("mensaje").innerText = data.error;
          } else {
              document.getElementById("mensaje").innerText = data.mensaje;
          }
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById("mensaje").innerText = "Error en el servidor";
      });
}
