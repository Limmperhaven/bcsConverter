<template>
  <div class="wrapper">
    <div id="l-side">
      <div class="container__currency">
        <img src="../../public/img/bitcoin.svg" class="currency__image">
        <span>Bitcoin</span>
        <span class="currency__amount" style="color: rgb(247,148,29);">{{this.stockBTC}} BTC</span>
      </div>
      <div class="container__currency">
        <img src="../../public/img/ethereum.svg" class="currency__image">
        <span>Ethereum</span>
        <span class="currency__amount" style="color: rgb(150,158,207)">{{this.stockETH}} ETH</span>
      </div>
      <div id="add__input">
        <select id="currency__select" @change="updateCurrency">
          <option v-for="option in currencies.short" :key="option" :value="option">{{option}}</option>
        </select>
        <input type="number" id="main__input" v-on:keyup.enter="updateVals">>
        <div id="button__clear" @click="clearVals">
          <span>Clear</span>
        </div>
        <div id="button__set" @click="updateVals">
          <span>Set</span>
        </div>
      </div>
    </div>
    <div id="r-side">
      <StockDiagram :currencies="currencies.full" :amountBTC="stockBTC" :amountETH="stockETH"/>
      <div id="total">
        <span id="total__title">Totals</span>
        <span id="total__value"><strong>{{total}} USD</strong></span>
      </div>
    </div>
  </div>
</template>

<script>
import StockDiagram from './StockDiagram'
export default {
  name: 'Stock',
  components: { StockDiagram },
  props: {
    currencies: {
      type: Object,
      required: true
    },
    stockBTC: {
      type: String,
      required: true
    },
    stockETH: {
      type: String,
      required: true
    },
    total: {
      type: String,
      required: true
    },
    input: {
      type: String
    },
    selectedCurrency: {
      type: String,
      default: 'BTC'
    },
    clear: {
      type: Boolean
    }
  },
  methods: {
    updateVals () {
      this.$emit('update:input', document.querySelector('#main__input').value)
      document.querySelector('#main__input').value = ''
    },
    updateCurrency (event) {
      this.$emit('update:selectedCurrency', event.target.value)
    },
    clearVals () {
      this.$emit('update:clear', true)
    }
  }
}
</script>

<style scoped>
  .wrapper {
    margin: 0 auto;
    background: #5B504B;
    border-radius: 29px;
    width: calc(1348%/1920*100);
    height: 450px;
    display: flex;
    letter-spacing: -0.05em;
  }
  #l-side {
    width: 50%;
    height: 100%;
    border-right: 1px solid #F0DCCC;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 70px;
  }
  .container__currency {
    margin-left: 7px;
    display: flex;
    align-items: center;
    color: #F4EBE4;
    font-size: 24px;
  }
  .container__currency img {
    margin-right: 7px;
  }
  .currency__amount {
    margin-left: 40px;
  }
  #r-side {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }
  #total {
    width: 100%;
    height: 60px;
    background: #F0DCCC;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    display: flex;
    align-items: center;
    padding: 5px 20px;
  }
  #total__title {
    color: #846C5A;
    font-size: 24px;
    margin-bottom: 3px;
  }
  #add__input {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 60px;
    background: #F0DCCC;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
  }
  #add__input input {
    height: 100%;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  #add__input select {
    font-family: Paytone One;
    height: 100%;
    background: #A6754F;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    width: 20%;
    text-align: center;
    color: #F4EBE4;
    font-size: 24px;
    outline: none;
    cursor: pointer;
  }
  #add__input option {
    background: #F0DCCC;
    color: #846C5A;
  }
  #button__set {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background: #846C5A;
    box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    width: 110px;
    display: flex;
    align-items: center;
    color: #F4EBE4;
    font-size: 24px;
    cursor: pointer;
  }
  #button__set span {
    width: 90%;
    text-align: right;
    margin-bottom: 3px;
  }
  #button__clear {
    position: absolute;
    right: 50px;
    top: 0;
    height: 100%;
    background: #70513B;
    box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    width: 80px;
    display: flex;
    align-items: center;
    color: #F4EBE4;
    font-size: 24px;
    z-index: 15;
    cursor: pointer;
  }
  #button__clear span {
    width: 110%;
    text-align: center;
    margin-bottom: 3px;
  }
  #add__input input {
    width: 70%;
    color: #846C5A;
    background: #F0DCCC;
    outline: none;
    border: 0;
    font-size: 24px;
    font-family: Paytone One;
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
  #total__value {
    margin: 0 0 3px 60px;
    font-size: 24px;
    color: #757575;
  }
</style>
