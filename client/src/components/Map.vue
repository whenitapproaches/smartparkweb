<template>
  <div class="map">
    <div class="columns is-multiline">
      <div class="column is-12 overlap">
        <transition appear appear-active-class="animate__animated animate__slideInLeft">
          <div class="map__map">
            <div class="columns is-mobile is-multiline">
              <div v-for="slot in slots" :key="slot.id" class="column is-3">
                <div
                  v-if="!slot.name.includes('x')"
                  @mouseenter="showInfo(slot.name)"
                  @mouseleave="isInfoShown = false"
                  class="slot"
                  :class="{'is-occupied': occupiedSlots.includes(slot.name)}"
                >
                  <p>{{slot.name | uppercase}}</p>
                  <a
                    v-show="occupiedSlots.includes(slot.name)"
                    class="button leave is-warning"
                    @click.prevent="leaveCar()"
                  >Leave</a>
                </div>
              </div>
            </div>
            <div class="legends">
              <div class="legend-green">
                <span></span>
                <p>Free</p>
              </div>
              <div class="legend-red">
                <span></span>
                <p>Occupied</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="columns">
      <div
        class="column is-6-desktop is-8-tablet is-hidden-widescreen-only is-hidden-desktop-only is-hidden-touch"
      >
        <transition appear appear-active-class="animate__animated animate__fadeInUp">
          <div class="map__image">
            <img src="@/assets/map.png" alt />
          </div>
        </transition>
      </div>
      <div class="column">
        <transition enter-active-class="animate__animated animate__fadeIn animate__faster">
          <div v-show="isInfoShown" class="map__info">
            <p style="text-align: center; margin-bottom: 0.5rem;">Slot {{hoverCar.slot | uppercase}}</p>
            <div v-show="hoverCar.plate" class="columns">
              <div class="column is-narrow">
                <ul class="header">
                  <li>Owner:</li>
                  <li>Numberplate:</li>
                  <li>Membership:</li>
                  <li>Parking Time:</li>
                  <li>Parking Fee:</li>
                </ul>
              </div>
              <div class="column">
                <ul class="result">
                  <li>{{hoverCar.owner}}</li>
                  <li>{{hoverCar.plate}}</li>
                  <li>{{hoverCar.membership | uppercase}}</li>
                  <li>{{hoverCar.enteredAt | formatTime}}</li>
                  <li>{{hoverCar.enteredAt | formatPrice(hoverCar.membership)}}</li>
                </ul>
              </div>
            </div>
            <div class="has-text-centered" v-show="!hoverCar.plate">Empty</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import _ from "lodash"
export default {
  name: "Map",
  data: function() {
    return {
      isInfoShown: false
    }
  },
  computed: {
    ...mapGetters({
      hoverCar: "cars/hoverCar",
      occupiedSlots: "cars/occupiedSlots"
    })
  },
  mounted() {
    this.debounceFreeMessage = _.debounce(this.freeMessage, 2000)
    this.$store.dispatch("cars/getAllCars")
  },
  props: ["slots"],
  methods: {
    showInfo(slot) {
      this.isInfoShown = true
      this.$store.dispatch("cars/getSlotCar", slot)
    },
    leaveCar() {
      this.$store.dispatch("cars/leaveCar", this.hoverCar._id)
      this.debounceFreeMessage()
    },
    freeMessage() {
      this.$store.dispatch("cars/freeMessage")
    }
  },
  filters: {
    uppercase(val) {
      if (val) return val.toUpperCase()
    },
    formatTime(dateTime) {
      let temp = new Date(dateTime)
      let time = Date.now() - temp.getTime()
      let toSeconds = Math.floor(time / 1000)
      let toMinutes = Math.floor(toSeconds / 60)
      let toHours = Math.floor(toMinutes / 60)
      let remainMinutes = toMinutes - toHours * 60
      return `${toHours}h ${remainMinutes}m`
    },
    formatPrice(dateTime, membership) {
      let temp = new Date(dateTime)
      let time = Date.now() - temp.getTime()
      let toSeconds = Math.floor(time / 1000)
      let toMinutes = Math.floor(toSeconds / 60)
      let price
      switch (membership) {
        case "basic":
          price = 100
          break
        case "premium":
          price = 50
          break
        case "guest":
          price = 200
          break
        default:
          break
      }
      price = price * toMinutes
      return `${price} VND`
    }
  }
}
</script>

<style lang="scss" scoped>
.button.leave {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
}
.header {
  text-align: left;
}
.result {
  text-align: right;
}
.column.overlap {
  z-index: 5;
}
.legends {
  span {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
  }
  .legend-green,
  .legend-red {
    display: flex;
  }
  .legend-green {
    margin-bottom: 1rem;
    span {
      background-color: #9fd356;
    }
  }
  .legend-red {
    span {
      background-color: #df2935;
    }
  }
}
.map {
  &__info {
    background-color: #3772ff;
    box-shadow: 10px 10px 0 #3772ff45;
    color: white;
    padding: 2rem 3rem;
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: 3px;
    li:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  }
  &__image {
    margin-top: -12%;
  }
  &__map {
    z-index: 5;
    .slot {
      position: relative;
      background-color: #9fd356;
      color: white;
      padding: 30px;
      font-size: 1.25rem;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s ease;
      z-index: 3;
      &.is-occupied {
        background-color: #df2935;
        &:hover {
          box-shadow: 5px 5px 0 rgba(#df2935, 0.25);
        }
      }
      &.is-active,
      &:hover {
        transform: scale(1.05);
        box-shadow: 5px 5px 0 #9fd35675;
      }
    }
  }
}
</style>