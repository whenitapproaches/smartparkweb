<template>
  <div class="history">
    <div class="table-container">
      <table class="table is-striped is-narrow">
        <thead>
          <tr>
            <th style="width: 15rem;">
              <a href="#" @click.prevent="sort('owner')">
                Owner
                <i class="fas fa-sort"></i>
              </a>
            </th>
            <th>
              <a href="#" @click.prevent="sort('plate')">
                Numberplate
                <i class="fas fa-sort"></i>
              </a>
            </th>
            <th>
              <a href="#" @click.prevent="sort('membership')">
                Membership
                <i class="fas fa-sort"></i>
              </a>
            </th>
            <th>
              <a href="#" @click.prevent="sort('slot')">
                Slot
                <i class="fas fa-sort"></i>
              </a>
            </th>
            <th>
              <a href="#" @click.prevent="sort('enteredAt')">
                Entered At
                <i class="fas fa-sort"></i>
              </a>
            </th>
            <th>
              <a href="#" @click.prevent="sort('leftAt')">
                Left At
                <i class="fas fa-sort"></i>
              </a>
            </th>
            <th>
              <a href="#" @click.prevent="sort('leftAt')">
                Total time
                <i class="fas fa-sort"></i>
              </a>
            </th>
            <th>
              <a href="#" @click.prevent="sort('leftAt')">
                Price
                <i class="fas fa-sort"></i>
              </a>
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="history in histories" :key="history._id" class="car-list-item">
            <td>{{history.owner}}</td>
            <td>{{history.plate}}</td>
            <td>{{history.membership | uppercase}}</td>
            <td class="has-text-centered">{{history.slot | uppercase}}</td>
            <td class="has-text-centered">{{history.enteredAt | formatDate}}</td>
            <td class="has-text-centered">{{history.leftAt | formatDate}}</td>
            <td>{{history.time}}</td>
            <td>{{history.price}} VND</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "History",
  computed: {
    ...mapGetters({
      histories: "histories/histories"
    })
  },
  mounted() {
    this.$store.dispatch("histories/getHistories")
  },
  filters: {
    formatDate(val) {
      if (!val) return ""
      let datetime = new Date(val)
      let hours = datetime.getHours()
      hours = hours < 10 ? `0${hours}` : hours
      let minutes = datetime.getMinutes()
      minutes = minutes < 10 ? `0${minutes}` : minutes
      let seconds = datetime.getSeconds()
      seconds = seconds < 10 ? `0${seconds}` : seconds
      let date = datetime.getDate()
      let month = datetime.getMonth() + 1
      let year = datetime.getFullYear()
      return `${hours}:${minutes}:${seconds} ${date}/${month}/${year}`
    },
    uppercase(val) {
      return val.toUpperCase()
    }
  }
}
</script>

<style>
</style>