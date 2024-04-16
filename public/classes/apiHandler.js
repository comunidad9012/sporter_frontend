class apiHandler {
  static #baseUrl = document.getElementById("APIBaseURL").value + "/api/";
  #resourceAffix;
  resourceURL;

  constructor(affix) {
    this.#resourceAffix = affix;
    this.resourceURL = apiHandler.#baseUrl + this.#resourceAffix;
  }

  crear() {
    throw new Error("Metodo no implementado por subclase");
  }
  actualizar() {
    throw new Error("Metodo no implementado por subclase");
  }
  eliminar() {
    throw new Error("Metodo no implementado por subclase");
  }
  buscar() {
    throw new Error("Metodo no implementado por subclase");
  }
}

export { apiHandler };
