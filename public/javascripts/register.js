function mostrarFormulario() {
  var botonRegistro = document.querySelector("button");
  var formulario = document.getElementById("formulario-registro");

  botonRegistro.style.display = "none";
  formulario.style.display = "block";
}
document.addEventListener("DOMContentLoaded", function() {
  var botonRegistro = document.querySelector("button");
  botonRegistro.addEventListener("click", mostrarFormulario);
});

//envio de datos a la db

function registrarUsuario() {
  var nombre = document.getElementById("nombreUsr").value;
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
