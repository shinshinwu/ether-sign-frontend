<template>
  <div>
    <h1>Welcome to homepage!</h1>
    <div class="columns m--margin-top-50">
      <div v-if="loading" class="column has-text-centered">
        <h1>Loading web3...</h1>
      </div>

      <div v-else class="column has-text-centered">
        <p>Current Network: {{ this.$store.state.web3.networkId }}</p>
        <p>Coinbase: {{ this.$store.state.web3.coinbase }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loading: true
    }
  }
}

</script>