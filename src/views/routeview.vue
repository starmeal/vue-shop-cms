<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    console.log(this.$route, '11122')
  }
};
</script>

<style>
</style>
