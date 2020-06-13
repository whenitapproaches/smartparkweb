import Vue from 'vue'
import api from "@/services/ApiService"
import _ from "lodash"

export default {
  namespaced: true,
  state: {
    cars: [],
    sort: {
      owner: {
        reverse: false,
      },
      plate: {
        reverse: false,
      },
      membership: {
        reverse: false,
      },
      slot: {
        reverse: false,
      },
      enteredAt: {
        reverse: false,
      },
      leftAt: {
        reverse: false,
      },
    },
    currentSort: "",
    message: {
      error: "",
      success: "",
      shown: false,
    },
    hoverSlotCar: {}
  },
  getters: {
    allCars: (state) => {
      if (state.currentSort) {
        let order = 'asc'
        if(state.sort[state.currentSort].reverse) order = 'desc'
        return _.orderBy(state.cars, state.currentSort, order)
      }
      return state.cars
    },
    message: (state) => state.message,
    occupiedSlots: (state) => {
      let parkingCars = state.cars.filter(car => car.slot != null)
      let free = parkingCars.reduce((acc, cur) => {
        let slot = cur.slot
        return [...acc, slot]
      }, [])
      return free
    },
    hoverCar: (state) => {
      let car = _.find(state.cars, {'slot': state.hoverSlotCar})
      return (car) ? car : {}
    }
  },
  actions: {
    getAllCars({ commit }) {
      api
        .get("api/car")
        .then((response) => commit("setCars", response.data))
        .catch((err) => console.log(err))
    },
    sort({ commit }, property) {
      commit("sortCars", property)
    },
    deleteCar({ commit }, id) {
      api
        .delete("api/car", {
          data: {
            _id: id,
          },
        })
        .then(() => {
          commit("setSuccess", "Successfully Deleted")
          commit("deleteCar", id)
        })
        .catch((err) => {
          commit("setError", err.response.data)
        })
    },
    addCar({ commit }, formData) {
      api
        .post("api/car", formData)
        .then((res) => {
          commit("setSuccess", "Successfully Added")
          commit("addCar", res.data)
        })
        .catch((err) => {
          commit("setError", err.response.data)
        })
    },
    leaveCar({commit, dispatch}, id) {
      api
        .post("api/car/leave", {
          _id: id
        })
        .then(res => {
          commit("setSuccess", "Successfully Left")
          commit("leaveCar", res.data)
          dispatch("histories/getHistories", '', {
            root: true
          })
        })
        .catch((err) => {
          console.log(err)
          commit("setError", err.response.data)
        })
    },
    editCar({commit}, formData) {
      api.patch("api/car", formData)
      .then(res => {
        commit("setSuccess", "Successfully Edited")
        commit("editCar", res.data)
      })
      .catch(err => commit("setError", err.response.data))
    },
    enterCar({commit}, data) {
      api.post("api/car/enter", data)
      .then(res => {
        commit("setSuccess", `Car has entered at slot ${data.slot.toUpperCase()}`)
        commit("enterCar", res.data)
      })
      .catch(err => commit("setError", err.response.data))
    },
    freeMessage({ commit }) {
      commit("hideMessage")
    },
    getSlotCar({commit}, slot) {
      commit("setHoverSlotCar", slot)
    }
  },
  mutations: {
    setCars(state, cars) {
      state.cars = cars
    },
    sortCars(state, property) {
      state.sort[property].reverse = !state.sort[property].reverse
      state.currentSort = property
    },
    deleteCar(state, id) {
      state.cars = state.cars.filter(car => car._id !== id)
    },
    leaveCar(state, car) {
      let index = _.findIndex(state.cars, {'_id': car._id})
      Vue.delete(state.cars[index], 'slot')
      Vue.set(state.cars[index], 'leftAt', car.leftAt)
    },
    addCar(state, car) {
      state.cars.push({...car})
    },
    editCar(state, car) {
      let index = _.findIndex(state.cars, {'_id': car._id})
      state.cars.splice(index, 1)
      state.cars.splice(index, 0, car)
    },
    setError(state, msg) {
      state.message.success = ""
      state.message.error = msg
      state.message.shown = true
    },
    setSuccess(state, msg) {
      state.message.error = ""
      state.message.success = msg
      state.message.shown = true
    },
    hideMessage(state) {
      state.message.shown = false
    },
    enterCar(state, car) {
      let index = _.findIndex(state.cars, {'_id': car._id})
      Vue.set(state.cars[index], 'slot', car.slot)
      Vue.set(state.cars[index], 'enteredAt', car.enteredAt)
    },
    setHoverSlotCar(state, slot) {
      state.hoverSlotCar = slot
    }
  },
}
