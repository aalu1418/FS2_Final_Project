check_user(); //run command to get access to user_info

//create new database objects for conversation
const new_convo = recipient_id => {
  let payload = {};

  const chat_id = generate_id();

  //append user_id to chat_ids - timestamp used to organize order of chats
  payload["/chat_ids/" + user_info.uid + "/" + chat_id] = {
    timestamp: Date.now()
  };
  payload["/chat_ids/" + recipient_id + "/" + chat_id] = {
    timestamp: Date.now()
  };

  update_database(payload); //need to update databse with chat id first to allow write for actual chat

  //create proper conversation object
  payload["/conversations/" + chat_id] = {
    [user_info.uid]: true,
    [recipient_id]: true
  };
  update_database(payload);
};

//create a new chat ID (simple key)
const generate_id = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/crypto
  let number = new Uint8Array(1);
  window.crypto.getRandomValues(number);

  return number[0].toString() + Math.floor(Date.now() / number[0]);
};

//send message as a part of a new conversation
const new_message = (text, chat_id) => {
  const current_timestamp = Date.now();
  let payload = {};
  //new message with the timestamp as the message number
  payload[
    "/conversations/" + chat_id.toString() + "/messages/" + Date.now()
  ] = {
    sender: user_info.uid,
    message: text,
    timestamp: current_timestamp
  };

  //update timestamps on chats for each user
  get_snapshot("/conversations/" + chat_id).then(snapshot => {
    //get snapshot used to get recipient_id
    const key_vals = Object.keys(snapshot.val());
    const recipient_id = key_vals.filter(
      elem => elem != user_info.uid && elem != "messages"
    );
    write_database(
      "/chat_ids/" + recipient_id + "/" + chat_id.toString() + "/timestamp",
      current_timestamp
    );
    write_database(
      "/chat_ids/" + user_info.uid + "/" + chat_id.toString() + "/timestamp",
      current_timestamp
    );
  });

  // console.log(payload);
  update_database(payload);
};

//start the chats & messages
const start_messages = () => {
  let timeout;
  if (!user_info.chats) {
    user_chats(); //call user_chats to create user_info.chats if necessary
    timeout = 1000; //need a delay before next function because user_chats does not return a promise
  } else {
    timeout = 0;
  }

  setTimeout(user_messages, timeout);
};

//get list of messages
const user_messages = () => {
  Object.keys(user_info.chats).forEach(key => {
    get_database(
      "/conversations/" + key.toString() + "/messages",
      "timestamp",
      "child_added",
      data => {
        console.log(key + " " + JSON.stringify(data));
        user_info.chats[key][data.key] = data.val();

        //insert function to generate UI
      }
    );
  });
};

//get users list of chats
const user_chats = () => {
  get_database(
    "/chat_ids/" + user_info.uid,
    "timestamp",
    "child_added",
    data => {
      console.log("[user chats] " + data.key);

      try {
        user_info.chats[data.key] = {}; //will push to obejct if it already exists
      } catch (e) {
        user_info.chats = {}; //will create object if it doesn't exist
        user_info.chats[data.key] = {};
      }

      //insert function to generate UI
    }
  );
};

//get all user profiles
const user_profiles = () => {
  get_database("/users", "child_added", data => {
    console.log("[user profiles] " + data.key + " " + JSON.stringify(data));
    try {
      user_info.profiles[data.key] = data.val(); //will make a key/value pair if object exists
    } catch (e) {
      user_info.profiles = {}; //create object
      user_info.profiles[data.key] = data.val(); //make key/value pair after object is created
    }
  });
};
