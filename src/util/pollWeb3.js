let pollWeb3 = function (state) {
  setInterval(() => {
    if (state.web3.loaded && state.web3.isInjected) {
      state.web3.web3Instance().eth.getCoinbase((err, coinbase) => {
        if (coinbase.toLowerCase() !== state.web3.coinbase.toLowerCase()) {
          location.reload();
        }
      })

      // TODO: When the network ID changes, also reload page or display error when they switch off mainnet
      // state.web3.web3Instance().eth.net.getId((err, netwokId) => {
      //   if (netwokId !== state.web3.netwokId) {
      //     location.reload();
      //   }
      // })
    }
  }, 1000)
};

export default pollWeb3