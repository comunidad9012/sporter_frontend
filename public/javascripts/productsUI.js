/** Limpia y puebla el catalogo con los productos de la busqueda
 *
 * @param {object} dataResponse
 */
export function populateCatalog(dataResponse) {
  clearCatalog();
  const container = document.getElementById("catalogo");
  container.appendChild(makeRowOfCards(createCardArray(dataResponse)));
}

/** Funcion para limpiar al catalogo
 *
 * Esta funcion quita del catalogo las tarjetas de producto existentes,
 * para lograrlo busca la fila de producto (donde se hayan todas las tarjetas)
 * y lo elimina
 */
export function clearCatalog() {
  const container = document.getElementById("catalogo");
  if (container.querySelector("#productsFlexRow") != undefined) {
    container.removeChild(container.querySelector("#productsFlexRow"));
  }
}

/** Creacion elemento HTML Tarjeta de Producto para el catalogo principal
 *
 * Recibe el siguiente objecto como parametro, descripto en las siguientes lineas:
 * @param {object} infoProducto objeto producto con informacion de producto
 * @param {number} infoProducto.id identificador de producto, entero positivo
 * @param {string} infoProducto.nombre nombre del objeto producto
 * @param {number} infoProducto.precio precio del producto, entero positivo
 * @param {number} infoProducto.existencias cantidad de existencias del producto, entero positivo
 * @param {string} infoProducto.imagen string binario codificado en base65, la imagen del producto
 *
 * @returns {HTMLDivElement} la tarjeta html estilizada con la informacion del producto
 *
 */
function createCard(infoProducto) {
  // tarjeta en si misma
  const productoTarjeta = document.createElement("div");

  // Elementos de tarjeta donde la informacion de producto
  // sera mostrada en el navegador cliente
  const productoNombre = document.createElement("h5");
  const productoPrecio = document.createElement("h6");
  const productoExistencias = document.createElement("h6");
  const productoImagen = document.createElement("img");

  // Fila horizontal para mostrar existencias y precio
  // que son elementos numericos
  const filaNumericos = document.createElement("div");
  // boton para redirijir a formulario actualizacion de producto
  const botonModificar = crearBotonModicar(infoProducto.id);

  // se establece la id de la tarjeta
  // esto permite que la tarjeta pueda ser referida de manera unica
  productoTarjeta.setAttribute("id", infoProducto.id);

  // las imagenes se reciben como un string codificado en base64
  // es decir, se recibe la imagen como binario
  // la siguiente linea decodifica el string binario
  // para que el navegador pueda renderizarlo
  // en caso de utilizar una mejor alternativa, como utilizar un cdn
  // o servir las imagenes con nginx
  // esto deberia ser reemplazado
  productoImagen.src = `data:image/jpeg;base64,${infoProducto.imagen}`;

  // se pueblan los demas elementos con sus valores
  productoNombre.textContent = infoProducto.nombre;
  productoPrecio.textContent = "Precio: " + infoProducto.precio;
  productoExistencias.textContent = "Existencias: " + infoProducto.existencias;

  // Agregar estilos a elementos de tarjeta usando bootstrap
  productoImagen.classList.add(
    "img-thumbnail",
    "img",
    "img-responsive",
    "full-width",
    "thumbnailElement"
  );
  // al elemento imagen se agrega este estilizado
  // para obligarlo a utilizar todo el espacio de la tarjeta
  productoImagen.style = "width: 100%; height: auto";
  productoNombre.classList.add( "text-center", "mt-2", "nameElement");
  productoPrecio.classList.add("col", "text-center", "priceElement");
  productoExistencias.classList.add("col", "text-center", "priceElement");
  productoTarjeta.classList.add(
    "col-sm-2",
    "m-3",
    "cardElement",
    "d-flex",
    "flex-column",
    "subtle",
    "bg-white",
    "border",
    "border-danger",
    "p-3",
    "rounded-3",
    "border-2",
  );

  // se agregan los elementos a la fila de numericos, en orden precio luego existencias
  filaNumericos.classList.add("row");
  filaNumericos.appendChild(productoPrecio);
  filaNumericos.appendChild(productoExistencias);
  // y para finalizar se agregan en orden
  // los elementos html a la tarjeta producto
  productoTarjeta.appendChild(productoImagen);
  productoTarjeta.appendChild(productoNombre);
  productoTarjeta.appendChild(filaNumericos);
  productoTarjeta.append(botonModificar);

  return productoTarjeta;
}

/** Creacion de arreglo con todas las tarjetas de producto de la busqueda
 *
 * Recibe el objeto total de la respuesta del backend
 * pero solo utiliza el atributo .search_results
 * donde se hayan los objetos con la informacion de los productos
 *
 * @param {object} dataResponse datos de la respuesta del servidor
 * @param {array} dataResponse.search_result arreglo con objetos de informacion de productos
 *
 * @returns {array[HTMLDivElement]} arreglo con las tarjetas de producto a agregar al catalogo
 */
function createCardArray(dataResponse) {
  const cardArray = [];

  for (const product of dataResponse.search_result) {
    cardArray.push(createCard(product));
  }

  return cardArray;
}

/** Crea la fila flex row con wrap donde se muestran los producto en el catalogo
 *
 * @param {array[HTMLDivElement]} arrayOfCards arreglo las tarjetas de producto ya construidas
 *
 * @returns {HTMLDivElement} elemento flex row con wrap para agregar al catalogo
 *
 */
function makeRowOfCards(arrayOfCards) {
  const rowFlex = document.createElement("div");
  rowFlex.classList.add(
    "flex-row",
    "mb-4",
    "d-flex",
    "flex-wrap",
    "align-items-center"
  );

  rowFlex.id = "productsFlexRow";

  for (const card of arrayOfCards) {
    const col = document.createElement("div");
    col.classList.add("col-lg-2", "col-md-4", "col-sm-6", "m-5");
    col.appendChild(card);

    rowFlex.appendChild(card);
  }

  return rowFlex;
}

/**Funcion para crear boton de redireccion a formulario de actualizacion de producto
 *
 * Crea un boton que mediante un evento click, redirige al formulario de actualizacion
 * del producto correspondiente
 *
 * @param {number} id_producto identificacion del producto, numero entero positivo
 *
 * @returns {HTMLButtonElement} boton de redireccion
 */
function crearBotonModicar(id_producto) {
  const botonModificar = document.createElement("button");

  // estilizado de boton
  botonModificar.classList.add("btn", "btn-secondary", "modify-product-btn");
  botonModificar.textContent = "Modificar";

  // se agrega al boton un evento para click
  // que indica al navegador, redirigir a la pagina del formulario
  // de actualizacion de producto
  // para ello se requiere la id de producto
  // que luego las funciones referidas a la actualizacion utilizaran
  // para hacer peticiones al backend con la id del producto
  botonModificar.addEventListener("click", (evento) => {
    window.location = `/actualizar/${id_producto}`;
  });

  return botonModificar;
}


