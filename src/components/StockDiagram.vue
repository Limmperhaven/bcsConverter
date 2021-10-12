<template>
  <canvas id="stock-chart"/>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'StockDiagram',
  props: {
    amountBTC: {
      type: Number,
      default: 0
    },
    amountETH: {
      type: Number,
      default: 0
    },
    currencies: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      chartData: {
        type: 'pie',
        data: {
          labels: this.currencies,
          datasets: [
            {
              label: 'In stock',
              data: [this.amountBTC, this.amountETH],
              backgroundColor: [
                '#BB760F',
                'rgb(54, 162, 235)'
              ],
              borderWidth: 0
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          animation: {
            duration: 0
          }
        }
      },
      graph: ''
    }
  },
  watch: {
    amountBTC () {
      try {
        this.updateDiagram()
      } catch (e) {
        alert(e)
      }
    },
    amountETH () {
      try {
        this.updateDiagram()
      } catch (e) {
        alert(e)
      }
    }
  },
  mounted () {
    this.renderDiagram()
  },
  methods: {
    renderDiagram () {
      // eslint-disable-next-line no-new
      const ctx = new Chart(document.querySelector('canvas'),
        this.chartData, this.options)
      this.graph = ctx
    },
    updateDiagram () {
      this.graph.data.datasets[0].data = [this.amountBTC, this.amountETH]
      this.graph.destroy()
      document.querySelector('canvas').onload = function () {
        console.log('+')
      }
      this.renderDiagram()
    }
  }
}
</script>

<style scoped>
canvas {
  width: 72%;
  background: #5B504B;
  margin: 0 auto;
}
</style>
