function crearModalEditarProducto(id, nombre, descripcion, precio, existencias, nombreImagen) {
    // Obtener el modal
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.setAttribute("id", "exampleModal");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "exampleModalLabel");
    modal.setAttribute("aria-hidden", "true");

    // Contenido del modal
    modal.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Actualizar producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            <form>
                <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" class="form-control" id="nombre" value="${nombre}">
                </div>
                <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <textarea class="form-control" id="descripcion">${descripcion}</textarea>
                </div>
                <div class="form-group">
                <label for="precio">Precio:</label>
                <input type="number" class="form-control" id="precio" value="${precio}">
                </div>
                <div class="form-group">
                <label for="existencias">Existencias:</label>
                <input type="number" class="form-control" id="existencias" value="${existencias}">
                </div>
                <div class="form-group">
                <label for="imagen">Nombre de la imagen:</label>
                <input type="text" class="form-control" id="imagen" value="${nombreImagen}">
                </div>
            </form>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="eliminarBtn">Eliminar</button>
            <button type="button" class="btn btn-primary" id="actualizarBtn">Actualizar</button>
            </div>
        </div>
        </div>
    `;

    // Agregar evento para enfocar el campo de nombre al mostrar el modal
    modal.addEventListener("shown.bs.modal", () => {
        modal.querySelector("#nombre").focus();
    });

    // Agregar evento para eliminar el producto
    modal.querySelector("#eliminarBtn").addEventListener("click", () => {
      // Aquí puedes agregar la lógica para eliminar el producto con el ID proporcionado
        console.log("Eliminar producto con ID:", id);
    });

    // Agregar evento para actualizar el producto
    modal.querySelector("#actualizarBtn").addEventListener("click", () => {
      // Aquí puedes agregar la lógica para actualizar el producto con los datos proporcionados
    const nombreActualizado = modal.querySelector("#nombre").value;
    const descripcionActualizada = modal.querySelector("#descripcion").value;
    const precioActualizado = modal.querySelector("#precio").value;
    const existenciasActualizadas = modal.querySelector("#existencias").value;
    const nombreImagenActualizada = modal.querySelector("#imagen").value;
    console.log("Actualizar producto con ID:", id);
    console.log("Nombre actualizado:", nombreActualizado);
    console.log("Descripción actualizada:", descripcionActualizada);
    console.log("Precio actualizado:", precioActualizado);
    console.log("Existencias actualizadas:", existenciasActualizadas);
    console.log("Nombre de imagen actualizado:", nombreImagenActualizada);
    });

    // Agregar el modal al body
    document.body.appendChild(modal);

    // Mostrar el modal
    $(modal).modal("show");
}

  // Ejemplo de uso
crearModalEditarProducto(1, "Producto A", "Descripción del Producto A", 100, 50, "imagen1.jpg");
