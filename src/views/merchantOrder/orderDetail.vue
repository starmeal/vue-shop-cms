<template>
  <div>
    <div class="order-Detail">
      <div class="flex-top">
        <div>订单编号：</div>
        <div>下单时间：</div>
      </div>
      <div class="order-statusBox">
        <div>
          <div class="status-title">商家已发货，等待交易成功</div>
          <div class="status-title">[男鞋男鞋]买家申请了退款</div>
          <el-button>处理退款</el-button>
          <div class="status-title">[男鞋男鞋]买家申请了退款</div>
          <el-button>处理换货</el-button>
        </div>
        <div class="flex-container">
          <el-steps :active="1" align-center style="width:99%">
            <el-step title="步骤 1" description="这段就没那么长了"></el-step>
            <el-step title="步骤 2" description="这段就没那么长了"></el-step>
            <el-step title="步骤 3" description="这段就没那么长了"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="tips-box">
        <div>和商有品提醒：</div>
        <div class="tips-text">
          <div>交易成功，和商有品将把贷款结算至你的店铺账户余额，你可以申请提现</div>
          <div>请及时关注你发出的包裹状态，确保能配送至卖家手中；</div>
          <div>如果卖家表示未收到货或者货物有问题，请及时联系买家积极处理，友好协商</div>
        </div>
      </div>
      <div class="tab-deep">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
        <div class="tips-boxs">
          <div>
            <div>发货方式：快递</div>
            <div>发货人：1233123123</div>
            <div>发货时间：1233123123</div>
            <div>运单号：中通快递</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>

    <!-- 修改地址弹窗 -->
    <!-- <el-dialog title="修改收货地址" :visible.sync="dialogFormVisible">
        <el-alert title="仅支持修改一次,请务必在买家知情且同意下修改收货信息" type="warning" :closable="false"></el-alert>
        <el-form
          :model="addressform"
          :rules="addressformrules"
          label-width="90px"
          style="margin-top:20px"
        >
          <el-form-item label="收货人" prop="custName">
            <el-input v-model="addressform.custName" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="custMobile">
            <el-input v-model="addressform.custMobile" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="联系地址">
            <el-select v-model="addressform.custAddressD" placeholder="请选择城市区" style="width:300px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="custAddress">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入详细地址"
              v-model="addressform.custAddress"
              style="width:300px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateAddress">确 定</el-button>
        </div>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 0,
    };
  },
  methods: {
    // 修改地址
    updateAddress(item) {
      if (!this.dialogFormVisible) {
        let { orderCode, custMobile, custName, custAddress } = item;
        this.addressform.orderCode = orderCode;
        this.addressform.custMobile = custMobile;
        this.addressform.custName = custName;
        this.addressform.custAddress = custAddress;
        this.dialogFormVisible = true;
        console.log(this.addressform);
      } else {
        updateCustAddressInfo(this.addressform).then((res) => {
          this.$message({
            message: "修改地址成功啦",
            type: "success",
            center: true,
          });
          this.dialogFormVisible = false;
          this.addressform = {
            orderCode: "",
            custName: "",
            custMobile: "",
            custAddress: "",
            custAddressD: "",
          };
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order-Detail {
  min-height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  font-size: 12px;
}
.flex-top {
  display: flex;
  width: 100%;
}
.flex-top > div {
  margin-right: 20px;
}
.order-statusBox {
  display: flex;
  box-sizing: border-box;
  background: #fdfdfd;
  width: 100%;
  border: solid 1px #e4e7ed;
  margin-top: 10px;
}
.order-statusBox > div:first-of-type {
  flex: 0 0 40%;
  border-right: 1px #e4e7ed solid;
  padding: 20px;
}
.order-statusBox > div:last-of-type {
  flex: 0 0 60%;
  padding: 20px;
  box-sizing: border-box;
}
.status-title {
  padding: 10px 0px;
  color: #2b2b2b;
}
.status-title:first-of-type {
  font-weight: bold;
  font-size: 16px;
  color: #000;
}
.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tips-box {
  display: flex;
  width: 100%;
  padding: 20px 0px;
  border-bottom: solid 1px #e4e7ed;
  box-sizing: border-box;
  border-right: solid 1px #e4e7ed;
  border-left: solid 1px #e4e7ed;
  margin-bottom: 20px;
}
.tips-box > div:first-of-type {
  padding-left: 20px;
  color: rgb(240, 186, 8);
  line-height: 30px;
}
.tips-text > div {
  line-height: 30px;
}
</style>
<style>
.flex-container /deep/ .is-finish {
  font-size: 12px;
}
.flex-container /deep/ .el-step__title {
  font-size: 12px;
}
.tab-deep /deep/ .el-tabs__item {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
.tab-deep /deep/ .el-tabs__header {
  margin-bottom: 0px;
}
.tips-boxs {
  display: flex;
  width: 100%;
  padding: 20px 20px;
  border-bottom: solid 1px #e4e7ed;
  box-sizing: border-box;
  border-right: solid 1px #e4e7ed;
  border-left: solid 1px #e4e7ed;
  margin-bottom: 20px;
  line-height: 20px;
}
</style>