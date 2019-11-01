const get_publickey = () => {
  check_metamask().then((address) => {
    if (address) {
      $("#profile-metamask").text(address);
      write_database("/users/" + user_info.uid + "/public_key", address)
    } else {
      $("#profile-metamask").html(
        'No web3 instance found. Please install <a href="https://metamask.io" target="_blank">Metamask</a>.'
      );
    }
  });
};

//returns a promise
const check_metamask = async () => {
  if (window.ethereum) {
    //if metamask present
    console.log(ethereum.selectedAddress);
    if (!ethereum.selectedAddress) {
      await ethereum.enable();
    }
    return ethereum.selectedAddress;
  } else {
    return undefined;
  }
};

const send_ether = (to_address, amt_eth) => {
  //https://ethereum.stackexchange.com/questions/42929/send-payment-from-wallet-using-web3
  const amt_wei = web3.toWei(amt_eth, "ether");
  console.log(amt_wei);
  web3.eth.sendTransaction({to:to_address, value:amt_wei}, (err, transaction) => {
    if (!err) {
      console.log(transaction);
      displayTxnConfirmMsg(transaction);
    } else {
      console.log("txn: " + transaction);
      displayTxnConfirmMsg(transaction);
    }
  })
}
