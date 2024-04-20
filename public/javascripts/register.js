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

document.addEventListener("DOMContentLoaded", function() {
  var botonRegistro = document.querySelector("button");
  botonRegistro.addEventListener("click", mostrarFormulario);
});

//envio de datos a la db

function registrarUsuario() {
  var nombre = document.getElementById("nombre").value;
  var usuario = document.getElementById("usuario").value;
  var contraseña = document.getElementById("contraseña").value;
  var is_admin = document.getElementById("is_admin").checked;
  if (is_admin == true){
    is_admin = 1
    
  } else {
    is_admin=0
  }
  console.log(is_admin);

  var data = {
      nombre: nombre,
      usuario: usuario,
      contraseña: contraseña,
      is_admin: is_admin
  };

  fetch( document.getElementById("APIBaseURL").value +   '/api/signup/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
      if (data.error) {
          document.getElementById("mensaje").innerText = data.error;
      } else {
          document.getElementById("mensaje").innerText = data.Mensaje;
      }
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById("mensaje").innerText = "Error en el servidor";
  });
}
