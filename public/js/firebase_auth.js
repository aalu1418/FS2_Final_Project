//logging in
var login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.log(errorCode = ": " + errorMessage);
      print_error(error.message)
    });
};

//create user
var new_user = (email, password) => {
  logout() //returns error if a user is already logged in (preemptive logout) - might be removed in the future
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password).then(() => {
      console.log("[new user] successs");
    })
    .catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      print_error(error.message);
      // ...
    });
};

//error printing
var print_error = message => {
  document.getElementById("error-text").innerHTML = message;
};
