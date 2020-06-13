<template>
  <div>
    <LineChart :width="null" :height="null" :chartData="dataCollection" :options="options"></LineChart>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart"
import { mapGetters } from "vuex"
import _ from 'lodash'
import moment from 'moment'
export default {
  name: "ParkedCarsChart",
  data() {
    return {
      dataCollection: null,
      options: null
    }
  },
  computed: {
    ...mapGetters({
      today: "time/today",
      arrRecentDays: "time/arrRecentDays",
      histories: "histories/recentHistories"
    })
  },
  components: {
    LineChart
  },
  watch: {
    arrRecentDays() {
      this.$store.dispatch("histories/getHistories")
      this.filterHistories()
      this.fillData()
    },
    histories() {
      this.filterHistories()
    }
  },
  mounted() {
    this.$store.dispatch("histories/getHistories")
    this.fillData()
    this.fillOptions()
  },
  methods: {
    filterHistories() {
      let filter = []
      let len = this.arrRecentDays.length
      for(let i = 1; i <= len; i++){
        let thisDayHistories = _.filter(this.histories, function(history){
          return moment(history.leftAt).isSame(moment().subtract(len - i, "days"), "day")
        })
        filter.push(thisDayHistories.length)
      }
      this.fillData(filter)
    },
    fillData(data) {
      this.dataCollection = {
        labels: this.arrRecentDays,
        datasets: [
          {
            label: "Parked Car(s)",
            data: data,
            lineTension: 0,
            pointRadius: 5,
            fill: false,
            borderColor: "#3772ff",
            pointBackgroundColor: "#3772ff",
            pointHoverRadius: 8
          }
        ]
      }
    },
    fillOptions() {
      this.options = {
        aspectRatio: 1.5,
        tooltips: {
          xPadding: 20,
          yPadding: 15,
          caretPadding: 20,
          caretSize: 10,
          cornerRadius: 0,
          backgroundColor: "#3f3d56",
          titleFontSize: 16,
          titleMarginBottom: 15,
          bodyFontSize: 16,
          displayColors: false
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                fontSize: 20
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 20
              }
            }
          ]
        }
      }
    }
  }
}
</script>

<style>
</style>