<template>
  <div>
    <el-button @click="add">添加</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    add(row) {
      let obj = {
        path: "/expressDeliveryAdd",
        query:{
          id: 'row.id',
        }
      };
      // if (row ) {
      //   obj.query = {
      //     id: row.id,
      //   };
      // }
      this.$router.push(obj);
    },
  },
};
</script>

<style>
</style>