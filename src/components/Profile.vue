<template>
  <div class="container">
    <p>Coinbase: {{ this.$store.state.web3.coinbase }}</p>
    <p>My Delegate Address: {{ delegateAddress }}</p>

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
    ...mapState([
      'delegateAddress'
    ])
  },

  methods: {
    async getDelegate () {
      this.fetchedDelegate = await this.$store.dispatch('getDelegate', this.inputAddress)
    },
    ...mapActions([
      'setDelegate'
    ]),
  }
}
</script>
