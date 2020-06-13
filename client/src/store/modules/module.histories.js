import api from "@/services/ApiService"
import _ from 'lodash'

export default {
    namespaced: true,
    state: {
        histories: []
    },
    getters: {
        histories: state => _.orderBy(state.histories, 'leftAt', 'desc')
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