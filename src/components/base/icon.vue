<template>
  <svg class="base-icon" aria-hidden="true" :style='iconStyle'>
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<script>
import './icon';
export default {
  name: 'base-icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
        type: String,
        default: "#333333"
    }
  },
  computed: {
      iconStyle () {
          let iconStyle = {};
          if (this.color) {
              iconStyle.color = this.color
              return iconStyle
          }
      }
  }
};
</script>

<style>
.base-icon {
    width: 16px ; height: 16px ;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
  }
</style>