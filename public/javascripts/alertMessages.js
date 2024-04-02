function getAlertElement(message, status_code) {
  const dismissBtn = () => {
    const btn = document.createElement("button");
    btn.classList.add("close");
    btn.setAttribute("type", "button");
    btn.setAttribute("data-bs-dismiss", "alert");
    btn.setAttribute("aria-label", "Close");
    btn.innerHTML = "&times;";

    return btn;
  };
  const alertElement = document.createElement("div");

  if (status_code !== 200) {
    alertElement.classList.add("alert-danger");
  } else {
    alertElement.classList.add("alert-success");
  }

  alertElement.classList.add("show", "fade", "alert-dismissible", "alert");
  alertElement.setAttribute("role", "alert");
  alertElement.textContent = message;
  alertElement.appendChild(dismissBtn());
  return alertElement;
}

function clearAlerts() {
  const msgDisplay = document.getElementById("message-display");

  while (msgDisplay.firstChild) {
    msgDisplay.removeChild(msgDisplay.lastChild);
  }
}

function displayResponseMessages(response) {
  const message = Object.hasOwn(response.data, "msg")
    ? response.data.msg
    : response.data.msj;
  const status_code = response.status_code;

  const msgDisplay = document.getElementById("message-display");

  if (Array.isArray(message)) {
    for (const message of message) {
      const alertElement = getAlertElement(message, status_code);
      msgDisplay.appendChild(alertElement);
    }
  } else {
    const alertElement = getAlertElement(message, status_code);
    msgDisplay.appendChild(alertElement);
  }
}

export { clearAlerts, displayResponseMessages };
