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

//get info from database (creates a listener)
// https://firebase.google.com/docs/database/web/lists-of-data
const get_database = (location, sort_param, type, callback) => {
  return firebase
    .database()
    .ref(location)
    .orderByChild(sort_param)
    .on(type, callback, error =>
      console.log("[firebase get] " + error.message)
    );
};

const get_snapshot = location => {
  return firebase
    .database()
    .ref(location)
    .once("value")
    .catch(error => console.log(error));
};

//write images to storage
const write_image = (file_dat, image_name, location_ref) => {
  const temp_ref = location_ref.child(image_name); //create temporary reference using image name
  return temp_ref.put(file_dat)
};
