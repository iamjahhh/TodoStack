const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const responseMessage = document.getElementById("responseMessage");

window.onload = async () => {
  await fetch("/check-login", {
    method: "POST",
    credentials: "same-origin",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == "Not logged in") {
        document.getElementById("mainText").style.display = "inline";
        responseMessage.style.color = "red";
        loginForm.style.display = "inline";
        return;
      }

      window.location.href = "/dashboard";
    })
    .catch((error) => {
      responseMessage.textContent =
        error.message || "An error occurred. Please try again later.";
    });
};

document.getElementById("loginButton").addEventListener("click", async (e) => {
  e.preventDefault();

  document.getElementById("mainText").style.display = "inline";
  document.getElementById("mainText").textContent = "Login";
  registerForm.style.display = "none";
  loginForm.style.display = "inline";
});
document.getElementById("registerButton").addEventListener("click", async (e) => {
  e.preventDefault();

  document.getElementById("mainText").style.display = "inline";
  document.getElementById("mainText").textContent = "Register";
  loginForm.style.display = "none";
  registerForm.style.display = "inline";
  responseMessage.textContent = "";
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      responseMessage.style.color = "red";
      responseMessage.textContent = result.message;
    }
  } catch (error) {
    responseMessage.textContent = "An error occurred. Please try again later.";
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      responseMessage.style.color = "red";
      responseMessage.textContent = result.message;
    }
  } catch (error) {
    console.error("Error:", error);
    responseMessage.textContent = "An error occurred. Please try again later.";
  }
});
