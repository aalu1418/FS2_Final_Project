check_user(); //run command to get access to user_info

//create new database objects for conversation
const new_convo = recipient_id => {
  let payload = {};

  const chat_id = generate_id();

  //append chat id to user's id
  payload["/chat_ids/" + user_info.uid + "/" + chat_id] = true;
  payload["/chat_ids/" + recipient_id + "/" + chat_id] = true;

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

  return number[0].toString() + Math.floor(Date.now()/number[0]);
};

//send message as a part of a new conversation
const new_message = (text, chat_id) => {
  let payload = {};
  //new message with the timestamp as the message number
  payload["/conversations/" + chat_id.toString() + "/messages/" + Date.now()] = {
    sender: user_info.uid,
    message: text,
  };
  console.log(payload);
  update_database(payload);
};

//receive messages

//get users list of chats

//get all user profiles
