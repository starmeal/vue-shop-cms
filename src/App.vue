<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100vh;
}
* {
  margin: 0;
  padding: 0;
  // user-select: none;
}
#app {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background: #f5f7f9;
  min-width: 1080px;
  overflow: none;
  position: relative;
}

// ::-webkit-scrollbar {
//   /*滚动条整体样式*/

//   display: none !important;
//   background: transparent !important;
// }

// ::-webkit-scrollbar-thumb {
//   /*滚动条里面小方块*/
//   display: none !important;
//   background: transparent !important;
// }

// ::-webkit-scrollbar-track {
//   /*滚动条里面轨道*/
//   display: none !important;
//   background: transparent !important;
// }

.el-popover {
  overflow-y: scroll;
  max-height: 60vh;
}
</style>
