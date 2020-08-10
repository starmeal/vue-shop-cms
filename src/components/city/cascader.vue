<template>
  <span class="container">
    <el-cascader
      :style="{width:width}"
      clearable
      :disabled="disabled"
      :size="size"
      placeholder="请选择"
      :options="cityList"
      :props="optionProps"
      :value="cityvalue"
      @change="handleChange"
    />
  </span>
</template>

<script>
// 省市区json文件
import axios from "axios";
// import city from "./district.json";
export default {
  model: {
    prop: "cityvalue",
    event: "change",
  },
  props: {
    width: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "mini",
    },
    cityvalue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      cityList: [],
      options: [],
      value: null,
      optionProps: {
        value: "adcode",
        label: "name",
        children: "districts",
      },
    };
  },
  methods: {
    // 递归处理空数组1
    initCityList(list) {
      list.forEach((element) => {
        //   判断省市||省市区
        if (this.level == "city") {
          if (element.level == "city" || element.districts.length == 0) {
            delete element.districts;
            return false;
          }
        } else {
          if (element.districts.length == 0) {
            delete element.districts;
            return false;
          }
        }
        if (element.districts.length) {
          this.initCityList(element.districts);
        }
      });
      return list;
    },
    handleChange(e) {
      this.$emit("change", e);
    },
  },
  created() {
    axios
      .get(
        "https://restapi.amap.com/v3/config/district?keywords=中国&subdistrict=3&key=53db67bb6768fb1da369ea6603e05e1b"
      )
      .then((res) => {
        if (res.statusText == "OK") {
          this.cityList = this.initCityList(
            JSON.parse(JSON.stringify(res.data.districts[0].districts))
          );
        }
      });
    //   初始化省市区联
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>
