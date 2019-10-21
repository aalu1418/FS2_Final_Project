//  document.getElementsByClassName("validate-form")[0]
document.getElementById("loginForm").addEventListener('submit', function(event) {
    event.preventDefault();

    alert("Login successfull..!!");
    window.location.href = "./chat.html";
})
