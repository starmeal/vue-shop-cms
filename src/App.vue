<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  user-select: none;
}
#app {
  width: 100%;
  height: 100vh;
  background: #f5f7f9;
  min-width: 1080px;
  overflow: none;
  position:relative;
}
</style>
