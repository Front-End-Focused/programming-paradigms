/**
 * Объектно-ориентированное программирование
 * Организация данных и логики в объектах (свойствах и методах
 */

class Validator {
  static requiredField(value) {
    return value && value.trim().length;
  }

  static minimumChars(value) {
    return Validator.requiredField(value) && value.length >= 3;
  }
}

class JSONMessage {
  constructor(element) {
    this.element = element;
  }

  print(message) {
    this.element.textContent = JSON.stringify(message, undefined, 2);
  }
}

class SignInForm {
  constructor() {
    const [signInForm] = document.forms;
    const printJSON = document.getElementById("printJSON");

    this.message = new JSONMessage(printJSON);
    signInForm.addEventListener("submit", this.onSubmit);
  }

  onSubmit = (event) => {
    event.preventDefault();
    let message = {};

    const formData = new FormData(event.target);

    if (Validator.requiredField(formData.get("email"))) {
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

    if (Validator.minimumChars(formData.get("password"))) {
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

    this.message.print(message);
  };
}

new SignInForm();
