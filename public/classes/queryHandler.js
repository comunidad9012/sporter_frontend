import { isNullish } from "/static/helpers/valueValidation.js";

class queryHandler {
  #parametersNames;

  constructor(parametersNames) {
    this.#parametersNames = parametersNames;
  }

  makeGetQueryURL(newQuery = false) {
    // todo: aqui seria bueno validar que los parametros de busqueda sean validos
    if (newQuery) {
      this.#setQueryParameters(this.#getSearchBoxValues());
    }

    const query = new URLSearchParams(this.#getQueryParameters());

    return "?" + query;
  }

  #getSearchBoxValues() {
    const searchBox = document.getElementById("searchBox");

    const nombre = searchBox.querySelector("#nombre");
    const precio_min = searchBox.querySelector("#precio_min");
    const precio_max = searchBox.querySelector("#precio_max");
    const exis_min = searchBox.querySelector("#exis_min");
    const exis_max = searchBox.querySelector("#exis_max");

    const inputsArray = [nombre, precio_min, precio_max, exis_min, exis_max];

    const parameters = {};

    for (const inputElement of inputsArray) {
      if (isNullish(inputElement.value)) {
        continue;
      }
      parameters[inputElement.id] = inputElement.value;
    }

    return parameters;
  }

  #getQueryParameters() {
    const queryAsObject = {};

    for (const param of this.#parametersNames) {
      const parameterValue = window.sessionStorage.getItem(param);
      if (isNullish(parameterValue)) {
        continue;
      }

      queryAsObject[param] = parameterValue;
    }

    return queryAsObject;
  }

  #setQueryParameters(queryParametersObject) {
    this.clearQuery();
    for (const param of this.#parametersNames) {
      if (isNullish(queryParametersObject[param])) {
        continue;
      }

      window.sessionStorage.setItem(param, queryParametersObject[param]);
    }
  }

  clearQuery() {
    for (const param of this.#parametersNames) {
      window.sessionStorage.removeItem(param);
    }
  }
}

export { queryHandler };
