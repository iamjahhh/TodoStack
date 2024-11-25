const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const responseMessage = document.getElementById("responseMessage");
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

loginButton.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    responseMessage.textContent = "";
});

registerButton.addEventListener("click", () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    responseMessage.textContent = "";
});

const handleFormSubmission = async (form, endpoint) => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
            window.location.href = "/dashboard";
        } else {
            responseMessage.textContent = result.message || "Error occurred";
        }
    } catch (error) {
        responseMessage.textContent = "Something went wrong, please try again.";
    }
};

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmission(loginForm, "/login");
});

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmission(registerForm, "/register");
});
