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
let user_info; //globally defined object used for storage & user auth
const check_user = () => {
  //promise for getting user_info
  let get_user = new Promise(resolve => {
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

  //timeout promise
  let get_timeout = new Promise(resolve => setTimeout(resolve, 1000))

  //returns the first one finished - creates a timeout in case get_user hangs (occurs when user is not logged in)
  return Promise.race([get_user, get_timeout])
}

//redirect to chat page based if user is logged in or not
var redirect = () => {
  // console.log("checking redirect");
  if (user_info) { //if user is logged in
    // console.log("[login success]");
    if (window.location.pathname != "/chat") { //redirect to chat if not on chat
      window.location.href = "./chat";
    }
  } else {
    if (window.location.pathname == "/chat") { //redirect to login if not logged in
      window.location.href = "/";
    }
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
