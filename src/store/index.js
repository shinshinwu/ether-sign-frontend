import Vue from 'vue'
import Vuex from 'vuex'
import { getWeb3,
         pollWeb3,
         getContract,
         getDelegate,
         setDelegate
       } from '../util'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    web3: {},
    delegateAddress: null,
    contractInstance: null,
    transactions: []
  },
  mutations: {
    registerWeb3Instance (state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = Object.assign({}, payload, { loaded: true })
      state.web3 = result
      pollWeb3(state)
    },

    pollWeb3Instance (state, payload) {
      console.log('pollWeb3Instance mutation being executed', payload)
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
    },
    registerContractInstance (state, payload) {
      console.log('Registering contract constructor: ', payload)
      state.contractInstance = () => payload
    },
    registerDelegateAddress (state, payload) {
      state.delegateAddress = payload
    }
  },
  actions: {
    pollWeb3 ({commit}, payload) {
      console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload)
    },
    async registerWeb3 ({commit}) {
      console.log('registerWeb3 Action being executed')
      commit('registerWeb3Instance', await getWeb3)
    },
    async getContractInstance ({commit}) {
      console.log('getting contract instance')
      commit('registerContractInstance', await getContract)
    },
    async getDelegate({state, commit}, address) {
      if (address == null) {
        commit('registerDelegateAddress', await getDelegate(state, state.web3.coinbase))
      } else {
        return await getDelegate(state, address)
      }
    },
    async setDelegate({state, commit}, address) {
      commit('registerDelegateAddress', await setDelegate(state, address))
    }
  }
})
