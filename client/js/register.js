// Password and confirm password match check
function passwordMatch(){
    if (document.getElementById("password").value == document.getElementById('confirmPassword').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Confirm Password matched';
    }
    else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Confirm Password doesn\'t match with password';
    }
}

// document.getElementsByClassName("validate-form")[0]
document.getElementById("registerForm").addEventListener('submit', function(event){
    event.preventDefault();

    alert("Registration successful..!!");
    window.location.href = "./chat.html";
})