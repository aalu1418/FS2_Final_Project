// Get a reference to the database service
var database = firebase.database();

//write to database
const write_database = (location, payload) => {
  firebase
    .database()
    .ref(location)
    .set(payload);
};

//update database - https://firebase.google.com/docs/database/web/read-and-write
// payload includes location in object format
const update_database = payload => {
  firebase
    .database()
    .ref()
    .update(payload)
    .catch(error => console.log(error));
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
    snapshot.ref.getDownloadURL().then(downloadURL => {
      console.log(downloadURL);
      $("#avatar_img").attr("src", downloadURL);
    });
  });
};

//listener for file upload
//https://stackoverflow.com/questions/46988902/how-to-upload-image-to-firebase-cloud-storage-from-input-field
$("#avatar_load").change(obj => {
  const file_dat = obj.target.files[0];
  write_image(file_dat, file_dat.name, images_ref);
});
