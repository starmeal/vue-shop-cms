<template>
  <span class="container">
    <!-- <el-cascader
    clearable
     v-if="value !== null"
      :value="value"
       :options="cityList"
       @change="demochange"
        :props="optionProps"></el-cascader> -->
    <el-cascader
     clearable
      v-if="value !== null"
       :size="size"
        placeholder="请选择"
        :options="cityList"
         :props="optionProps"
          v-model="value"
           @change="handleChange" />
    <el-cascader clearable v-else :size="size" placeholder="请选择" :options="cityList" :props="optionProps" v-model="value" @change="handleChange" />
  </span>
</template>

<script>
// 省市区json文件
import city from './district.json';
export default {
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
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      value: null,
      optionProps: {
        value: 'adcode',
        label: 'name',
        children: 'districts'
      }
    };
  },
  methods: {
    demochange(val) {
      console.log(val);
      // this.$emit('changecity', value);
    },
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
    // 获取选中得值传出
    handleChange(value) {
      console.log(value);
      this.$emit('changecity', value);
    }
  },
  created() {
    console.log(this.cityvalue);
    //   初始化省市区联动
    if (this.cityvalue.length == 0) {
      if (this.level == 'city') {
        this.value = '';
      } else {
        this.value = ['230000', '230100'];
      }
    } else {
      this.value = null;
      this.$nextTick(() => {
        this.value = this.cityvalue;
      });
    }
    this.cityList = JSON.parse(JSON.stringify(city.districts[0].districts));
    this.initCityList(this.cityList);
  },
  components: {}
};
</script>

<style scoped lang="scss">
</style>
