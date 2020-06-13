<template>
  <div class="page">
    <div class="image">
      <img src="@/assets/404.png" alt />
      <router-link :to="{name: 'Home'}" class="button">BACK HOME</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .image {
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .button {
      background-color: #3772ff;
      padding: 2rem 2.5rem;
      color: white;
      border-radius: 0;
      outline: none;
      letter-spacing: 3px;
      font-weight: bold;
      transition: .3s ease;
      &:hover {
          transform: translateY(-10px);
          box-shadow: 10px 10px 0 rgba(#3772ff, 0.2);
      }
  }
}
</style>

<script>
export default {
  name: "NotFound"
}
</script>

