<template>
  <div>
    <div class="columns overview__tabs">
      <div class="column is-3">
        <div class="revenue overview__tab">
          <p>Revenue All Time</p>
          {{revenue}} VND
        </div>
      </div>
      <div class="column is-3">
        <div class="revenue overview__tab">
          <p>Revenue Last 5 Days</p>
          {{recentRevenue}} VND
        </div>
      </div>
      <div class="column is-3">
        <div class="revenue overview__tab">
          <p>Parked Cars All Time</p>
          {{histories | getLength}}
        </div>
      </div>
      <div class="column is-3">
        <div class="revenue overview__tab">
          <p>Parked Cars Last 5 Days</p>
          {{recentHistories | getLength}}
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4 is-offset-1">
        <div class="overview__chart">
          <div class="chart-parked-cars">
            <ParkedCarsChart></ParkedCarsChart>
            <h1 class="has-text-centered title is-4">Parked Cars Last 5 Days</h1>
          </div>
        </div>
      </div>
      <div class="column is-4 is-offset-1">
        <div class="overview__chart">
          <div class="chart-revenue">
            <RevenueChart></RevenueChart>
            <h1 class="has-text-centered title is-4">Revenue Last 5 Days</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParkedCarsChart from "@/components/ParkedCarsChart"
import RevenueChart from "@/components/RevenueChart"
import { mapGetters } from "vuex"
export default {
  name: "Overview",
  computed: {
    ...mapGetters({
      revenue: "histories/revenue",
      recentRevenue: "histories/recentRevenue",
      recentHistories: "histories/recentHistories",
      histories: "histories/histories"
    })
  },
  components: {
    ParkedCarsChart, RevenueChart
  },
  filters: {
    getLength(val) {
      if (val) return val.length
    }
  }
}
</script>

<style scoped lang="scss">
.overview__chart {
  h1 {
    color: #3f3d56d9;
  }
}
.overview {
  &__tab {
    text-align: center;
    background-color: #3772ff;
    color: white;
    padding: 30px;
    font-size: 2rem;
    font-weight: bold;
    p {
      font-size: 1.25rem;
    }
  }
  &__tabs {
    margin-bottom: 60px;
  }
}
</style>