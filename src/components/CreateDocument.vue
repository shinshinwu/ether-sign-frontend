<template>
  <div class="columns">
    <div class="column">

      <h3>Enter Document To Be Compressed Below</h3>

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
      <button class="button" @click="signDoc">Sign Doc</button>

      <div class="content url-output">
        <h4>Share URL Output</h4>
        <blockquote style="overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;">{{ this.compressedOutput }}</blockquote>
        <a :href="compressedURL" target="_blank" style="overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;">{{ compressedURL }}</a>
      </div>

    </div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'CreateDocument',
  data () {
    return {
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
      // communicate with contract
    }
  }
}
</script>

<style scoped>

  h3 {
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