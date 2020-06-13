import moment from "moment"

var recentDaysCount = 5

export default {
  namespaced: true,
  state: {
    now: moment(),
  },
  getters: {
    today(state) {
      return state.now.startOf("day")
    },
    arrRecentDays(state) {
      var today = moment(state.now)
      console.log('state changed')
      var arr = []
      for (let i = 1; i <= recentDaysCount; i++) {
        let day = moment(today)
          .subtract(recentDaysCount - i, "days")
          .format("D/M")
        if (i == recentDaysCount) {
          day = "Today"
        }
        arr.push(day)
      }
      return arr
    },
  },
  actions: {
    start({ commit }) {
      setInterval(() => {
        console.log("haha")
        commit("updateTime")
      }, 60000)
    }
  },
  mutations: {
    updateTime(state) {
      state.now = moment()
    }
  },
}
