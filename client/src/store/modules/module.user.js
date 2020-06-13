export default {
    namespaced: true,
    state: {
        isLoggedIn: false
    },
    getters: {
        getIsLoggedIn: (state) => state.isLoggedIn
    },
    actions: {
        login({commit}) {
            commit("setLogin")
        }
    },
    mutations: {
        setLogin(state) {
            state.isLoggedIn = true
        }
    }
}