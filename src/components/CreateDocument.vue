<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">

          <div class="columns">
            <div class="column">
              <div class="control" id="editor">
                <textarea v-model="uncompressedInput" class="textarea" placeholder="markdown format"></textarea>
              </div>
            </div>

            <div class="column">
              <div class="content">
                <div v-html="compiledMarkdown"></div>
              </div>
            </div>
          </div>

          <button class="button is-link" @click="compressInput">Generate Share URL</button>

          <div class="content url-output">
            <h3>Share URL Output</h3>
            <blockquote style="overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;">{{ this.compressedOutput }}</blockquote>
            <a :href="compressedURL" target="_blank" style="overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;">{{ compressedURL }}</a>
          </div>

          <div class="content"><h3>Document Signing</h3></div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Document Title</label>
                <div class="control">
                  <input class="input" type="text" v-model="title" placeholder="Document Title">
                </div>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label">Signer Address</label>
                <div class="control">
                  <input class="input" type="text" v-model="signerAddress" placeholder="Enter Signer ETH Address">
                </div>
              </div>
            </div>
          </div>

          <button class="button is-info" @click="signDoc">Sign Doc</button>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import marked from 'marked'

export default {
  name: 'CreateDocument',
  data () {
    return {
      title: null,
      signerAddress: null,
      uncompressedInput: '# hello there',
      compressedOutput: 'Nada yet!'
    }
  },

  computed: {
    compiledMarkdown() {
      return marked(this.uncompressedInput, { sanitize: true })
    },

    compressedURL() {
      return `/#/view?${this.compressedOutput}`
    }
  },

  methods: {

    compressInput() {
      var filtered = this.compiledMarkdown.replace(/[ |\t]+/g, " ").replace(/> +</g, "> <")
      LZMA.compress(filtered, 9, (result, error) => {
        // do stuff with output
        if (error) console.error(error);
        var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(result)));
        this.compressedOutput = base64String
      })
    },

    signDoc() {
      var filtered = this.compiledMarkdown.replace(/[ |\t]+/g, " ").replace(/> +</g, "> <")
      LZMA.compress(filtered, 9, (result, error) => {
        // do stuff with output
        if (error) console.error(error);
        var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(result)));

        var args = {title: this.title, content: base64String, signer: this.signerAddress}
        this.$store.dispatch('signDocument', args)
      })
    }
  }
}
</script>

<style scoped>

  .content>h3 {
    border-top: 1px dashed #b7b7b7;
    padding-top: 30px;
    margin-bottom: 30px;
  }

  #editor {
    margin: 0;
    height: 100%;
    color: #333;
    min-height: 300px;
  }

  textarea, #editor div {
    height: 100%;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }

  .url-output {
    margin-top: 30px;
  }
</style>