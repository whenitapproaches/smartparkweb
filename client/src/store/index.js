import Vue from 'vue'
import Vuex from 'vuex'
import cars from './modules/module.cars'
import users from './modules/module.user'
import histories from './modules/module.histories'
import overview from './modules/module.overview'
import time from './modules/module.time'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cars, users, histories, overview, time
    }
})