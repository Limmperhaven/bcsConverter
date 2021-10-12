<template>
  <ConverterHeader/>
  <div class="curs">
    <span style="color: rgba(247,148,29,0.5)">{{this.nameBTC}}</span>
    <span style="color: rgba(150,158,207,0.5)">{{this.nameETH}}</span>
  </div>
  <div class="cont__graph">
    <CurrencyGraph :cname="this.nameBTC" :graphColor="'#f7941d'" :dates="dates" :dataset="this.btcArray" :key="this.now.getMilliseconds()" v-if="!isLoading"/>
    <CurrencyGraph :cname="this.nameETH" :graphColor="'#969ecf'" :dates="dates" :dataset="this.ethArray" :key="this.now.getMilliseconds()" v-if="!isLoading"/>
    <h1 v-else>Данные загружаются</h1>
  </div>
    <div class="converter">
      <CurrencySwitch :options="options" v-model:select1="firstCurrency" v-model:select2="secondCurrency"/>
      <AmountInput v-model:input="input"/>
      <div id="output__div">
        <span id="output">{{response}}</span>
      </div>
  </div>
  <div id="border"></div>
</template>

<script>
import CurrencyGraph from '@/components/CurrencyGraph'
import axios from 'axios'
import CurrencySwitch from '@/components/CurrencySwitch'
import AmountInput from '@/components/AmountInput'
import ConverterHeader from '@/components/ConverterHeader'

export default {
  name: 'ExchangerPage',
  components: {
    ConverterHeader,
    AmountInput,
    CurrencySwitch,
    CurrencyGraph
  },
  data () {
    return {
      now: new Date(),
      dates: [],
      btcArray: [],
      ethArray: [],
      nameBTC: 'Bitcoin',
      nameETH: 'Ethereum',
      isLoading: false,
      options: [
        { title: 'Bitcoin (BTC)', name: 'BTC' },
        { title: 'US Dollar (USD)', name: 'USD' },
        { title: 'Ethereum (ETH)', name: 'ETH' }
      ],
      firstCurrency: 'BTC',
      secondCurrency: 'USD',
      courses: {},
      input: '',
      response: ''
    }
  },
  methods: {
    async fetchData () {
      try {
        this.isLoading = true
        const bufferBTC = []
        const bufferETH = []

        const btcData = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=13&interval=daily')
        const ethData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=13&interval=daily')
        const btcusd = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        const btceth = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eth')
        const ethusd = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')

        for (const elem of btcData.data.prices) {
          setTimeout(bufferBTC.push(elem[1]), 0)
        }

        for (const elem of ethData.data.prices) {
          setTimeout(bufferETH.push(elem[1]), 0)
        }

        this.courses.btcusd = btcusd.data.bitcoin.usd
        this.courses.usdbtc = 1 / btcusd.data.bitcoin.usd
        this.courses.btceth = btceth.data.bitcoin.eth
        this.courses.ethbtc = 1 / btceth.data.bitcoin.eth
        this.courses.ethusd = ethusd.data.ethereum.usd
        this.courses.usdeth = 1 / ethusd.data.ethereum.usd

        this.btcArray = bufferBTC
        this.ethArray = bufferETH

        this.isLoading = false

        this.response = `1 BTC = ${this.courses.btcusd} USD`
      } catch (e) {
        alert(e)
      }
    },
    checkCurr (id, oldValue) {
      if (this.firstCurrency === this.secondCurrency) {
        if (id === 1) {
          this.secondCurrency = oldValue
        } else {
          this.firstCurrency = oldValue
        }
      }
    },
    converter () {
      switch (true) {
        case (this.firstCurrency === 'BTC' && this.secondCurrency === 'USD'):
          this.response = `${this.input} ${this.firstCurrency} = ${(this.input * this.courses.btcusd).toFixed(0)} ${this.secondCurrency}`
          break
        case (this.firstCurrency === 'BTC' && this.secondCurrency === 'ETH'):
          this.response = `${this.input} ${this.firstCurrency} = ${(this.input * this.courses.btceth).toFixed(2)} ${this.secondCurrency}`
          break
        case (this.firstCurrency === 'ETH' && this.secondCurrency === 'USD'):
          this.response = `${this.input} ${this.firstCurrency} = ${(this.input * this.courses.ethusd).toFixed(2)} ${this.secondCurrency}`
          break
        case (this.firstCurrency === 'ETH' && this.secondCurrency === 'BTC'):
          this.response = `${this.input} ${this.firstCurrency} = ${this.input * this.courses.ethbtc} ${this.secondCurrency}`
          break
        case (this.firstCurrency === 'USD' && this.secondCurrency === 'BTC'):
          this.response = `${this.input} ${this.firstCurrency} = ${this.input * this.courses.usdbtc} ${this.secondCurrency}`
          break
        // eslint-disable-next-line eqeqeq
        case (this.firstCurrency === 'USD' && this.secondCurrency === 'ETH'):
          this.response = `${this.input} ${this.firstCurrency} = ${this.input * this.courses.usdeth} ${this.secondCurrency}`
          break
      }
      if (this.input === '' || this.input === 0) {
        this.response = ''
      }
    },
    formDates () {
      const dateObj = new Date()

      this.dates.push(dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear())

      for (let i = 0; i < 13; i++) {
        dateObj.setDate(dateObj.getDate() - 1)
        this.dates.push(dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear())
      }
      this.dates.reverse()
    }
  },
  mounted () {
    this.fetchData()
    this.formDates()
  },
  watch: {
    firstCurrency (newValue, oldValue) {
      this.checkCurr(1, oldValue)
      this.converter()
    },
    secondCurrency (newValue, oldValue) {
      this.checkCurr(2, oldValue)
      this.converter()
    },
    input () {
      this.converter()
    }
  }
}
</script>

<style scoped>
.cont__graph {
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: calc(1800%/1920*100);
  justify-content: space-between;
  height: auto;
}
.converter {
  margin: 12px auto 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 178px;
}
#output {
  color: #846C5A;
  font-size: 18px;
}
.curs {
  margin: 35px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #846C5A;
  font-size: 14px;
  width: calc(1800%/1920*100);
}
.curs span {
  width: calc(895%/1800*100);
  background: #212227;
}
#output__div {
  /*margin-top: 4px; */
  height: 30px;
  width: 520px;
  text-align: center;
}
#border {
  width: 100%;
  height: 7px;
  background-color: #846C5A;
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.4);
}
</style>
