export function isNullish(parameterValue) {
  if (
    parameterValue === null ||
    parameterValue === "" ||
    parameterValue === undefined
  ) {
    return true;
  }
  return false;
}
