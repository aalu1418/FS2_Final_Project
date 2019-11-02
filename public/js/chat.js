//global declarations for current chat
let current_chat_id;
let current_recipient_id;

window.onload = async () => {
  // console.log("..[user profiles].. " + data.key + " " + JSON.stringify(data));
  // user_info.profiles[data.key] = data.val();

  // console.log("on load..");
  // console.log(user_info);
  await check_user().then(redirect); //run command to get access to user_info
  user_profiles(); //get all user profiles
  new_user(); //something to check new user & create the corresponding conversations
  start_messages(); //get messages & chats
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

  setTimeout(() => {
    user_messages();

    const user = user_info.profiles[user_info.uid];
    //get profile picture depending on stored value
    const profile_image = image_check(user);
    $("#profile div img").attr("src", profile_image);
    $("#profile div p").text(user.username);
    setTimeout(() => {
      $("#contacts ul")
        .children()
        .first("li")
        .trigger("click"); //selects the first chat as the chat that opens on open
    }, timeout);
  }, timeout);
};

//create new database objects for conversation
const new_convo = recipient_id => {
  let payload = {};

  const chat_id = generate_id();

  //append user_id to chat_ids - timestamp used to organize order of chats
  payload["/chat_ids/" + user_info.uid + "/" + chat_id] = {
    timestamp: Date.now(),
    recipient: recipient_id
  };
  payload["/chat_ids/" + recipient_id + "/" + chat_id] = {
    timestamp: Date.now(),
    recipient: user_info.uid
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

//on send button click - send message
$("#send_message").click(event => {
  event.preventDefault();
  const msg_content = $("#sentMsgContent").val();
  if (msg_content) {
    // console.log("message sent");
    new_message(msg_content, current_chat_id);
  }
  $("#sentMsgContent").val("");
});

//on enter key - send message
$("#sentMsgContent").on("keypress", function(e) {
  if (e.which == 13) {
    const msg_content = $("#sentMsgContent").val();
    if (msg_content) {
      // console.log("message sent");
      new_message(msg_content, current_chat_id);
    }
    $("#sentMsgContent").val("");
  }
});

//send message as a part of a new conversation
const new_message = (text, chat_id) => {
  const current_timestamp = Date.now();
  let payload = {};
  //new message with the timestamp as the message number
  payload[
    "/conversations/" + chat_id.toString() + "/messages/" + current_timestamp
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

//get list of messages
const user_messages = () => {
  try {
    Object.keys(user_info.chats).forEach(key => {
      get_database(
        "/conversations/" + key.toString(),
        "timestamp",
        "child_added",
        data => {
          // console.log(key + " " + JSON.stringify(data));
          user_info.chats[key][data.key] = data.val();

          //show image previews on page load
          if (data.key === "messages") {
            const latest_message = Object.entries(data.val()).slice(-1)[0][1]
              .message;
            // https://stackoverflow.com/questions/13392463/jquery-select-all-element-with-custom-attribute
            $("li[chat_id=" + key + "]")
              .children()
              .children("div.meta")
              .children("p.preview")
              .html(latest_message);
          }
        }
      );
      get_database(
        "/conversations/" + key.toString(),
        "timestamp",
        "child_changed",
        data => {
          let chat_identifier;
          user_info.chats[key][data.key] = data.val();
          //insert function to generate UI if active chat
          const message_obj = Object.entries(data.val()).slice(-1)[0][1]; //convert to array, slice to get the last element at index 0, and the message obj at index 1
          if (key == current_chat_id) {
            //if new message in active chat

            const user_pic = image_check(user_info.profiles[user_info.uid]);
            const recipient_pic = image_check(
              user_info.profiles[current_recipient_id]
            );

            draw_message(message_obj, user_pic, recipient_pic); //creates message object
            $(".messages").animate({
              //forces scroll to stay at bottom
              scrollTop: $(".messages").prop("scrollHeight")
            });
          }
        }
      );
    });
  } catch (e) {
    console.log("[user_messages] "+e);
  }
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
      draw_chat(data);
    }
  );

  get_database(
    //occurs when new message is sent to user
    "/chat_ids/" + user_info.uid,
    "timestamp",
    "child_changed",
    data => {
      const active_check = $("#" + data.val().recipient).hasClass("active"); //check if already active
      $("#" + data.val().recipient).remove(); //remove elements
      draw_chat(data); //add element back in
      if (active_check) {
        //reapply active if was previously active
        $("#" + data.val().recipient).addClass("active");
      }
      //update the preview text
      $("#" + data.val().recipient + " div div .preview").html(
        user_info.chats[data.key].messages[data.val().timestamp].message
      );
      if (data.val().recipient != current_recipient_id) {
        //only bolds if the new message is in a different chat
        $("#" + data.val().recipient + " div div p").css("font-weight", "bold"); //bold the updated conversation on the side
      }
    }
  );
};

//function to draw the conversation item on left side
const draw_chat = data => {
  const recipient_id = data.val().recipient;
  const recipient_username = user_info.profiles[recipient_id].username;
  const profile_image = image_check(user_info.profiles[recipient_id]);

  //create html object and prepend
  $("#contacts ul").prepend(
    '<li class="contact" id="' +
      recipient_id +
      '" chat_id ="' +
      data.key +
      '"><div class="wrap"><img src="' +
      profile_image +
      '" alt="" /><div class="meta"><p class="name">' +
      recipient_username +
      '</p><p class="preview">message</p></div></div></li>'
  );
};

//  On click of available chat user's profile, corresponding message
// will open and remove the previous chat instance from UI
$("#contacts ul").click(event => {
  event.preventDefault();
  recipient_Uid = $(event.target).closest("li")[0].id;
  $(event.target)
    .closest("li")
    .addClass("active"); //set active design
  $(event.target)
    .closest("li")
    .siblings("li")
    .removeClass("active"); //clear active for other li elements
  // console.log(recipient_Uid);
  const recipient_username = user_info.profiles[recipient_Uid].username;
  // console.log(recipient_username);

  //Display corresponding username & picture
  //get profile picture depending on stored value
  let profile_image = image_check(user_info.profiles[recipient_Uid]);
  $("#currentChatUser img").attr("src", profile_image);

  $("#currentChatUser p").text(recipient_username);
  $(".content .messages ul").html(""); //clear messages

  //set current chat
  current_chat_id = $(event.target)
    .closest("li")
    .attr("chat_id"); //update current chat
  current_recipient_id = $(event.target)
    .closest("li")
    .attr("id"); //update current chat
  const current_messages = user_info.chats[current_chat_id].messages;

  if (current_messages) {
    //get profile pics
    const user_pic = image_check(user_info.profiles[user_info.uid]);
    const recipient_pic = image_check(user_info.profiles[recipient_Uid]);

    Object.keys(current_messages).forEach(key => {
      draw_message(current_messages[key], user_pic, recipient_pic);
    });
  }
  //https://stackoverflow.com/questions/10899632/jquery-make-div-always-scroll-to-bottom
  $(".messages").animate({ scrollTop: $(".messages").prop("scrollHeight") }); //scroll to bottom of chat
  $("#" + recipient_Uid + " div div p").removeAttr("style"); //remove bold when clicked
});

//create html object for each individual message
const draw_message = (msg_obj, user_pic, recipient_pic) => {
  const msg_class = msg_obj.sender == user_info.uid ? "sent" : "replies";
  const msg_img = msg_obj.sender == user_info.uid ? user_pic : recipient_pic;

  $(".content .messages ul").append(
    '<li class="' +
      msg_class +
      '"><img src="' +
      msg_img +
      '" alt="" /><p>' +
      msg_obj.message +
      "</p></li>"
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
    // console.log("check");
  }); //listener for any changes to user profiles
};

//runs if a new user is detected and creates conversations with all other users
var new_user = () => {
  get_snapshot("/chat_ids/" + user_info.uid).then(snapshot => {
    // console.log(snapshot.val());
    if (!snapshot.val()) {
      //if snapshot is empty (no conversations exist)
      Object.keys(user_info.profiles)
        .filter(item => item != user_info.uid)
        .forEach(id => new_convo(id));
    }
  });
};

//function to open overlay and specific section
const open_overlay = section => {
  $("#overlay").show();
  $("#frame").addClass("blurred");
  $(section).slideDown();
};

//function to close overlay and all sections
const close_overlay = () => {
  $("#user-profile").slideUp();
  $("#about-page").slideUp();
  $("#send-ethers-page").slideUp();
  $("#overlay").hide();
  $("#frame").removeClass("blurred");
};

//get information for profile page
const get_profile_page = () => {
  let profile_image;
  const user = user_info.profiles[user_info.uid];

  //write usernamme and email
  $("#profile-username").text(user.username);
  $("#profile-email").text(user.email);

  //get profile picture depending on stored value
  profile_image = image_check(user);
  $("#profile-img").attr("src", profile_image);

  //write public key if it exists
  // console.log(!user.public_key);
  if (user.public_key) {
    $("#profile-metamask").html("<p>" + user.public_key + "</p>");
  }
};

//launch profile page
$("#profile").click(() => {
  get_profile_page(); //get information for user profile page
  open_overlay("#user-profile");
});

//  Opens the send-ether-page on click of money icon button
$(".submitEther").click(() => {
  event.preventDefault();
  $("#txn-msg").html(""); //  clear any failed or success transaction message from send-ether-page
  $("#etherAmount").val(""); //  Reset the input field of entering ethers amount
  open_overlay("#send-ethers-page"); //  Opens the Ethers transactions page (i.e. send-ether-page)
});

// let etherAmt; //  global declaration of ethers to be sent
const displayTxnConfirmMsg = (transactionId, etherAmt) => {
  let msg_content;
  if (!transactionId) {
    $("#txn-msg")
      .text("Transaction not successful.")
      .css("color", "red");
    msg_content =
      "Transaction not successful<br> Attempted to send: " +
      etherAmt +
      " ether";
  } else {
    $("#txn-msg")
      .text("Transaction successful.")
      .css("color", "green");
    msg_content =
      "Transaction successful<br>Sent: " +
      etherAmt +
      " ether<br>Transaction id: " +
      transactionId.slice(0, transactionId.length / 2) +
      "<br>" +
      transactionId.slice(transactionId.length / 2);
  }

  if (msg_content) {
    new_message(msg_content, current_chat_id);
  }
};

//  Sending ethers from sender to receiver
const sendEthers = () => {
  const etherAmt = $("#etherAmount").val(); //  Setting the value of ether amount fetched from the input box

  //  Validation for not entering correct ethers amount.
  if (!etherAmt) {
    $("#txn-msg")
      .text("Please enter valid ether amount.")
      .css("color", "red");
  }

  const receiverAddress = user_info.profiles[current_recipient_id].public_key; //  Fetching the public key of the receiver from DB

  //  Validation if reveiver has public key for cryptocurrency transactions.
  if (!receiverAddress) {
    $("#txn-msg")
    .text("There is no public key found for the recipient.")
    .css("color", "red");
  }

  // Check if metamask is there or not and if there, then logged in or not.
  check_metamask().then(address => {
    if (address) {//if address is present
      //write to database if address is found
      if (!user_info.profiles[user_info.uid].public_key) { //write to database if not found
        write_database("/users/" + user_info.uid + "/public_key", address);
      }
      // console.log("receiver address: " + receiverAddress);
      send_ether(receiverAddress, etherAmt); // Sending ethers from Sender to Receiver's address.
    } else {
      $("#txn-msg")
        .html(
          'No web3 instance found. Please install <a href="https://metamask.io" target="_blank">Metamask</a>.'
        )
        .css("color", "red");
    }
  });

};

//listener to run send ethers
$("#sendEthers").click(() => {
  sendEthers();
});

//logout button listener
$("#logout").click(event => {
  event.preventDefault();
  localStorage.clear();
  logout();
  window.location.href = "/";
  s;
});

$("#about").click(() => {
  open_overlay("#about-page");
});

$("#overlay").click(event => {
  if (
    event.target.id === "about-page" ||
    event.target.id === "user-profile" ||
    event.target.id === "send-ethers-page"
  ) {
    close_overlay();
  }
});

$(document).keyup(function(e) {
  if (e.key === "Escape") {
    // escape key maps to keycode `27`
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
  var images_ref = storage_ref.child("profile_images/" + user_info.uid);

  write_image(file_dat, file_dat.name, images_ref)
    .then(snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        write_database(
          "/users/" + user_info.uid + "/profile_picture",
          downloadURL
        );
        $("#profile div #profile-img").attr("src", downloadURL) //change small profile picture
        // user_info.profiles[user_info.uid].profile_piscture = downloadURL;
        get_profile_page();
      });
    })
    .catch(error => console.log("[file upload error]: " + error));
});

//reset password button listener
const profile_password_reset = () => {
  password_reset(user_info.profiles[user_info.uid].email)
    .then(() => $("#profile-password").html("Reset Email Sent"))
    .catch(error => $("#profile-password").html("Reset Email Failed to Send"));
};

//checks if user image is present...otherwise returns default
const image_check = user_obj => {
  // console.log(user_obj);
  if (user_obj.profile_picture != "") {
    profile_image = user_obj.profile_picture;
  } else {
    profile_image = "/images/person-24px.svg";
  }

  return profile_image;
};
