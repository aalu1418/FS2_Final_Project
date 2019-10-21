//moved from index.html
document.addEventListener("DOMContentLoaded", function() {
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  //
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  try {
    let app = firebase.app();
    let features = ["auth", "database", "messaging", "storage"].filter(
      feature => typeof app[feature] === "function"
    );
    document.getElementById(
      "load"
    ).innerHTML = `Firebase SDK loaded with ${features.join(", ")}`;
  } catch (e) {
    console.error(e);
    document.getElementById("load").innerHTML =
      "Error loading the Firebase SDK, check the console.";
  }
});

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
initApp = function() {
  firebase.auth().onAuthStateChanged(
    function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
          document.getElementById("sign-in-status").textContent = "Signed in";
          document.getElementById("sign-in").textContent = "Sign out";
          document.getElementById(
            "account-details"
          ).textContent = JSON.stringify(
            {
              displayName: displayName,
              email: email,
              emailVerified: emailVerified,
              phoneNumber: phoneNumber,
              photoURL: photoURL,
              uid: uid,
              accessToken: accessToken,
              providerData: providerData
            },
            null,
            "  "
          );
        });
      } else {
        // User is signed out.
        document.getElementById("sign-in-status").textContent = "Signed out";
        document.getElementById("sign-in").textContent = "Sign in";
        document.getElementById("account-details").textContent = "null";
      }
    },
    function(error) {
      console.log(error);
    }
  );
};

//logout
const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(
      () => {
        console.log("[logout success]");
      },
      error => {
        console.log("[logout error] " + error);
      }
    );
};
