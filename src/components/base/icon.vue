<template>
  <svg class="base-icon" :class="className" aria-hidden="true" :style="iconStyle">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
import "./icon";
import "./iconone";
export default {
  name: "base-icon",
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
    },
    color: {
      type: String,
      default: "#333333"
    }
  },
  computed: {
    iconStyle() {
      let iconStyle = {};
      if (this.color) {
        iconStyle.color = this.color;
        return iconStyle;
      }
    }
  }
};
</script>

<style>
.base-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>