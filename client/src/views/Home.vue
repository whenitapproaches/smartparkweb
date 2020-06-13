<template>
  <div class="page">
    <NavigationBar :currentTab="currentTab" :tabs="tabs" @changetab="changeTab" />
    <main class="main">
      <keep-alive>
        <component @changetab="changeTab" :is="currentTab" :slots="slots"></component>
      </keep-alive>
    </main>
    <transition
      enter-active-class="animate__animated animate__bounceInRight"
      leave-active-class="animate__animated animate__bounceOutRight"
    >
      <div
        v-show="message.shown"
        :class="{'is-success': message.success, 'is-danger': message.error}"
        class="cars__notification notification"
      >
        <button class="delete"></button>
        {{message.error || message.success}}
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding: 185px 120px 0;
  max-height: 100vh;
}
</style>

<script>
// @ is an alias to /src
import NavigationBar from "@/components/NavigationBar.vue"
import Map from "@/components/Map"
import Cars from "@/components/Cars"
import Welcome from "@/components/Welcome"
import About from "@/components/About"
import History from "@/components/History"
import {mapGetters} from 'vuex'
export default {
  name: "Home",
  data: function() {
    return {
      tabs: ["Welcome", "Map", "Cars", "History", "About"],
      currentTab: "Welcome",
      slots: [
        {
          id: 1,
          name: "x",
          info: false
        },
        {
          id: 2,
          name: "a1",
          info: false
        },
        {
          id: 3,
          name: "a2",
          info: false
        },
        {
          id: 4,
          name: "a3",
          info: false
        },
        {
          id: 5,
          name: "b1",
          info: false
        },
        {
          id: 6,
          name: "b2",
          info: false
        },
        {
          id: 7,
          name: "b3",
          info: false
        },
        {
          id: 8,
          name: "x",
          info: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      message: "cars/message"
    })
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab
    }
  },
  components: {
    NavigationBar,
    Map,
    Cars,
    Welcome,
    About,
    History
  }
}
</script>

