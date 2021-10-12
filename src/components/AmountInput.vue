<template>
  <input type="number" @input="changeInput" maxlength="8" placeholder="Input value">
</template>

<script>
export default {
  name: 'AmountInput',
  props: {
    input: {
      type: String,
      required: true
    }
  },
  methods: {
    changeInput (event) {
      event.target.value = event.target.value.substr(0, 11)
      this.$emit('update:input', event.target.value)
    }
  }
}
</script>

<style scoped>
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
  input {
    height: 50px;
    width: 420px;
    font-family: Paytone One;
    background: #F0DCCC;
    border-radius: 8px;
    text-align: left;
    font-size: 18px;
    outline: none;
    margin-top: 8px;
    color: #757575;
  }
</style>
