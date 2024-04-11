const APIBaseURL = document.getElementById("APIBaseURL").value + "/api/";
const APIProductURL = APIBaseURL + "producto/";
const APIEtiquetaURL = APIBaseURL + "etiqueta/";

function makeGetQueryURL(arrayOfKeyInputs) {
  const parameters = {};
  console.log(arrayOfKeyInputs);
  for (const inputElement of arrayOfKeyInputs) {
    if (inputElement.value !== "") {
      parameters[inputElement.id] = inputElement.value;
    }
  }

  const queryParameters = new URLSearchParams(parameters);

  return "?" + queryParameters;
}

export { APIBaseURL, makeGetQueryURL, APIProductURL, APIEtiquetaURL };
