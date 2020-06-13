import api from "@/services/ApiService"
import _ from 'lodash'
import moment from 'moment'

var recentDayCount = 5

export default {
    namespaced: true,
    state: {
        histories: []
    },
    getters: {
        histories: state => _.orderBy(state.histories, 'leftAt', 'desc'),
        recentHistories: state => {
            return _.filter(state.histories, function(history) {
                return moment(history.leftAt).isAfter(moment().subtract(recentDayCount, "days"), 'day')
            })
        },
        revenue: state => {
            let allPrices = state.histories.map((history) => history.price)
            let sum = _.reduce(allPrices, (acc, price) => (acc + price), 0)
            return sum
        },
        recentRevenue: state => {
            let recentHistories =  _.filter(state.histories, function(history) {
                return moment(history.leftAt).isAfter(moment().subtract(recentDayCount, "days"), 'day')
            })
            let allPrices = recentHistories.map((history) => history.price)
            let sum = _.reduce(allPrices, (acc, price) => (acc + price), 0)
            return sum
        }
    },
    actions: {
        getHistories({commit}) {
            api.get("api/histories")
            .then(res => commit("setHistories", res.data))
            .catch(err => console.log(err))
        }
    },
    mutations: {
        setHistories(state, histories) {
            state.histories = histories
        }
    }
}