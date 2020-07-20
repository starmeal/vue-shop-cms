<template>
  <div class='layout-container' :key='$route.path'>
      <header-container></header-container>
      <div class='layout-main-con'>
        <Menu />
        <div class='layout-main-container'>
            <router-view style='height:calc(100% - 61px);overflow-y: scroll'></router-view>
            <div class='botton-container'>Powered by BOSS开播v2.5.7 © 2014-2015 升级微信1976633855</div>
        </div>
        <Order />
      </div>
  </div>
</template>

<script>
import HeaderContainer from './header.vue'
import Menu from './menu.vue'
import Order from './order.vue'
export default {
    name: 'layout',
    components: {
      Menu,
      HeaderContainer,
      Order
    }
}
</script>

<style scoped lang='scss'>
.layout-container{
  height: 100%;
  width:100%;
  overflow: hidden;
  .layout-main-con{
    width:100%;
    display: flex;
    height:calc(100vh - 54px);
  }
  .layout-main-container{
    flex:1;
    box-sizing: border-box;
    padding: 17px 20px 0 ;
    background: #F5F7F9;
    height: 100%;
    .botton-container{
      margin-top: 17px;
      width:100%;
      height:42px;
      background:#FFFFFF;
      display:flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>