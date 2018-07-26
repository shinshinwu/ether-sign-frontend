<template>
  <tr>
    <td><a :href="txUrl" target="_blank">{{ transaction.blockNumber }}</a></td>
    <td>{{ transaction.event }}</td>
    <td>
      <span v-if="documentSigning">
        <a :href="documentUrl" target="_blank">{{ transaction.returnValues.title }}</a> was signed by <a href="#">{{ transaction.returnValues.signer }}</a> on {{ transaction.returnValues.time | utcToDateTime }}
      </span>

      <span v-else>
        {{ transaction.event }} Delegate <a href="#">{{ transaction.returnValues.delegate }}</a>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TransactionFeed',
  props: ['transaction'],

  filters: {
    utcToDateTime: function (utc) {
      return (new Date(utc*1000)).toLocaleString()
    }
  },

  computed: {
    txUrl() {
      return `https://ropsten.etherscan.io/tx/${this.transaction.transactionHash}`
    },
    documentSigning() {
      return (this.transaction.event == 'DocumentSigned')
    },
    documentUrl() {
      return `/#/view?${this.transaction.returnValues.content}`
    }
  }
}
</script>