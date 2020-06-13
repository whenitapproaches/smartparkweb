<template>
  <nav class="navigation-bar">
    <transition appear appear-active-class="animate__animated animate__bounceIn">
      <router-link :to="{name: 'Home'}" class="logo">
        <img src="@/assets/logo.png" alt="">
      </router-link>
    </transition>
    <ul class="navigation-bar__list">
      <li v-for="tab in tabs" :key="tab">
        <a href="#" :class="{'is-active': currentTab === tab}" @click="changeTab(tab, $event)">{{tab | uppercase}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    tabs: Array,
    currentTab: String
  },
  methods: {
    changeTab(tab, e) {
      e.preventDefault()
      this.$emit("changetab", tab)
    }
  },
  filters: {
    uppercase(text) {
      return text.toUpperCase()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .navigation-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 60px 120px;
    align-items: center;
    &__list {
      display: flex;
      margin-left: auto;
      li {
        &:last-child {
          padding-right: 0;
        }
        padding: 0 2.5rem;
        a {
          color: #ccc;
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 3px;
          transition: .3s ease;
          &.is-active {
            color: #3f3d56;
          }
        }
      }
    }
  }
</style>
