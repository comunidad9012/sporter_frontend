import { isNullish } from "/static/helpers/valueValidation.js";

class queryHandler {
  #parametersNames;
  #paramPrefix;

  constructor(parametersNames, paramPrefix) {
    this.#parametersNames = parametersNames;
    this.#paramPrefix = paramPrefix;
  }

  fromSearchBox() {
    this.#setQueryParameters(this.#getSearchBoxValues());
    return this.#makeGetQueryURL();
  }

  fromCustom(customQuery = null) {
    if (customQuery !== null) {
      this.#setQueryParameters(customQuery);
    }
    return this.#makeGetQueryURL();
  }

  fromPersistence() {
    return this.#makeGetQueryURL();
  }

  #makeGetQueryURL() {
    const query = new URLSearchParams(this.#getQueryParameters());

    return "?" + query;
  }

  #getSearchBoxValues() {
    const searchBox = document.getElementById("searchBox");

    const parameters = {};

    for (const parameter of this.#parametersNames) {
      const inputElement = searchBox.querySelector(`#${parameter}`);

      if (isNullish(inputElement) || isNullish(inputElement.value)) {
        continue;
      }
      parameters[inputElement.id] = inputElement.value;
    }

    return parameters;
  }

  #getQueryParameters() {
    const queryAsObject = {};

    for (const param of this.#parametersNames) {
      const parameterValue = window.sessionStorage.getItem(
        this.#paramPrefix + param
      );
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

      window.sessionStorage.setItem(
        this.#paramPrefix + param,
        queryParametersObject[param]
      );
    }
  }

  clearQuery() {
    for (const param of this.#parametersNames) {
      window.sessionStorage.removeItem(this.#paramPrefix + param);
    }
  }
}

export { queryHandler };
