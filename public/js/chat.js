check_user() //run command to get access to user_info

//create new database objects for conversation
const new_convo = (recipient_id) => {
  let payload = {};

  const chat_id = 0;

  //append chat id to user's id
  payload["/chat_ids/"+user_info.uid+"/"+chat_id] ={
    [chat_id] : true,
  };
  payload["/chat_ids/"+recipient_id+"/"+chat_id] ={
    [chat_id] : true,
  };

  update_database(payload); //need to update databse with chat id first to allow write for actual chat

  //create proper conversation object
  payload["/conversations/"+chat_id] = {
    [user_info.uid] : true,
    [recipient_id] : true,
  }
  update_database(payload);
}

//send message as a part of a new conversation
const new_message = (text, chat_id) => {
  let payload = {};
  //new message with the timestamp as the message number
  payload["/conversations/"+chat_id+"/messages/"+Date.now()] = {
    sender: user_info.uid,
    timestamp: Date.now(),
    message: text,
  }
  update_database(payload);
}
