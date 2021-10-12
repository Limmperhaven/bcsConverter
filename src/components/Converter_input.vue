<template>
  <div class="wrapper">
    <select :value="modelValue" @change="changeCurrency">
      <option v-for="option in options" :key="option" :value="option">{{option}}</option>
    </select>
    <input type="number" step='0.01' placeholder='0.00' :value="input" @input="changeInput">
  </div>
</template>

<script>
export default {
  name: "converter_input",
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true
    },
    initCurrency: {
      type: Number,
      required: true
    },
    input: {
      type: Number,
      default: 0.00
    }
  },
  methods: {
    changeCurrency(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    changeInput(event) {
      this.$emit('update:input', event.target.value)
    }
  },
  mounted() {
    //document.querySelectorAll('option')[this.initCurrency].selected = true
    //console.log(document.querySelectorAll('option')[this.initCurrency].value)
  }
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
  }
  select {
    height: 80px;
    width: 72px;
    font-family: Paytone One;
    font-size: 24px;
    background: rgba(13, 24, 37, 0.6);
    border: 0;
    color: #846C5A;
    border-radius: 8px;
    outline: none;
  }
  input {
    height: 80px;
    width: 500px;
    font-family: Paytone One;
    background: #F0DCCC;
    border-radius: 8px;
    text-align: right;
    font-size: 24px;
    outline: none;
  }
  option {
    font-family: Paytone One;
    background: #F0DCCC;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type='number'],
  input[type="number"]:hover,
  input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
  }
</style>