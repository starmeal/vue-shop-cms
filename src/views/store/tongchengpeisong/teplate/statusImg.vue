<template>
  <div class="img">
    <img
      v-if="status=='unselected'"
      class="statusImg"
      :src="require('../icon/quanbu.png')"
    />
    <img v-if="status=='checkAll'" class="statusImg" :src="require('../icon/quanxuan.png')" />
    <img v-if="status=='halfselected'" class="statusImg" :src="require('../icon/banxuan.png')" />
    <img v-if="status=='forbidden'" class="statusImg" :src="require('../icon/disabled.png')" />
    <img v-if="!status" class="statusImg" :src="require('../icon/quanbu.png')" />
  </div>
</template>

<script >
export default {
  props: ["status"],
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style   >
.statusImg {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}
.img {
  display: inline-block;
}
</style>
