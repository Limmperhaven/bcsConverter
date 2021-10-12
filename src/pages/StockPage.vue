<template>
  <ConverterHeader/>
  <div id="container">
    <span>stock</span>
  </div>
  <Stock v-if="!isLoading" v-model:clear="clearFlag" v-model:input="inputVal" v-model:selectedCurrency="selectedCurrency" :currencies="currencies" :total="stockTotal" :stockBTC="stockVals.btc" :stockETH="stockVals.eth"/>
  <h1 v-else>Данные загружаются</h1>
  <div id="border"></div>
</template>

<script>
import ConverterHeader from '../components/ConverterHeader'
import Stock from '../components/Stock'
import axios from 'axios'
export default {
  name: 'Stock_page',
  components: { Stock, ConverterHeader },
  data () {
    return {
      inputVal: '',
      currencies: { full: ['Bitcoin', 'Ethereum'], short: ['BTC', 'ETH'] },
      stockVals: { btc: 0, eth: 0 },
      stockTotal: 0,
      isLoading: false,
      courses: {},
      selectedCurrency: 'BTC',
      clearFlag: false
    }
  },
  methods: {
    async fetchData () {
      try {
        this.isLoading = true

        const btcusd = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        const ethusd = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')

        this.courses.btcusd = btcusd.data.bitcoin.usd
        this.courses.ethusd = ethusd.data.ethereum.usd

        this.isLoading = false
      } catch (e) {
        alert(e)
      }
    },
    editVals (newValue) {
      if (this.selectedCurrency === 'BTC') {
        this.stockVals.btc = newValue
        localStorage.stockBTC = newValue
      } else {
        this.stockVals.eth = newValue
        localStorage.stockETH = newValue
      }
      this.updateTotal()
    },
    clearVals () {
      this.stockVals.eth = 0
      this.stockVals.btc = 0
      this.clearFlag = false
      this.stockTotal = 0
      localStorage.stockBTC = 0
      localStorage.stockETH = 0
      localStorage.stockTotal = 0
    },
    updateTotal () {
      this.stockTotal = this.stockVals.btc * this.courses.btcusd + this.stockVals.eth * this.courses.ethusd
      localStorage.stockTotal = this.stockTotal
    }
  },
  mounted () {
    this.fetchData()
    if (localStorage.stockBTC) {
      this.stockVals.btc = localStorage.stockBTC
    }
    if (localStorage.stockETH) {
      this.stockVals.eth = localStorage.stockETH
    }
    if (localStorage.stockTotal) {
      this.stockTotal = localStorage.stockTotal
    }
  },
  watch: {
    inputVal (newValue) {
      this.editVals(newValue)
    },
    clearFlag (newValue) {
      if (newValue) {
        this.clearVals()
      }
    }
  }
}
</script>

<style scoped>
#border {
  margin-top: 56px;
  width: 100%;
  height: 7px;
  background-color: #846C5A;
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.4);
}
#container {
  width: calc(1348%/1920*100);
  margin: 74px auto 0;
  position: relative;
}
#container span {
  letter-spacing: -0.05em;
  top: -40px;
  left: -30px;
  position: absolute;
  margin-left: 64px;
  font-size: 36px;
  color: #846C5A;
}
</style>
