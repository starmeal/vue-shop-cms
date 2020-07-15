<template>
   <div>
        i am home 
   </div>
</template>

<script>

export default {
   created () {
      console.log(this.$store.state.user, 'node_modules')
   }
}
</script>

<style>

</style>