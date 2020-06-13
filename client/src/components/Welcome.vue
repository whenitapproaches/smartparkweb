<template>
  <div class="welcome">
    <div class="columns is-desktop">
      <div class="column is-7-fullhd">
        <transition appear appear-active-class="animate__animated animate__backInLeft">
          <div class="welcome__image">
            <figure class="image">
              <img src="@/assets/welcome.png" alt />
            </figure>
          </div>
        </transition>
      </div>
      <div class="column is-5-fullhd overlap is-hidden-touch">
        <div class="welcome__content">
          <transition appear appear-active-class="animate__animated animate__backInRight">
            <h1 class="content__title">Smartpark</h1>
          </transition>
          <transition appear appear-active-class="animate__animated animate__fadeInRight">
            <p
              class="content__subtitle"
            >Your best choice for an ideal solution to metropolis parking problem</p>
          </transition>
          <div class="call-to-action-button">
            <transition appear v-on:after-appear="afterLeaveButton($event)" appear-active-class="animate__animated animate__fadeInRight">
                <button @click="changeTab('Map')" class="button">TAKE ME TO MAP</button>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  methods: {
      afterLeaveButton(e) {
          e.classList.add("static")
      },
      changeTab(tab) {
          this.$emit("changetab", tab)
      }
  }
}
</script>

<style scoped lang="scss">
.column.overlap {
    z-index: 10;
}
.welcome {
    &__image {
        height: 100%;
        display: flex;
        align-items: flex-end;
    }
  &__content {
      margin-top: 5rem;
    word-break: normal;
    margin-left: -12rem;
    z-index: 10;
    .content__title {
      font-size: 7.5rem;
      font-weight: bold;
      color: #3f3d56;
      text-shadow: 5px 5px 0 rgba(#3f3d56, 0.15);
    }
    .content__subtitle {
      color: #3f3d56d9;
      text-shadow: 3px 3px 0 rgba(#3f3d56d9, 0.15);
      font-size: 3rem;
      margin-right: 5rem;
      text-align: right;
      font-weight: bold;
    }
    .call-to-action-button {
        margin-top: 1.5rem;
        button {
            margin-left: auto;
            margin-right: 5rem;
            display: flex;
            background-color: #3772ff;
            border-radius: 0;
            padding: 1.75rem 2.25rem;
            color: white;
            font-size: 1.25rem;
            outline: none;
            border: none;
            transition: .3s ease;
            &.static:hover {
                transform: translateY(-10px);
                box-shadow: 10px 10px 0 rgba(#3772ff, 0.2)
            }
        }
    }
  }
}
</style>