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
