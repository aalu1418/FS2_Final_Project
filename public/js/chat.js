msgContentContainer = document.getElementsByClassName('content');
// msgContentContainer
currentChatUser = document.getElementById('currentChatUser').innerText;
console.log("current user: " + currentChatUser);

// function msgSent(event){
//     event.preventDefault();
//     console.log("coming here..")
// }

// document.getElementById('msgSent').addEventListener('click', function(event) {
//     event.preventDefault();

//     sentMsgContent = document.getElementById('sentMsgContent').innerText;
//     console.log("Msg sent: " + sentMsgContent);
// })

// function msgsSent(){
//     event.preventDefault();

//     console.log("sabesjdnkejandek....");
//     sentMsgContent = document.getElementById('sentMsgContent').value;
//     console.log("Msg sent: " + sentMsgContent);
// }

// function test(){
//     event.preventDefault();

//     console.log("entering test..!!");
//     randommsg = document.getElementById('textId').value;
//     console.log("text msg: " + randommsg);
// }

userMsgsDict = {};      // Key: Current Chat user and Value: Sent Messages array to this current chat user
sendMsgsArr = [];       // Message objects array
function newMessage() {
    message = $(".message-input input").val();
    console.log("getting msg: " + message);

    //Message Collection and creating object:
    ethersToSent = '';
    receiverAddress = '';
    if (message.trim != "") {
        if (message.length > 0){
            if (message.includes(",")) {
                ethersToSent = message.split(",")[0];
                receiverAddress = message.split(',')[1];

                //  Message should contain Count of Ethers to be Send
                if ($.trim(ethersToSent) == '') {
                    errorMessage = "Please enter Number of Ethers to be sent and message should be in comma separated format like \
                    'xxx ETH, xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'";
                    $('<li class="replies"><img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" /><p>' + errorMessage + '</p></li>').appendTo($('.messages ul'));
                    $('.message-input input').val(null);
                    $('.contact.active .preview').html('<span>You: </span>' + message);
                    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
                }

                //  Message should contain Receiver's Address
                else if ($.trim(receiverAddress) == '') {
                    errorMessage = "Please enter Receiver's address where you want to send Ethers and message should be in comma separated format like \
                    'xxx ETH, xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'";
                    $('<li class="replies"><img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" /><p>' + errorMessage + '</p></li>').appendTo($('.messages ul'));
                    $('.message-input input').val(null);
                    $('.contact.active .preview').html('<span>You: </span>' + message);
                    $(".messages").animate({ scrollTop: $(document).height() }, "fast");

                    // If both the things are there, then message should be from Sent user side.
                } else {
                    console.log("ethers to sent: " + $.trim(ethersToSent));
                    console.log("wallet address: " + $.trim(receiverAddress));
                    msgObj = {};
                    msgObj["ethersToSent"] = $.trim(ethersToSent);
                    msgObj["receiverAddress"] = $.trim(receiverAddress);
                    sendMsgsArr.push(msgObj);

                    $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p> Ethers to Sent: ' + ethersToSent + '</p><p> Receiver Address: ' + receiverAddress + '</p></li>').appendTo($('.messages ul'));
                    $('.message-input input').val(null);
                    $('.contact.active .preview').html('<span>You: </span>' + message);
                    $(".messages").animate({ scrollTop: $(document).height() }, "fast");

                    userMsgsDict[currentChatUser] = sendMsgsArr;
                    console.log(userMsgsDict['Harvey Specter']);
                }

            }
            else {
                errorMessage = "Please enter message in comma separated format like \
                'xxx ETH, xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'";
                    $('<li class="replies"><img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" /><p>' + errorMessage + '</p></li>').appendTo($('.messages ul'));
                    $('.message-input input').val(null);
                    $('.contact.active .preview').html('<span>You: </span>' + message);
                    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
            }
        }

    }
    // userMsgsDict[currentChatUser] = sendMsgsArr;
    // console.log(userMsgsDict['Harvey Specter']);

    Object.keys(userMsgsDict).forEach((key, index) => {
        // console.log("dict msg: " + userMsgsDict[key]);
    })

    if ($.trim(message) == '') {
        return false;
    }
    // $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
    // $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p> Ethers to Sent: ' + ethersToSent + '</p><p> Receiver Address: ' + receiverAddress + '</p></li>').appendTo($('.messages ul'));
    // $('.message-input input').val(null);
    // $('.contact.active .preview').html('<span>You: </span>' + message);
    // $(".messages").animate({ scrollTop: $(document).height() }, "fast");

};

$('.submit').click(function () {
    newMessage();
});

$(window).on('keydown', function (e) {
    if (e.which == 13) {
        newMessage();
        return false;
    }
});



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
