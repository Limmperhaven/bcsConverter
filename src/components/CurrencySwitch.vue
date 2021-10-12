<template>
  <div class="wrapper">
    <select :value="select1" @change="s1Change">
      <option v-for="option in options" :key="option.name" :value="option.name">{{option.title}}</option>
    </select>
    <img src="../../public/img/exchange_arrows.svg">
    <select :value="select2" @change="s2Change">
      <option v-for="option in options" :key="option.name" :value="option.name">{{option.title}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CurrencySwitch',
  props: {
    select1: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    select2: {
      type: String,
      required: true
    }
  },
  methods: {
    s1Change (event) {
      this.$emit('update:select1', event.target.value)
    },
    s2Change (event) {
      this.$emit('update:select2', event.target.value)
    }
  }

}
</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  select {
    height: 60px;
    width: 174px;
    font-family: Paytone One;
    font-size: 18px;
    background: #212227;
    border: 0;
    color: #846C5A;
    border-radius: 8px;
    outline: none;
    text-align-last: center;
    text-align: center;
    cursor: pointer;
  }
  option {
    font-family: Paytone One;
    background: #F0DCCC;
  }
  img {
    height: 40px;
    width: 40px;
    margin: 0 16px;
  }

</style>
