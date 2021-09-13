/**
 * Процедурное программирование
 * Последовательная серия шагов/задач выполнения
 */

const [signInForm] = document.forms;
const printJSON = document.getElementById("printJSON");

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let message = {};

  const formData = new FormData(event.target);

  if (formData.get("email") && formData.get("email").trim().length) {
    message.data = {
      ...message.data,
      email: formData.get("email"),
    };
  } else {
    message.error = {
      ...message.error,
      email: "Invalid - email field is empty",
    };
  }

  if (formData.get("password") && formData.get("password").length >= 3) {
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

  printJSON.textContent = JSON.stringify(message, undefined, 2);
});
