<template>
  <div class="layout-container" :key="$route.path">
    <header-container></header-container>
    <div class="layout-main-con">
      <Menu />
      <div class="layout-main-container">
        <router-view style="height:calc(100% - 59px);overflow-y: scroll;" id="router-view"></router-view>
        <div class="botton-container">Powered by BOSS开播v2.5.7 © 2014-2015 升级微信1976633855</div>
      </div>
      <Order />
    </div>
  </div>
</template>

<script>
import HeaderContainer from "./header.vue";
import Menu from "./menu.vue";
import Order from "./order.vue";
export default {
  name: "layout",
  components: {
    Menu,
    HeaderContainer,
    Order,
  },
};
</script>

<style scoped lang='scss'>
.layout-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .layout-main-con {
    height: calc(100vh - 54px);
  }
  .layout-main-container {
    transition: all 0.3s;
    margin-left: 258px;
    margin-right: 180px;
    box-sizing: border-box;
    padding: 17px 20px 0;
    background: #f5f7f9;
    height: 100%;
    .botton-container {
      margin-top: 17px;
      width: 100%;
      height: 40px;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-family: Microsoft YaHei;
      color: rgba(153, 153, 153, 1);
    }
  }
}
#router-view {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    display: none !important;
    background: transparent !important;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    display: none !important;
    background: transparent !important;
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    display: none !important;
    background: transparent !important;
  }
}
</style>