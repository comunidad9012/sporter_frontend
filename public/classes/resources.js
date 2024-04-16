import { apiHandler } from "/static/classes/apiHandler.js";
import { queryHandler } from "/static/classes/queryHandler.js";

class apiProducto extends apiHandler {
  static #resourceAffix = "producto/";
  #queryParameters = [
    "nombre",
    "etiqueta",
    "page",
    "exis_min",
    "exis_max",
    "precio_min",
    "precio_max",
  ];
  queryHandler;

  constructor() {
    super(apiProducto.#resourceAffix);
    this.queryHandler = new queryHandler(this.#queryParameters);
  }

  async crear(newProductData = null) {
    if (newProductData === null) {
      throw new Error("Falta la informacion de producto nuevo");
    }

    const postOptions = {
      method: "POST",
      body: newProductData,
    };

    return await fetch(this.resourceURL + "crear", postOptions);
  }

  async actualizar(updatedProductData = null) {
    if (updatedProductData === null) {
      throw new Error("Falta la informacion de producto nuevo");
    }

    const postOptions = {
      method: "POST",
      body: updatedProductData,
    };

    return await fetch(this.resourceURL + "actualizar", postOptions);
  }

  async eliminar(id = 0) {
    return await fetch(this.resourceURL + "eliminar/" + id, {
      method: "POST",
    });
  }

  async buscar(esNuevaBusqueda = false) {
    return await fetch(
      this.resourceURL + this.queryHandler.makeGetQueryURL(esNuevaBusqueda)
    ).then((response) => response.json());
  }

  async getByIdentifier(identifier = 0) {
    return await fetch(this.resourceURL + identifier).then((response) =>
      response.json()
    );
  }
}

class apiEtiqueta extends apiHandler {
  static #resourceAffix = "etiqueta/";

  constructor() {
    super(apiEtiqueta.#resourceAffix);
  }

  async #queryTags(identifier = "") {
    return await fetch(this.resourceURL + "/leer/" + identifier).then(
      (response) => response.json()
    );
  }

  async readAll() {
    return await this.#queryTags();
  }

  async getByIdentifier(id_or_name = false) {
    return await this.#queryTags(id_or_name);
  }
}

export const productoApi = new apiProducto();
export const etiquetaApi = new apiEtiqueta();
