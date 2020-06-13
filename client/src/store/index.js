import Vue from 'vue'
import Vuex from 'vuex'
import cars from './modules/module.cars'
import users from './modules/module.user'
import histories from './modules/module.histories'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cars, users, histories
    }
})