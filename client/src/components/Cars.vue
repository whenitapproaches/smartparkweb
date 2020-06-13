<template>
  <div class="cars">
    <transition appear appear-active-class="animate__animated animate__zoomIn">
      <div class="cars__table">
        <div class="cars__header">
          <div class="field">
            <div class="control has-icons-left">
              <div class="select">
                <select v-model="currentCarPerPage">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <i class="fas fa-filter"></i>
              </div>
            </div>
          </div>
          <a @click.prevent="addCar" href="#" class="button is-primary">
            <span>
              <i class="fas fa-plus-circle"></i>
            </span>Add New Car
          </a>
        </div>
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
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="car in displayedCars" :key="car._id" class="car-list-item">
                <td>{{car.owner}}</td>
                <td>{{car.plate}}</td>
                <td>{{car.membership | uppercase}}</td>
                <td class="has-text-centered">{{car.slot | nullCheck | uppercase}}</td>
                <td class="has-text-centered">{{car.enteredAt | formatDate | nullCheck}}</td>
                <td class="has-text-centered">{{car.leftAt | formatDate | nullCheck}}</td>
                <td>
                  <a @click.prevent="enterCar(car._id, car.slot)" class="button is-success" :disabled="car.slot">Enter</a>
                </td>
                <td>
                  <a @click.prevent="leaveCar(car._id, car.slot)" class="button is-warning" :disabled="!car.slot">Leave</a>
                </td>
                <td>
                  <a @click.prevent="editCar(car._id)" class="button is-info">Edit</a>
                </td>
                <td>
                  <a @click.prevent="deleteCar(car._id)" class="button is-danger">Delete</a>
                </td>
                <td>
                  <a class="button is-link">Statistics</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="cars__footer">
          <nav class="pagination" role="navigation" aria-label="pagination">
            <ul class="pagination-list">
              <li v-for="n in pages" :key="n">
                <a
                  @click="changePage(n-1)"
                  :class="{'is-current': currentPage == n-1}"
                  class="pagination-link"
                >{{n}}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </transition>
    <transition enter-active-class="animate__fadeIn animate__faster animate__animated">
      <div class="modal" v-show="isModalShown">
        <div @click="toggleAllOff " class="modal-background"></div>
        <div class="modal-card">
          <div class="modal-card-content">
            <div v-show="isDeleting || isLeaving">
              <div class="text">Are You Sure?</div>
              <div class="buttons">
                <button @click="confirm" class="button is-success">Yup</button>
                <button @click="toggleAllOff" class="button">Nah</button>
              </div>
            </div>
            <div v-show="isEntering" class="enter">
              <h1 class="is-3 title">Choose Slot To Enter</h1>
              <div class="control enter__map">
                <div class="columns is-mobile is-multiline">
                  <div v-for="slot in slots" :key="slot.id" class="column is-3">
                    <label
                      :class="{'is-selected': chosenSlot == slot.name, 'is-occupied': occupiedSlots.includes(slot.name)}"
                      v-if="!slot.name.includes('x')"
                      class="radio"
                    >
                      <input
                        class="is-hidden"
                        v-model="chosenSlot"
                        type="radio"
                        name="slot"
                        :value="slot.name"
                        :disabled="occupiedSlots.includes(slot.name)"
                      />
                      {{slot.name | uppercase}}
                    </label>
                  </div>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button @click.prevent="confirm" class="button is-link">Submit</button>
                </div>
                <div class="control">
                  <button @click="toggleAllOff" class="button is-link is-light">Cancel</button>
                </div>
              </div>
            </div>
            <div v-show="isAdding || isEditing" class="editor">
              <h1
                class="is-3 title"
              >{{(isAdding) ? 'Register A Car' : (isEditing) ? 'Editing A Car' : ''}}</h1>
              <div class="field">
                <label class="label">Owner</label>
                <div class="control">
                  <input
                    v-model="formData.owner"
                    class="input"
                    :class="{'is-danger': formMessages.owner}"
                    type="text"
                    placeholder="Enter your name..."
                  />
                </div>
                <p v-show="formMessages.owner" class="help is-danger">{{formMessages.owner}}</p>
              </div>
              <div class="field">
                <label class="label">Numberplate</label>
                <div class="control">
                  <input
                    v-model="formData.plate"
                    class="input"
                    :class="{'is-danger': formMessages.plate}"
                    type="text"
                    placeholder="Enter your car numberplate..."
                  />
                </div>
                <p v-show="formMessages.plate" class="help is-danger">{{formMessages.plate}}</p>
              </div>
              <div class="field">
                <label class="label">Membership</label>
                <div class="control">
                  <div class="select" :class="{'is-danger': formMessages.membership}">
                    <select v-model="formData.membership">
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button @click.prevent="confirm" class="button is-link">Submit</button>
                </div>
                <div class="control">
                  <button @click="toggleAllOff" class="button is-link is-light">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import CarValidator from "@/services/CarValidator"
import _ from "lodash"
export default {
  name: "Cars",
  data: function() {
    return {
      isModalShown: false,
      isDeleting: false,
      isLeaving: false,
      isEditing: false,
      isAdding: false,
      isEntering: false,
      currentID: "",
      formData: {
        owner: "",
        plate: "",
        membership: ""
      },
      formMessages: {
        owner: "",
        plate: ""
      },
      currentPage: 0,
      currentCarPerPage: 5,
      chosenSlot: ""
    }
  },
  computed: {
    ...mapGetters({
      cars: "cars/allCars",
      message: "cars/message",
    }),
    occupiedSlots: {
      get() {
        return this.$store.getters["cars/occupiedSlots"]
      }
    },
    displayedCars: {
      get() {
        return _.chunk(this.cars, this.currentCarPerPage)[this.currentPage]
      }
    },
    pages: {
      get() {
        return _.chunk(this.cars, this.currentCarPerPage).length
      }
    }
  },
  props: ["slots"],
  methods: {
    ...mapActions("cars", ["getAllCars"]),
    checkAll() {
      for (let check in this.checked) {
        this.checked[check] = !this.checkedAll
      }
    },
    sort(property) {
      this.$store.dispatch("cars/sort", property)
    },
    toggleAllOff() {
      this.currentID = ""
      this.chosenSlot = ""
      this.isModalShown = false
      this.isDeleting = false
      this.isLeaving = false
      this.isEditing = false
      this.isAdding = false
      this.isEntering = false
      this.formMessages = {}
      this.formData = {}
    },
    deleteCar(id) {
      this.toggleAllOff()
      this.isModalShown = true
      this.isDeleting = true
      this.currentID = id
    },
    addCar() {
      this.toggleAllOff()
      this.isModalShown = true
      this.isAdding = true
    },
    editCar(id) {
      this.toggleAllOff()
      this.isModalShown = true
      this.isEditing = true
      this.currentID = id
      let currentEditingCar = this.cars.filter(car => car._id === id)[0]
      this.formData = { ...currentEditingCar }
    },
    enterCar(id, slot) {
      if(slot) return
      this.toggleAllOff()
      this.isModalShown = true
      this.isEntering = true
      this.currentID = id
    },
    leaveCar(id, slot) {
      if(!slot) return
      this.toggleAllOff()
      this.isModalShown = true
      this.isLeaving = true
      this.currentID = id
    },
    confirm() {
      if (this.isDeleting)
        this.$store.dispatch("cars/deleteCar", this.currentID)
      if (this.isLeaving)
        this.$store.dispatch("cars/leaveCar", this.currentID)
      if (this.isAdding || this.isEditing) {
        let validation = CarValidator.validate(this.formData, {
          abortEarly: false,
          allowUnknown: true
        })
        this.formMessages = {}
        if (validation.error) {
          let len = validation.error.details.length
          console.log(validation)
          for (let i = 0; i < len; i++) {
            this.formMessages[validation.error.details[i].path[0]] =
              validation.error.details[i].message
          }
          return
        }
        let takenPlate = this.cars.filter(
          car =>
            car.plate == this.formData.plate && car._id != this.formData._id
        )
        if (takenPlate.length > 0)
          return (this.formMessages.plate = "This plate has already been taken")
        this.formMessages.plate = ""
        let actionName = this.isAdding ? "cars/addCar" : "cars/editCar"
        this.$store.dispatch(actionName, this.formData)
      }
      if (this.isEntering) {
        this.$store.dispatch("cars/enterCar", {
          _id: this.currentID,
          slot: this.chosenSlot
        })  
      }
      this.debounceFreeMessage()
      this.toggleAllOff()
    },
    freeMessage() {
      this.$store.dispatch("cars/freeMessage")
    },
    changePage(n) {
      this.currentPage = n
    }
  },
  mounted() {
    this.getAllCars()
    this.debounceFreeMessage = _.debounce(this.freeMessage, 2000)
  },
  watch: {
    currentCarPerPage() {
      if (this.currentPage + 1 > this.pages) this.currentPage = 0
    }
  },
  filters: {
    uppercase(val) {
      return val.toUpperCase()
    },
    nullCheck(val) {
      return val ? val : "-"
    },
    formatDate(val) {
      if(!val) return ''
      let datetime = new Date(val)
      let hours = datetime.getHours()
      hours = (hours < 10) ? `0${hours}` : hours
      let minutes = datetime.getMinutes()
      minutes = (minutes < 10) ? `0${minutes}` : minutes
      let seconds = datetime.getSeconds()
      seconds = (seconds < 10) ? `0${seconds}` : seconds
      let date = datetime.getDate()
      let month = datetime.getMonth() + 1
      let year = datetime.getFullYear()
      return `${hours}:${minutes}:${seconds} ${date}/${month}/${year}`
    }
  }
}
</script>

<style lang="scss">
.enter {
  .radio {
    font-size: 1.25rem;
    color: white;
    background-color: #9fd356;
    padding: 1rem 2rem;
    &.is-selected {
      background-color: #3772ff;
    }
    &.is-occupied {
      background-color: #df2935;
    }
  }
  &__map {
    margin-bottom: 30px;
  }
}
.modal {
  display: flex;
}
.field:not(:last-child) {
  margin-bottom: 1.5rem;
}
.pagination-list {
  justify-content: center;
  .pagination-link {
    border-radius: 0;
  }
}
.cars__notification {
  position: fixed;
  right: 40px;
  bottom: 40px;
  max-width: 20%;
  padding: 1.25rem 2.25rem;
  font-size: 1.25rem;
  z-index: 50;
  margin-bottom: 0;
}
.modal-background {
  background-color: rgba(10, 10, 10, 0.5);
}
.modal-card {
  width: auto;
  background-color: #fff;
  .help {
    font-size: 1rem;
  }
  &-content {
    padding: 2rem 3rem;
    .text {
      margin-bottom: 1rem;
      text-align: center;
      font-size: 1.5rem;
    }
    .buttons {
      justify-content: center;
    }
  }
  .editor {
    min-width: 30vw;
    input,
    select {
      border-radius: 0;
    }
  }
}
th > a {
  color: #3f3d56d9;
  &:hover {
    color: #3f3d56;
  }
}
.button {
  border-radius: 0;
  font-size: 1rem;
}
.cars {
  display: flex;
  margin-bottom: 50px;
  &__header {
    display: flex;
    .button {
      margin-left: auto;
      padding: 1.5rem 1.5rem;
    }
    span {
      margin-right: 1rem;
    }
  }
}
.cars__table {
  margin: auto;
  width: 100%;
}
.table {
  font-size: 1.25rem;
  width: 100%;
  th {
    text-transform: uppercase;
    padding: 0.6rem 1rem !important;
  }
}
</style>