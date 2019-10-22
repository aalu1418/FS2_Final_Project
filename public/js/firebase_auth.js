//logging in
const login = (email, password) => {
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
const new_user = (email, password, fullname) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
};
