<template>
  <div class="merchants-container" ref="merchantsContainer">
    <div>
      <div class="titile">店铺余额</div>
      <section class="felx-sb">
        <div>
          <div class="zizirujian">可用店铺余额(元)</div>
          <div style="font-size:10px">可用店铺余额=店铺余额-不可用店铺余额</div>
          <div class="flex-btn" style="margin-top: 15px;">
            <div class="nan-b">888.55</div>
            <el-button type="primary" size="mini">提现</el-button>
            <el-button type="text">提现明细</el-button>
          </div>
        </div>
        <div>
          <div class="zizirujian">待结算(元)</div>
          <div style="font-size:10px">交易未完成的订单总额，消费者确认收货后将自动转入店铺余额</div>
          <div class="flex-btn" style="margin-top: 15px;">
            <div class="nan-b">88.55</div>
          </div>
        </div>
        <div>
          <div class="zizirujian">不可用余额(元)</div>
          <div style="font-size:10px">提现中或者退款中的冻结店铺余额</div>
          <div class="flex-btn" style="margin-top: 15px;">
            <div class="nan-b">888.55</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { bankCardList, deleteBankCard, updateBankCard } from "@/api/bank";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.felx-sb {
  display: flex;
  width: 100%;
}
.felx-sb > div {
  flex: 1;
}
.titile {
  font-weight: 700;
  font-size: 16px;
  color: rgb(16, 16, 16);
  font-style: normal;
  margin-bottom: 20px;
}
.nan-b {
  margin-right: 20px;
  font-weight: 700;
  font-size: 24px;
  color: rgb(16, 16, 16);
  font-style: normal;
}
.zizirujian {
  font-size: 14px;
  color: rgb(16, 16, 16);
  font-style: normal;
  letter-spacing: 0px;
  line-height: 20px;
}
.flex-top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mini-flex {
  display: flex;
  align-items: center;
}
.btn-box {
  background: #fff;
  padding-top: 20px;
  padding-bottom: 5px;
}
.text-ee {
  color: #666666;
  font-size: 12px;
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
}
.yichu {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.page-box {
  background-color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.merchants-container {
  background-color: #fff;
  padding: 20px 30px;
  box-sizing: border-box;
  min-height: 100%;
  position: relative;
}
.num-container {
  padding: 10px;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
}
.el-input-s {
  width: 200px;
}
.operation-container {
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.table-container {
  border-top: 10px solid #ffffff;
  width: 100%;
}
.count-num {
  display: inline-block;
  padding: 10px;
  border: solid 1px #f0f0f0;
  font-size: 15px;
  color: #333;
  margin-right: 10px;
  display: flex;
  min-width: 20%;
}
.count-num i {
  font-size: 30px;
  margin-right: 10px;
}
.icon-1 {
  color: #409eff;
}
.icon-2 {
  color: #409eff;
}
.icon-3 {
  color: #409eff;
}
.ovhdien {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-search {
  border-radius: 0px;
  margin-left: 20px;
}
.icon-content {
  border: solid 1px #efefef;
  border-radius: 2px;
  padding: 4px;
  display: inline-block;
  box-sizing: border-box;
  font-size: 12px;
}
.flex-btn {
  display: flex;
  align-items: center;
}
.zhuangtai {
  // color: $primary;
}
.ossd {
  position: absolute;
  top: 129px;
  width: 100%;
  height: 10px;
  background: #fcc;
  z-index: 1000;
}
.top-fixed {
  width: 69%;
  height: 35px;
  left: 18%;
  z-index: -100;
  background: #fcc;
  position: fixed;
  top: 129px;
}
.felx-top-btn {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.felx-top-btn .el-button {
  flex: 1;
}
</style>