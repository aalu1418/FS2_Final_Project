//check if user is logged in -> redirect to chat if they are
window.onload = async () => {
  await check_user().then(redirect); //run command to get access to user_info
};

//form submission for login
document.getElementById("loginForm").addEventListener("submit", async event => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  login(email, password);
  await check_user().then(redirect); //redirects when authentication is verified
});

//forgot passowrd button
$("#psswrd-reset").click(event => {
  event.preventDefault();
  const email = $("#email").val();

  password_reset(email).then(()=> {
    print_error("Check your email for password reset.")
  }).catch(error => {
    print_error(error.message)
  })
})
