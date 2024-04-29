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
  #paramPrefix = "prod_";
  queryHandler;

  constructor() {
    super(apiProducto.#resourceAffix);
    this.queryHandler = new queryHandler(
      this.#queryParameters,
      this.#paramPrefix
    );
  }

  getPageParam() {
    return this.#paramPrefix + "page";
  }

  async crear(newProductData = null) {
    if (newProductData === null) {
      throw new Error("Falta la informacion de producto nuevo");
    }

    const postOptions = {
      method: "POST",
      credentials: "include",
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
      credentials: "include",
      body: updatedProductData,
    };

    return await fetch(this.resourceURL + "actualizar", postOptions);
  }

  async eliminar(id = 0) {
    return await fetch(this.resourceURL + "eliminar/" + id, {
      method: "POST", 
      credentials: "include",
    });
  }

  async buscar(esNuevaBusqueda = false) {
    let query;

    if (esNuevaBusqueda) {
      query = this.queryHandler.fromSearchBox();
    } else {
      query = this.queryHandler.fromPersistence();
    }

    return await fetch(this.resourceURL + query).then((response) =>
      response.json()
    );
  }

  async buscarPorEtiqueta(etiqueta) {
    return await fetch(
      this.resourceURL + this.queryHandler.fromCustom({ etiqueta: etiqueta })
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

class apiUsuario extends apiHandler {
  static #resourceAffix = "user/";
  #queryParameters = ["nombre", "usuario", "correo", "is_admin", "page"];
  #paramPrefix = "user_";
  queryHandler;

  constructor() {
    super(apiUsuario.#resourceAffix);
    this.queryHandler = new queryHandler(
      this.#queryParameters,
      this.#paramPrefix
    );
  }

  getPageParam() {
    return this.#paramPrefix + "page";
  }

  async crear(newUserData = null) {
    if (newUserData === null) {
      throw new Error("Falta la informacion de usuario nuevo");
    }

    if (typeof newUserData === "object") {
      const newUserDataForm = new FormData();
      for (const attr in newUserData) {
        newUserDataForm.append(attr, newUserData[attr]);
      }
      newUserData = newUserDataForm;
    }

    const postOptions = {
      method: "POST",
      credentials: "include",
      body: newUserData,
    };

    return await fetch(this.resourceURL + "register", postOptions);
  }

  async actualizar(updatedUserData = null) {
    if (updatedUserData === null) {
      throw new Error("Falta la informacion de usuario nuevo");
    }

    const updatedUserDataForm = new FormData();
    if (typeof updatedUserData === "object") {
      for (const attr in updatedUserData) {
        updatedUserDataForm.append(attr, updatedUserData[attr]);
      }
      updatedUserData = updatedUserDataForm;
    }

    const postOptions = {
      method: "POST",
      credentials: "include",
      body: updatedUserData,
    };

    return await fetch(this.resourceURL + "actualizar", postOptions);
  }

  async login(username = "", password = "") {
    const loginForm = new FormData();

    loginForm.append("usuario", username);
    loginForm.append("contraseña", password);

    const postOptions = {
      method: "POST",
      credentials: "include",
      body: loginForm,
      headers: {
        started: new Date().getTime()
      }
    };

    return await fetch(this.resourceURL + "login", postOptions);
  }

  async eliminar(id = 0) {
    return await fetch(this.resourceURL + "eliminar/" + id, {
      method: "POST",
      credentials: "include",
    });
  }

  async buscar(esNuevaBusqueda = false, customQuery = null) {
    let query;

    if (esNuevaBusqueda && customQuery === null) {
      query = this.queryHandler.fromSearchBox();
    } else if (esNuevaBusqueda && typeof customQuery === "object") {
      query = this.queryHandler.fromCustom(customQuery);
    } else {
      query = this.queryHandler.fromPersistence();
    }

    return await fetch(this.resourceURL + query).then((response) =>
      response.json()
    );
  }

  async getByIdentifier(identifier = 0) {
    return await fetch(this.resourceURL + identifier).then((response) =>
      response.json()
    );
  }
}

export const productoApi = new apiProducto();
export const etiquetaApi = new apiEtiqueta();
export const usuarioApi = new apiUsuario();

window.productoApi = productoApi;
window.etiquetaApi = etiquetaApi;
window.usuarioApi = usuarioApi;
