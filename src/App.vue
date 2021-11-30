<template>
  <div id="app">
    <div class="container" ref="container">
      <div class="d-flex-column">
        <div class="form">
          <div class="form-input">
            <label for="cnab" class="cnab-label">Selecione seu Arquivo:</label>
            <div>
              <div class="customize-input">
                <input 
                  type="file" 
                  class="cnab" 
                  ref="cnab"
                  data-cy="cnab"
                  @change="changeFile"/>
              </div>
              <div>
                <img src="./assets/upload.svg" width="25" height="25"><img/>
              </div>
            </div>
          </div>
        </div>
        <button 
          class="btn"
          :class="disabledButton ? 'disabled' : ''"
          data-cy="submit-list"
          :disabled="showList"
          @click="listShow"
        >
          Enviar
        </button>
      </div>
      <div class="d-flex-row justify-content-center" data-cy="list" style="width: 100%;" v-if="showList">
        <ul style="padding: 0;">
          <li v-for="(item, index) in list" :key="index">
              <div class="d-flex-row list-group">
                  <li>{{ item || '-' }}</li>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      list: null,
      showList: false,
      disabledButton: true,
    }
  },
  methods: {
    changeFile($el) {
      let file = $el.target.files[0]
      let reader = new FileReader()
      
      this.$refs.cnab.style.color = 'black'      
      reader.onload = function () {
          let data = reader.result.split('****')
          let normalize = data.map(dt => {
            const [word, digits] = dt.match(/\D+|\d+/g);
            let brokenString = dt.split(' ')
            let firstTerm = dt.split(' ')[brokenString.length-1].match(/\D+|\d+/g)[1]
            let vb = `${firstTerm} | ${word} | ${digits}`
            return vb.replaceAll('undefined', '-')
          })
          this.list = normalize
          this.disabledButton = false
      }.bind(this)
      
      reader.readAsText(file)
    },
    listShow() {
      this.$refs.container.style.height = 'auto'
      this.showList = true
    }
  }
}
</script>
<style>
.container {
  height: 90vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%
}
.form, .form-input {
  display: flex;
  flex-flow: column nowrap;
}
.cnab-label {
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
}
.cnab {
  margin-top: 20px;
  padding: 10px;
  border-bottom: 1.5px solid #0d6efd;
  cursor: pointer
}
.btn {
  cursor: pointer;
  margin-top: 20px;
  border: none !important;
  padding: 10px;
  background: #0d6efd;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 0.9em; 
}
.disabled {
  background: #c0c0c0;
  opacity: 0.50;
}
.customize-input {
  display: flex;
  flex-flow: row nowrap;
}
.d-flex-row {
  display: flex;
  flex-flow: row nowrap;
}
.d-flex-column {
  display: flex;
  flex-flow: column nowrap;
}
.justify-content-center {
  justify-content: center;
}
.list-group {
  border: 0.2px solid #c0c0c0;
}
.list-group, li{
  list-style-type: none;
  padding: 10px;
}
.list-group, li::after {
  border-bottom: 1px solid #c0c0c0 !important;
  margin: 0;
  padding: 0;
}
img {
  float: right;
  margin-top: -28px;
}
input[type=file]::file-selector-button {
  display: none;
}
input[type=file] {
  color: rgba(0, 0, 0, 0)
}
</style>