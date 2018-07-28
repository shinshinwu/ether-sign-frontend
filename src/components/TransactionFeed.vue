<template>
  <tr>
    <td><a :href="txUrl" target="_blank">{{ transaction.blockNumber }}</a></td>
    <td>{{ transaction.event | addStringSpace }}</td>
    <td>
      <span v-if="documentSigning">
        <a :href="documentUrl">{{ transaction.returnValues.title }}</a> was signed by <a href="#">{{ transaction.returnValues.signer }}</a> on {{ transaction.returnValues.time | utcToDateTime }}
      </span>

      <span v-if="addedSigner">
        Document has a new signature from <a href="#">{{ transaction.returnValues.signer }}</a> on {{ transaction.returnValues.time | utcToDateTime }}
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
    },
    addStringSpace: function (string) {
      return (string.replace(/([A-Z])/g, ' $1').trim())
    }
  },

  computed: {
    txUrl() {
      return `https://ropsten.etherscan.io/tx/${this.transaction.transactionHash}`
    },
    documentSigning() {
      return (this.transaction.event == 'DocumentSigned')
    },
    addedSigner() {
      return (this.transaction.event == 'SignerAdded')
    },
    documentUrl() {
      return `/#/view?id=${this.transaction.returnValues.documentId}`
    }
  }
}
</script>