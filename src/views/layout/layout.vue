<template>
  <div class='layout-container' :key='$route.path'>
      <header-container></header-container>
      <div class='layout-main-con'>
        <Menu />
        <div class='layout-main-container'>
            <router-view ></router-view>
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
  }
}
</style>