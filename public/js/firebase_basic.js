// Set the configuration for your app
const config = {
  apiKey: "AIzaSyBs08Qeq09jMU25HueM31QuiT-ocA_cl3A",
  authDomain: "gb-fullstackii-project.firebaseapp.com",
  databaseURL: "https://gb-fullstackii-project.firebaseio.com",
  projectId: "gb-fullstackii-project",
  storageBucket: "gb-fullstackii-project.appspot.com",
  messagingSenderId: "286346621575",
  appId: "1:286346621575:web:8944a1391192a377023e22"
};

//initialize if firebase app is not already intialized
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//get login information
let user_info;
const check_user = () =>
  new Promise(resolve => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          // User is signed in.
          user_info = user;
          resolve();
        }
      },
      function(error) {
        console.log(error);
      }
    );
  });

//redirect to chat page based if user is logged in or not
var redirect = () => {
  if (user_info) {
    console.log("[login success]");
    window.location.href = "./chat.html";
  } else {
    console.log("[login failed]");
  }
};

//logout - included in basic to allow logout from any page
const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(
      () => {
        console.log("[logout success]");
        //clear user_info object
        user_info = undefined;
      },
      error => {
        console.log("[logout error] " + error);
        //clear user_info object
        // user_info = undefined;
      }
    );
};
