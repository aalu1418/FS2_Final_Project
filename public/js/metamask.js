//gets the public key when "connect to metamask" button is pressed
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
      await ethereum.enable(); //starts metamask & connects to the webpages
    }
    return ethereum.selectedAddress;
  } else {
    return undefined;
  }
};

//send ether to specific address
const send_ether = (to_address, amt_eth) => {
  //https://ethereum.stackexchange.com/questions/42929/send-payment-from-wallet-using-web3
  const amt_wei = web3.toWei(amt_eth, "ether");
  console.log(amt_wei);
  web3.eth.sendTransaction({to:to_address, value:amt_wei}, (err, transaction) => {
    if (!err) {
      console.log(transaction);
    }
  })

  // web3.eth.sendTransaction({ to: to_address, value: amt_wei }, async (err, transaction) => {
  //   let promise = new Promise((res, rej) => {
  //     setTimeout(() => {if (!err){
  //       return transaction;
  //     }}, 30000);
  //   });
  //   if (!err) {
  //     console.log(transaction);
  //     let result = await promise;
  //     console.log("result: " + result)
  //   }
  // })
}
