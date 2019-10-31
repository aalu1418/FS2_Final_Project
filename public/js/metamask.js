const get_publickey = () => {
  check_metamask().then((address) => {
    if (address) {
      $("#profile-metamask").text(address);
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
