//  document.getElementsByClassName("validate-form")[0]
document.getElementById("loginForm").addEventListener("submit", async event => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await login(email, password);
  redirect();
});
