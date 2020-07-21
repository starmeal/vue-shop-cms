<template>
  <span class="container">
    <el-cascader clearable :size="size" placeholder="请选择" :options="cityList" :props="optionProps" :value="cityvalue" @change="handleChange"/>
  </span>
</template>

<script>
  // 省市区json文件
  import city from './district.json';
  export default {
    model: {
      prop: 'cityvalue',
      event: 'change'
    },
    props: {
      level: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'mini'
      },
      cityvalue: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        options: [],
        value: null,
        optionProps: {
          value: 'adcode',
          label: 'name',
          children: 'districts'
        }
      };
    },
    methods: {
      // 递归处理空数组
      initCityList(list) {
        list.forEach(element => {
          //   判断省市||省市区
          if (this.level == 'city') {
            if (element.level == 'city' || element.districts.length == 0) {
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
      },
      handleChange (e) {
        this.$emit('change', e)
      }
    },
    created() {
      this.cityList = JSON.parse(JSON.stringify(city.districts[0].districts));
      this.initCityList(this.cityList);
      //   初始化省市区联
    },
    components: {}
  };
</script>

<style scoped lang="scss">
</style>
