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

// Get a reference to the database service
var database = firebase.database();

//write to database
function create_user(userId, name, email, imageUrl) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
}

//get info from database
function return_user(userId) {
  return firebase
    .database()
    .ref("/users/" + userId)
    .once("value")
    .then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || "Anonymous";
      console.log(snapshot.val());
      // ...
    });
}
