const signDocument = (state, args) => {
  return new Promise((resolve, reject) => {
    // signDocument(string _title, string _content, address _signer)
    state.contractInstance().methods.signDocument(
      args.title, args.content, args.signer
    ).send({from: state.web3.coinbase}
    ).on('receipt', (receipt) => {
      console.log('received the tx receipt')
      resolve(receipt)
    })
  });
};

export default signDocument