const setDelegate = (state, address) => {
  return new Promise((resolve, reject) => {
    state.contractInstance().methods.authorize(address).send({from: state.web3.coinbase}
    ).on('receipt', (receipt) => {
      console.log('received the tx receipt')
      resolve(address)
    })
  });
};

export default setDelegate