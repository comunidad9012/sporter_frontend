$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();

        var usuario = $('#usuario').val();
        var contraseña = $('#contraseña').val();

        var loginData = {
            usuario: usuario,
            contraseña: contraseña
        };

        $.ajax({
            type: 'POST',
            url: '/login', // poner la ruta de inicio de sesion del endpoint
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function(response) {
                $('#message').text("Inicio de sesión exitoso.");
                $('#loggedInUsername').text("Usuario: " + response.nombre);
                $('#loggedInUser').show();
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.responseJSON.error;
                $('#message').text(errorMessage);
            }
        });
    });
});
