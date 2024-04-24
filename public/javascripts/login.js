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
            url: '/api/login', // Endpoint para iniciar sesión
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function(response) {
                $('#message').text("Inicio de sesión exitoso.");
                // Redirige al usuario a la página de inicio o a donde desees
                window.location.href = "/";
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.responseJSON.error;
                $('#message').text(errorMessage);
            }
        });
    });
});
