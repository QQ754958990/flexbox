<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  html,body{
    width: 100%;
    min-width: 900px;
    height: 100%;
    min-height: 350px;
    background-color: #3c3434;
    #app{
      display: flex;
      place-content: flex-start center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
</style>
