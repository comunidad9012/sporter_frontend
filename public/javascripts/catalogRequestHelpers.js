const requestURL = document.getElementById("requestURL").value;

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



export { requestURL, makeGetQueryURL };
