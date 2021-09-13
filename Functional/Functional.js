/**
 * Функциональное программирование
 */
const REQUIRED = "REQUIRED";
const MIN_CHARS = "MIN_CHARS";

function validate(value, flag) {
  const requiredField = () => value && value.trim().length;
  if (flag === REQUIRED) {
    return requiredField();
  }

  if (flag === MIN_CHARS) {
    return requiredField(value) && value.length >= 3;
  }
}

function getValue(formElement, inputName) {
  const formData = new FormData(formElement);
  return formData.get(inputName);
}

function printJsonMessage(element, message) {
  element.textContent = JSON.stringify(message, undefined, 2);
}

function onSubmit(event) {
  event.preventDefault();
  let message = {};
  const emailValue = getValue(event.target, "email");
  const passwordValue = getValue(event.target, "password");
  const printJSON = document.getElementById("printJSON");

  if (validate(emailValue, REQUIRED)) {
    message.data = {
      ...message.data,
      email: emailValue,
    };
  } else {
    message.error = {
      ...message.error,
      email: "Invalid - email field is empty",
    };
  }

  if (validate(passwordValue, MIN_CHARS)) {
    message.data = {
      ...message.data,
      password: "******",
    };
  } else {
    message.error = {
      ...message.error,
      password: "Invalid - email or password incorrect",
    };
  }

  printJsonMessage(printJSON, message);
}

function initialize(formElement, onFormSubmit) {
  formElement.addEventListener("submit", onFormSubmit);
}

initialize(document.forms[0], onSubmit);
