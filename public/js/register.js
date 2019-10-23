// Password and confirm password match check
function passwordMatch() {
  if (
    document.getElementById("password").value ==
    document.getElementById("confirmPassword").value
  ) {
    document.getElementById("message").style.color = "green";
    document.getElementById("message").innerHTML = "Confirm Password matched";
  } else {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML =
      "Confirm Password doesn't match with password";
  }
}

var register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  if (
    document.getElementById("password").value ==
    document.getElementById("confirmPassword").value
  ) {
    new_user(email, password);
    write_user_to_db(user_info.uid, name, email, ""); //need await to wait for user_info promise to resolve
    redirect();
  }
}

//create user function (using write to database function)
var write_user_to_db = async (userId, name, email, imageUrl) => {
  await write_database("users/" + userId, {
    username: name,
    email: email,
    profile_picture: imageUrl
  });
};
