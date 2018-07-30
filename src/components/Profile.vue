<template>
  <section class="section">
    <div class="container">
      <p>Coinbase: {{ this.$store.state.web3.coinbase }}</p>
      <p v-if="hasDelegate">
        My Delegate Address: {{ delegateAddress }}
        <button class="button is-danger" @click="removeDelegate">Remove Delegate</button>
      </p>
      <p v-if="isDelegateFor">I am delegates for {{ delegatesFor }}</p>
      <div class="field">
        <label class="label">Set Delegate</label>
        <div class="control">
          <input class="input" type="text" v-model="newDelegate" placeholder="New Delegate Address">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-link" @click="setDelegate(newDelegate)">Submit</button>
        </div>
      </div>

      <br />

      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" v-model="inputAddress" placeholder="Enter ETH Address">
        </div>
        <div class="control">
          <a class="button is-info" @click="getDelegate">Lookup Delegate</a>
        </div>
      </div>
      <p>Fetched Delegate Address: {{ fetchedDelegate }}</p>

      <div class="content"><h3 style="margin-top:50px;">User Transactions</h3></div>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Block #</th>
            <th>Event</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody v-if="hasTransactions">
          <TransactionFeed v-for="transaction in this.$store.state.transactions" :transaction="transaction" :key="transaction.id" />
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import TransactionFeed from './TransactionFeed.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Profile',
  components: { TransactionFeed },
  data () {
    return {
      loading: true,
      inputAddress: null,
      fetchedDelegate: 'None yet!',
      newDelegate: null
    }
  },

  computed: {
    hasTransactions() {
      return (this.$store.state.transactions.length > 0)
    },

    delegatesFor() {
      let addedAsDelegate = {}
      let removedAsDelegate = {}

      let asDelegates = []
      // get all events added as delegate
      this.$store.state.transactions.forEach((transaction) => {
        let delegate = transaction.returnValues.delegate
        let signer = transaction.returnValues.signer

        if ((transaction.event == 'Authorized') && (delegate.toLowerCase() == this.$store.state.web3.coinbase.toLowerCase())) {
          if (typeof addedAsDelegate[signer] == 'undefined') {
            addedAsDelegate[signer] = 1
          } else {
            addedAsDelegate[signer] ++
          }

        // get all events removed as delegate
        } else if ((transaction.event == 'Deauthorized') && (delegate.toLowerCase() == this.$store.state.web3.coinbase.toLowerCase())) {
          if (typeof removedAsDelegate[signer] == 'undefined') {
            removedAsDelegate[signer] = 1
          } else {
            removedAsDelegate[signer] ++
          }
        }
      })

      // remove the entries approriatly, in case a person is added and removed as delegate multiple times, we need to calculate if they are still delegate by tally up the times

      Object.entries(addedAsDelegate).forEach(
        ([key, count]) => {
          if (typeof removedAsDelegate[key] !== 'undefined') {
            if ((count - removedAsDelegate[key]) > 0) {
              asDelegates.push(key)
            }
          } else {
            asDelegates.push(key)
          }
        }
      );

      return (asDelegates.join(' ,'))

    },
    ...mapState([
      'delegateAddress'
    ]),

    hasDelegate() {
      return (this.delegateAddress != "0x0000000000000000000000000000000000000000")
    },
    isDelegateFor() {
      return (this.hasTransactions && (this.delegatesFor !== ''))
    }
  },

  methods: {
    async getDelegate () {
      this.fetchedDelegate = await this.$store.dispatch('getDelegate', this.inputAddress)
    },
    ...mapActions([
      'setDelegate',
      'removeDelegate'
    ]),
  },


  mounted() {
    this.$parent.navClass = 'navbar is-spaced has-shadow'
    this.$parent.logoSrc = '/static/etherSignText.svg'
  }
}
</script>
