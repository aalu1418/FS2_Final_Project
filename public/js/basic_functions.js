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
const create_user = (userId, name, email, imageUrl) => {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
};

//get info from database
const return_user = userId => {
  return firebase
    .database()
    .ref("/users/" + userId)
    .once("value")
    .then(snapshot => {
      var username = (snapshot.val() && snapshot.val().username) || "Anonymous";
      console.log(snapshot.val());
      // ...
    });
};

// Get a reference to the storage service
var storage = firebase.storage();
var storage_ref = storage.ref();
var images_ref = storage_ref.child("profile_images");

//write images to storage
const write_image = (file_dat, image_name, location_ref) => {
  const temp_ref = location_ref.child(image_name); //create temporary reference using image name
  temp_ref.put(file_dat).then(snapshot => {
    snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log(downloadURL);
    });
  });
};

//listener for file upload
//https://stackoverflow.com/questions/46988902/how-to-upload-image-to-firebase-cloud-storage-from-input-field
$("#avatar").change(obj => {
  const file_dat = obj.target.files[0];
  write_image(file_dat, file_dat.name, images_ref);
});
