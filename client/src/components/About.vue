<template>
  <div class="about">
    <div class="columns">
      <div class="column is-4">
        <transition appear appear-active-class="animate__animated animate__fadeInLeft">
            <div class="content is-medium">
              <h1>About Smartpark</h1>
              <p>
                Smartpark is a
                <b>parking lot management application</b> which bringings solution to the rising problem in most of big cities, lacking of parking space.
              </p>
              <p>For not having a free space to park, drivers mostly leave their cars right on the street. This absolutely makes traffic get worse and introduces to more accidents.</p>
              <p>Proudly, we launch into Smartpark and bring you the best choice to resolve the problem. Members in our team:</p>
              <ul>
                <li>Tran Tan Chung (Leader)</li>
                <li>Nguyen Thanh Hoan</li>
                <li>Hoang Trinh Anh Thai</li>
                <li>Nguyen Van Tuan</li>
              </ul>
              <p>For more information, please contact us at: smartpark@hehe.com</p>
            </div>
        </transition>
      </div>
      <div class="column">
        <transition appear appear-active-class="animate__animated animate__lightSpeedInRight">
            <div class="about__image">
              <figure class="image">
                <img src="@/assets/about.png" alt />
              </figure>
            </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style lang="scss" scoped>
.about {
  h1 {
    color: #3f3d56;
  }
  p,
  li {
    color: #3f3d56d9;
    font-size: 1.25rem;
  }
}
</style>