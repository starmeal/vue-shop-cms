<template>
  <div>
      i am 商品管理
      <button v-permission="['a']">{{100 | calculate('add', 1000)}}</button>
      <input type="text" :value="100 | calculate('add', 1000)">
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>