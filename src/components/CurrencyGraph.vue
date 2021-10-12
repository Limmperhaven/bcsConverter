<template>
  <div class="wrapper">
    <canvas :id="cname"/>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  props: {
    dataset: {
      type: Array,
      required: true
    },
    cname: {
      type: String,
      required: true
    },
    dates: {
      type: Array,
      required: true
    },
    graphColor: {
      type: String,
      default: '#969ecf'
    }
  },
  data () {
    return {
      chartData: {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              label: this.cname,
              data: this.dataset,
              backgroundColor: this.graphColor,
              borderColor: this.graphColor,
              borderWidth: 4
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
          elements: {
            point: {
              radius: 1
            }
          }
        }
      }
    }
  },
  mounted () {
    this.renderDiagram()
  },
  methods: {
    renderDiagram () {
      // eslint-disable-next-line no-new
      new Chart(document.querySelector(`#${this.cname}`), this.chartData, this.options)
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: auto;
  width: calc(895%/1800*100);
}
canvas {
  height: 300px;
  background: #212227;
}
</style>
