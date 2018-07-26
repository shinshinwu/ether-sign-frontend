const getUserEvents = (state) => {
  return new Promise((resolve, reject) => {

    var topic = "0x000000000000000000000000" + state.web3.coinbase.toLowerCase().split('0x')[1]

    state.contractInstance().getPastEvents("allEvents", {
      fromBlock: 0, // TODO: update this when going prod
      toBlock: 'latest',
      topics: [null, topic]
    }, (err, events) => {
      resolve(events)
    })
  })
};

export default getUserEvents