<template>
  <div class='order-main-container' :class="{'order-container-spread': isSpread}">
    <div :class="['order-container', {'order-container-spread': isSpread}]" ref='orderContainer'>
      <el-collapse v-model="activeName">
        <el-collapse-item name="1">
          <div slot="title" class='order-icon-container'>
            <i class="order-icon el-icon-info"></i>订单
          </div>
          <div class='order-item-con' v-if='deliveredCount'>
            待发货订单
            <div class='count'>({{deliveredCount}})</div>
          </div>
          <div class='order-item-con' v-if='afterSaleCount'>
            售后订单
            <div class='count'>({{afterSaleCount}})</div>
          </div>
          <div class='order-item-con' v-if='!deliveredCount && !afterSaleCount'>
            <template>
              暂无提醒消息
            </template>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <div slot="title" class='order-icon-container'>
            <i class="order-icon el-icon-info"></i>咨询
          </div>
          <div class='order-item-con'>
            订单咨询
            <div class='count'>(2)</div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <div slot="title" class='order-icon-container'>
            <i class="order-icon el-icon-info"></i>评价
          </div>
          <div class='order-item-con' v-if='evaCount'>
            <template>
              待评价回复
              <div class='count'>({{evaCount}})</div>
            </template>
          </div>
          <div class='order-item-con' v-else>
            <template>
              暂无提醒消息
            </template>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="order-bottom" @click='handleisSpread'>收起面板</div>
    </div>
    <div :class="['order-bottom-notice', {'order-bottom-notice-spread': !isSpread}]" @click='handleisSpread'>消息提醒</div>
  </div>
</template>

<script>
import { throttle } from '@/utils/util.js';
import { getOrderMessage } from '@/api/login';
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('user');
export default {
  name: 'order',
  data() {
    return {
      deliveredCount: '',
      afterSaleCount: '',
      evaCount: '',
      isSpread: true,
      activeName: '1'
    };
  },
  created() {
    this.getOrderMessage();
  },
  computed: {
    ...mapState({
      shopMerchantsCode: 'code'
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.handle();
      window.addEventListener(
        'resize',
        throttle(
          () => {
            this.handle();
          },
          20,
          true
        )
      );
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handle);
  },
  methods: {
    getOrderMessage() {
      getOrderMessage({
        shopMerchantsCode: this.shopMerchantsCode
      }).then(
        ({ code, body: { afterSaleCount, deliveredCount, evaCount } }) => {
          this.afterSaleCount = afterSaleCount;
          this.deliveredCount = deliveredCount;
          this.evaCount = evaCount;
        }
      );
    },
    handle() {
      let windowWith =
        document.documentElement.clientWidth || document.body.clientWidth;
      this.$refs.orderContainer.style = 'none';
      if (windowWith < 1080 && this.isSpread) {
        this.isSpread = false;
        return false;
      }
      if (windowWith >= 1080 && !this.isSpread) {
        this.isSpread = true;
      }
    },
    handleisSpread() {
      this.isSpread = !this.isSpread;
      let windowWith =
        document.documentElement.clientWidth || document.body.clientWidth;
      if (this.isSpread) {
        this.$refs.orderContainer.style.position = 'fixed';
        this.$refs.orderContainer.style.right = '0px';
        this.$refs.orderContainer.style.bottom = '0px';
      } else {
        this.$refs.orderContainer.style.position = 'fixed';
        this.$refs.orderContainer.style.right = '-180px';
        this.$refs.orderContainer.style.bottom = '0px';
      }
      // if (windowWith < 1080) {
      //   this.$nextTick(() => {
      //     if (this.isSpread) {
      //       console.log('2222223333');
      //       this.$refs.orderContainer.style.position = 'fixed';
      //       this.$refs.orderContainer.style.right = '0px';
      //       this.$refs.orderContainer.style.bottom = '0px';
      //     } else {
      //       console.log('11111222');
      //       this.$refs.orderContainer.style.position = 'fixed';
      //       this.$refs.orderContainer.style.right = '-180px';
      //       this.$refs.orderContainer.style.bottom = '0px';
      //     }
      //   });
      // } else {
      //   console.log('在这里输出了');
      // }
    }
  }
};
</script>

<style scoped lang='scss'>
.order-main-container {
  position: relative;
  height: calc(100vh - 54px);
  overflow: hidden;
  width: 0px;
  transition: all 0.3s linear;
  &.order-container-spread {
    width: 180px !important;
  }
  .order-container {
    width: 180px;
    height: calc(100vh - 54px);
    background: #fff;
    position: absolute;
    bottom: 0;
    right: -180px;
    transition: all 0.3s linear;
    z-index: 10000;
    &.order-container-spread {
      right: 0px;
    }
    & ::v-deep .el-collapse {
      border: none;
    }
    & ::v-deep .el-collapse-item__header {
      height: 64px !important;
      display: flex;
      cursor: pointer;
    }
    & ::v-deep .el-collapse-item__content {
      padding-bottom: 0px;
    }
    & ::v-deep .order-item-con {
      width: 180px;
      height: 64px;
      background: rgba(239, 239, 239, 1);
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding-left: 45px;
      padding-right: 6px;
      cursor: pointer;
      .count {
        font-size: 13px;
        font-family: Microsoft YaHei;
        color: rgba(244, 74, 74, 1);
      }
    }
    .order-icon-container {
      display: flex;
      height: 64px;
      width: 180;
      align-items: center;
      flex: 1;
      box-sizing: border-box;
      padding-left: 20px;
      font-size: 13px;
      font-family: Microsoft YaHei;
      color: rgba(51, 51, 51, 1);
      .order-icon {
        font-size: 16px;
        margin-right: 10px;
      }
    }
  }
  .order-bottom {
    position: absolute;
    width: 180px;
    height: 42px;
    background: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    font-size: 13px;
    font-family: Microsoft YaHei;
    color: rgba(51, 51, 51, 1);
    cursor: pointer;
  }
  .order-bottom-notice {
    cursor: pointer;
    position: fixed;
    visibility: hidden;
    right: -180px;
    bottom: 0;
    width: 0px;
    height: 0px;
    background: rgba(68, 171, 247, 1);
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s linear;
    &.order-bottom-notice-spread {
      right: 0;
      width: 180px;
      height: 42px;
      visibility: visible;
    }
  }
}
</style>