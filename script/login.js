document
  .getElementById("login-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
      alert("login successful");
      window.location.assign("home.html");
    } else {
      return;
    }
  });
