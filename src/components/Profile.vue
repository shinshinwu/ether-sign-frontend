<template>
  <div class="columns">
    <div class="is-8">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      inputAddress: null,
      fetchedDelegate: 'None yet!',
      newDelegate: null
    }
  },

  computed: mapState([
    'delegateAddress'
  ]),

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
