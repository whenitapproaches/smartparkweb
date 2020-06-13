<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";
@import "../node_modules/animate.css/animate.min.css";
@import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&display=swap");
@import url("https://cdn.jsdelivr.net/npm/fontisto@v3.0.4/css/fontisto/fontisto.min.css");

#app {
  font-family: "Heebo", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
