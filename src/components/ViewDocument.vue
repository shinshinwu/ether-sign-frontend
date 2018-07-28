<template>
  <div class="columns">
    <div class="column">
      <div v-if="contractLoaded" class="content">
        <div v-if="hasInput">
          <h3 class="has-text-primary">Decompressed Output</h3>
          <div class="output" v-html="decompressedOutput"></div>

          <Signer v-if="existingDoc" />
        </div>
      </div>

      <div v-else class="content">
        <h3>Loading...</h3>
      </div>

      <div v-if="documentError" class="content"><h3 class="has-text-danger">Document Does not exist!</h3></div>
    </div>
  </div>
</template>

<script>
import Signer from './Signer.vue'

export default {
  name: 'ViewDocument',
  components: { Signer },
  data () {
    return {
      existingDoc: false,
      hasInput: false,
      decompressedOutput: null,
      documentError: false
    }
  },

  computed: {
    // there seem to be a race when this child component mounted the parent havent't finished fetching everything yet so need to wait
    contractLoaded() {
      if (this.$store.state.contractInstance !== null) {
        this.decompressInput()
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    async decompressInput() {
      // need to get rid of the # router to user native js query parser
      var sanitizedUrl = window.location.href.split('/#/').join('/')
      var params = new URL(sanitizedUrl).searchParams;
      var hash = ''

      if (params.get('id') !== null) {
        // if the url is passed a document ID, fetch it from the contract event and display
        await this.$store.dispatch('getDocument', params.get('id'))
        if (this.$store.state.document == null) {
          this.documentError = true
          return
        } else {
          hash = this.$store.state.document.returnValues.content
          this.existingDoc = true
        }
      } else if (params.get('c') !== null) {
        // if the url is passed with document content, decompress and display
        // convert base64 string back to array
        hash = decodeURIComponent(params.get('c')).split(' ').join('+')
      }

      console.log('parsed hash is ', hash)
      var raw = atob(hash)
      var rawLength = raw.length
      var array = new Uint8Array(new ArrayBuffer(rawLength))

      for(var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }

      LZMA.decompress(array, (result, error) => {
        if (!(typeof result === 'string')) result = new Uint8Array(result)
        if (error) console.error(error);
        this.decompressedOutput = result
        this.hasInput = true
      });
    }
  }
}
</script>

<style scoped>
  h3 {
    margin: 30px 0;
  }

  .output {
    padding: 30px 50px;
    border: 1px dashed #b7b7b7;
    margin-bottom: 50px;
  }
</style>