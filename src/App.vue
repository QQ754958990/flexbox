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
  @import url('../static/css/grid.css');

  html,body{
    width: 100%;
    height: 100%;
    background-color: #3c3434;
    background-image: url("../static/img/bj.png");
    #app{
      display: flex;
      place-content: flex-start center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
</style>
