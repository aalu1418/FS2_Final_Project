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
  if ($.trim(message) != "") {
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
  else {
    errorMessage = "Please enter message in comma separated format like \
            'xxx ETH, xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'";
    $('<li class="replies"><img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" /><p>' + errorMessage + '</p></li>').appendTo($('.messages ul'));
    $('.message-input input').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
  }
  // userMsgsDict[currentChatUser] = sendMsgsArr;
  // console.log(userMsgsDict['Harvey Specter']);

  Object.keys(userMsgsDict).forEach((key, index) => {
    // console.log("dict msg: " + userMsgsDict[key]);
  })

  if ($.trim(message) == '') {
    return false;
  }
};

$('.submit').click(function () {
  event.preventDefault();
  newMessage();
});

$(window).on('keydown', function (e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});


//create new database objects for conversation
const new_convo = recipient_id => {
  let payload = {};

  const chat_id = generate_id();

  //append user_id to chat_ids - timestamp used to organize order of chats
  payload["/chat_ids/" + user_info.uid + "/" + chat_id] = {
    timestamp: Date.now(),
    recipient: recipient_id,
  };
  payload["/chat_ids/" + recipient_id + "/" + chat_id] = {
    timestamp: Date.now(),
    recipient: user_info.uid,
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
  // debugger;
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
      "/conversations/" + key.toString(),
      "timestamp",
      "child_added",
      data => {
        // console.log(key + " " + JSON.stringify(data));
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
      // console.log("[user chats] " + data.key);

      try {
        user_info.chats[data.key] = {}; //will push to obejct if it already exists
      } catch (e) {
        user_info.chats = {}; //will create object if it doesn't exist
        user_info.chats[data.key] = {};
      }

      //insert function to generate UI
      // console.log(data.val().recipient);
      const recipient_id = data.val().recipient;
      const recipient_username = user_info.profiles[recipient_id].username;

      $('#contacts ul').prepend('<li class="contact"><div class="wrap"><span class="contact-status online"></span><img src="http://emilcarlsson.se/assets/louislitt.png" \
      alt="" /><div class="meta"><p class="name">' + recipient_username + '</p><p class="preview">' + "message" + '</p></div></div>\
      </li>');
    }
  );
};

//get all user profiles
const user_profiles = () => {
  get_database("/users", "username", "child_added", data => {
    // console.log("[user profiles] " + data.key + " " + JSON.stringify(data));
    try {
      user_info.profiles[data.key] = data.val(); //will make a key/value pair if object exists
    } catch (e) {
      user_info.profiles = {}; //create object
      user_info.profiles[data.key] = data.val(); //make key/value pair after object is created
    }
  });
  get_database("/users", "username", "child_changed", data => {
    user_info.profiles[data.key] = data.val();
  });//listener for any changes to user profiles
};

//  complete this by getting the users from the db (if any) and display the users on the front end..
window.onload = async function () {
  // console.log("..[user profiles].. " + data.key + " " + JSON.stringify(data));
  // user_info.profiles[data.key] = data.val();

  console.log("on load..");
  // console.log(user_info);
  await check_user(); //run command to get access to user_info
  user_profiles(); //get all user profiles
  new_user();//something to check new user & create the corresponding conversations
  start_messages(); //get messages & chats
}

var new_user = () => {
  get_snapshot("/chat_ids/"+user_info.uid).then(snapshot => {
    // console.log(snapshot.val());
    if (!snapshot.val()){
      Object.keys(user_info.profiles).filter(item => item != user_info.uid).forEach(id => new_convo(id))
    }
  })
}

document.getElementById('logout').addEventListener('click', function() {
  event.preventDefault();
  localStorage.clear();
  logout();
  window.location.href = "./login.html";
})

const open_overlay = (section) => {
  $("#overlay").show();
  $("#frame").addClass("blurred");
  $(section).slideDown();
}

const close_overlay = () => {
  $("#user-profile").slideUp();
  $("#overlay").hide();
  $("#frame").removeClass("blurred");
}

const get_profile_page = () => {
  let profile_image;

  $("#profile-username").text(user_info.profiles[user_info.uid].username)
  $("#profile-email").text(user_info.profiles[user_info.uid].email)

  if (user_info.profiles[user_info.uid].profile_picture != "") {
    profile_image = user_info.profiles[user_info.uid].profile_picture;
  } else {
    profile_image = "/images/person-24px.svg";
  }

  $("#profile-img").attr("src", profile_image)
}

$("#profile").click(() => {
  get_profile_page(); //get information for user profile page
  open_overlay("#user-profile");
})

$("#about").click(() => {
  open_overlay("#about-page");
})

$(document).keyup(function(e) {
     if (e.key === "Escape") { // escape key maps to keycode `27`
        close_overlay();
    }
});

//listener for file upload
//https://stackoverflow.com/questions/46988902/how-to-upload-image-to-firebase-cloud-storage-from-input-field
$("#profile_pic_load").change(obj => {
  const file_dat = obj.target.files[0];

  // Get a reference to the storage service
  var storage = firebase.storage();
  var storage_ref = storage.ref();
  var images_ref = storage_ref.child("profile_images/"+user_info.uid);

  write_image(file_dat, file_dat.name, images_ref).then(snapshot => {
    snapshot.ref.getDownloadURL().then(downloadURL => {
      write_database("/users/"+user_info.uid+"/profile_picture", downloadURL);
      // user_info.profiles[user_info.uid].profile_piscture = downloadURL;
      get_profile_page();
    });
  }).catch(error => console.log("[file upload error]: " + error));
});

const profile_password_reset = () => {
  password_reset(user_info.profiles[user_info.uid].email)
    .then(() => $("#profile-password").html("Reset Email Sent"))
    .catch(error => $("#profile-password").html("Reset Email Failed to Send"));
}
