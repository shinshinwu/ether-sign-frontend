<template>
  <div class="columns">
    <div class="column">
      <div class="content">
        <div v-if="hasInput">
          <h3 class="has-text-primary">Decompressed Output</h3>
          <div class="output" v-html="decompressedOutput"></div>
        </div>

        <h3 v-else>Add something to the URL string to get started!</h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'ViewDocument',

  data () {
    return {
      hasInput: false,
      compressedInput: null,
      decompressedOutput: null
    }
  },

  methods: {

    decompressInput() {
      // convert base64 string back to array
      var hash = decodeURIComponent(window.location.hash.substring(1).split('/view?')[1]).split(' ').join('+')
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
  },

  mounted(){
    this.decompressInput()
  },
}
</script>

<style scoped>
  h3 {
    margin: 30px 0;
  }

  .output {
    padding: 30px 50px;
    border: 1px dashed #b7b7b7;
  }
</style>