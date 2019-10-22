//  document.getElementsByClassName("validate-form")[0]
document.getElementById("loginForm").addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await login(email, password);
    redirect();

})

//redirect to chat page based if user is logged in or not
var redirect = () => {
  if (user_info) {
    console.log("[login success]");
    window.location.href = "./chat.html";
  } else {
    console.log("[login failed]");
  }
}

var print_error = message => {
  document.getElementById("error-text").innerHTML = message;
}
