<template>
  <div class="big-container">
    <section class="form-container">
      <el-form ref="form" :model="form" label-width="150px">
        <div class="title title-margin">
          <Icon icon="jibenxinxi" class="authentication-title" />基本信息
        </div>
        <el-form-item label="商品类型" prop="noticeName">
          <el-select v-model="value" placeholder="请选择商品类型" :size="size" class="">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import Icon from "@/components/base/icon.vue";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      form:"",
      size: "small",
      value: "",
      form: {
        noticeName: "",
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.font-f {
  font-size: 12px;
  color: #606266;
  margin-right: 20px;
  flex: 1;
  text-align: right;
}
.flex-box {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.hidden-box {
  width: 0px;
  height: 0px;
}
.img-licenseImgUrl {
  width: 100%;
  height: 100%;
}
.title {
  width: 100%;
  height: 48px;
  line-height: 48px;
  padding-left: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-family: Microsoft YaHei, MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  border-bottom: solid 2px #fff;
  box-sizing: border-box;
}
.title-margin {
  margin-bottom: 18px;
}
</style>
