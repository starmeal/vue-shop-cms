<template>
  <div>
    <div class="container">
      <div class="top-container">
        <div class="top-box">
          <section class="top-flex">
            <div
              class="big-title"
              :class="aftersaleinfo.isYellow == 1 ? 'isYellow' : ''"
            >{{aftersaleinfo.aftersaleStatusText}}</div>
            <div class="code-box">售后编号：{{aftersaleinfo.asaleCode}}</div>
            <div class="name-box">
              申请人：
              <span>{{aftersaleinfo.nickName}}</span>
              <span>申请时间：{{aftersaleinfo.applyTime}}</span>
            </div>
          </section>
          <div
            class="top-second"
            v-html="aftersaleinfo.countDownText"
            v-if="this.timetime && aftersaleinfo.isYellow == 0"
          ></div>
          <div class="top-last">
            <span v-if="aftersaleinfo.canDoText && aftersaleinfo.canDoText.length">还可以：</span>
            <span
              v-for="(item,index) in aftersaleinfo.canDoText"
              :key="index"
              @click="justsoso(index)"
            >
              {{item}}
              <span v-if="index != aftersaleinfo.canDoText.length-1">,</span>
            </span>
            <span style="color:#666" v-if="aftersaleinfo.isYellow == 1">还可以：</span>
            <span
              @click="lookmoeny"
              v-if="aftersaleinfo.isYellow == 1 && (aftersaleinfo.aftersaleType == 1 || aftersaleinfo.aftersaleType == 3)"
              class="lookmoeny"
            >查看钱款去向</span>
            <span v-if="aftersaleinfo.isYellow == 1  && aftersaleinfo.aftersaleType == 4">买家已收获换货完成</span>
            <!-- <span>立即发货</span> -->
          </div>
        </div>
        <div class="tips-box" v-if="aftersaleinfo.remindText && aftersaleinfo.remindText.length">
          <div>和商有品提醒：</div>
          <div class="tips-text">
            <div v-for="(item,index) in aftersaleinfo.remindText" :key="index">{{item}}</div>
            <!-- <div>如果未发货，请点击同意退款给买家</div>
            <div>如果实际已发货，请主要与买家联系</div>
            <div>如果你逾期未处理，视作同意买家申请，系统将自动退款给买家。</div>-->
          </div>
        </div>
      </div>
      <div class="buy-info">
        <div>
          <section>售后商品</section>
          <section class="goods-content">
            <img :src="aftersaleinfo.thumbImg" style="width:80px;height:80px" />
            <div>
              <div>{{aftersaleinfo.productName}}</div>
              <div>{{aftersaleinfo.goodsSku}}</div>
            </div>
          </section>
        </div>
        <div>
          <section>售后信息</section>
          <section>
            售后方式：
            <span style="color:#ff0000">{{aftersaleinfo.aftersaleTypeText}}</span>
          </section>
          <section v-if="aftersaleinfo.aftersaleType == 4">换货件数：{{aftersaleinfo.aftersaleNum}}</section>
          <section v-else>退款金额：{{aftersaleinfo.refundAmount}}</section>
          <!-- <section>联系方式：{{aftersaleinfo.userMobile}}</section> -->
          <section>退款原因：{{aftersaleinfo.aftersaleReason}}</section>
          <!-- <section>退款说明:{{aftersaleinfo.aftersaleReason}}</section> -->
          <!-- <section>售后历史：{{aftersaleinfo.historyAftersaleNum}}</section> -->
        </div>
        <div>
          <section>购买信息</section>
          <section>
            商品单价：
            <span style="color:#ff0000">{{aftersaleinfo.payPrice}} × {{aftersaleinfo.number}}件</span>
          </section>
          <section>
            实付金额：
            <span
              style="color:#ff0000"
              v-if="aftersaleinfo.payPrice && aftersaleinfo.number"
            >{{aftersaleinfo.payPrice * aftersaleinfo.number}}</span>
          </section>
          <section>
            发货件数：
            {{aftersaleinfo.number}}
          </section>
          <section>发货状态：{{aftersaleinfo.orderDeliveryStatus == 0 ? '未发货' : '已发货'}}</section>
          <section>
            订单编号：
            <span style="color:#44abf7">{{aftersaleinfo.orderCode}}</span>
          </section>
        </div>
        <div v-if="aftersaleinfo.merAddress">
          <section>退货地址</section>
          <section>
            联系电话：
            {{aftersaleinfo.merMobile}}
          </section>
          <section>
            联系人：
            {{aftersaleinfo.merName}}
          </section>
          <section class="flex-nima">
            <div>退货地址：</div>
            <div>{{aftersaleinfo.merAddress}}</div>
          </section>
        </div>
      </div>
      <div class="btn-box">
        <!-- 退款 -->
        <div v-if="aftersaleinfo.aftersaleType == 1 && aftersaleinfo.aftersaleStatus == '997'">
          <el-button type="primary" @click="queren">同意{{aftersaleinfo.aftersaleTypeText}}</el-button>
          <el-button @click="jujue">拒绝{{aftersaleinfo.aftersaleTypeText}}</el-button>
        </div>
        <!-- 退货退款 -->
        <div v-if="aftersaleinfo.aftersaleType == 3 && aftersaleinfo.aftersaleStatus == '997'">
          <el-button type="primary" @click="queren">同意{{aftersaleinfo.aftersaleTypeText}}</el-button>
          <el-button @click="jujue">拒绝{{aftersaleinfo.aftersaleTypeText}}</el-button>
        </div>
        <!-- 退货确认收货 -->
        <div v-if="aftersaleinfo.aftersaleType == 3 && aftersaleinfo.aftersaleStatus == '993'">
          <el-button type="primary" @click="shouhuo(1)">确认收货并退款</el-button>
          <el-button @click="shouhuo(2)">拒绝收货</el-button>
        </div>
        <!-- 换货 -->
        <div v-if="aftersaleinfo.aftersaleType == 4 && aftersaleinfo.aftersaleStatus == '997'">
          <el-button type="primary" @click="queren">同意{{aftersaleinfo.aftersaleTypeText}}</el-button>
          <el-button @click="jujue">拒绝{{aftersaleinfo.aftersaleTypeText}}</el-button>
        </div>
        <!-- 换货确认收货并发货 -->
        <div v-if="aftersaleinfo.aftersaleType == 4 && aftersaleinfo.aftersaleStatus == '993'">
          <el-button type="primary" @click="shouhuobingfahuo">确认收货并发货</el-button>
          <el-button @click="shouhuo(2)">拒绝收货</el-button>
        </div>
      </div>
    </div>
    <!-- 退款同意 -->
    <el-dialog :visible.sync="dialogVisible" width="40%">
      <span style="font-size:16px" slot="title">售后维权处理</span>
      <el-alert title="商家同意后，退款将自动原路退后买家付款账户" type="warning" :center="true" :closable="false"></el-alert>
      <div style="margin-top:20px">售后方式：{{aftersaleinfo.aftersaleTypeText}}</div>
      <div style="margin-top:20px">
        退款金额：
        <span style="color:#ff0000">￥{{aftersaleinfo.refundAmount}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queren">确认退款</el-button>
      </span>
    </el-dialog>
    <!-- 退款决绝弹窗 -->
    <el-dialog :visible.sync="dialogVisible1" width="40%">
      <span style="font-size:16px" slot="title">售后维权处理</span>
      <el-alert
        title="建议你与买家协商后,在确定是否拒绝退款，如果拒绝退款后，买家可以修改退款申请协议重新发起退款。"
        type="warning"
        :closable="false"
      ></el-alert>
      <div style="margin-top:20px">售后方式：{{aftersaleinfo.aftersaleTypeText}}</div>
      <div style="margin-top:20px">
        退款金额：
        <span style="color:#ff0000">￥{{aftersaleinfo.refundAmount}}</span>
      </div>
      <div style="margin-lef：20px" class="jue-js">
        <span>据决原因：</span>
        <el-input style="width:300px;" type="textarea" v-model="juejuetext"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="jujue">确认拒绝</el-button>
      </span>
    </el-dialog>
    <!-- 查看欠款去向 -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" width="80%">
      <span style="font-size:16px" slot="title">查看欠款去向</span>
      <div class="flex-s">
        <div>
          退款/返现总额:
          <span>{{aftersaleinfo.refundAmount}}</span>
        </div>
        <div>
          订单：
          <span style="color:#44abf7">{{aftersaleinfo.orderCode}}</span>
        </div>
      </div>
      <el-table :data="gridData">
        <el-table-column property="refundId" label="退款流水号">
          <template slot-scope="prop">{{prop.row.refundId ? prop.row.refundId : '--'}}</template>
        </el-table-column>
        <el-table-column property="applyTime" label="申请时间"></el-table-column>
        <el-table-column property="refundMode" label="退款方式"></el-table-column>
        <el-table-column property="refundAmount" label="金额（元）"></el-table-column>
        <el-table-column property="refundStutas" label="状态"></el-table-column>
        <el-table-column property="operator" label="操作者"></el-table-column>
        <el-table-column property="aftersaleReason" label="退款原因"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 退货退款换货同意弹窗 -->
    <el-dialog :visible.sync="dialogVisible2" width="40%">
      <span style="font-size:16px" slot="title">售后维权处理</span>
      <el-alert title="商家同意后，退款将自动原路退后买家付款账户" type="warning" :center="true" :closable="false"></el-alert>
      <div style="margin-top:20px">售后方式：{{aftersaleinfo.aftersaleTypeText}}</div>
      <template v-if="aftersaleinfo.aftersaleType != 4">
        <div style="margin-top:20px">
          退款金额：
          <span style="color:#ff0000">￥{{aftersaleinfo.refundAmount}}</span>
        </div>
        <div style="margin-top:20px">
          退货件数：
          <span style="color:#ff0000">{{aftersaleinfo.aftersaleNum}}</span>
        </div>
      </template>
      <template v-else>
        <div style="margin-top:20px">
          换货件数：
          <span style="color:#ff0000">{{aftersaleinfo.aftersaleNum}}</span>
        </div>
      </template>
      <div>
        <div v-for="(item,index) in AddressData" :key="index" class="address-tel">
          <el-radio v-model="radio" :label="item.asuaId">
            <span>[{{item.recipientsName}}收]</span>
            <span>{{item.addressInfo}}</span>
            <span>{{item.recipientsTel}}</span>
            <span v-if="item.isDefaultAddress == 1" style="color:rgb(240, 186, 8)">默认</span>
          </el-radio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="queren">确认</el-button>
      </span>
    </el-dialog>
    <!-- 同意跟拒绝收货弹窗 -->
    <el-dialog :visible.sync="dialogVisible3" width="40%">
      <span style="font-size:16px" slot="title">售后维权处理</span>
      <el-alert
        title="需要你同意退款申请，买家才能退货给你，买家退货后你需要再次确认收货后，退款将自动原路退回至买家账户"
        type="warning"
        :center="true"
        :closable="false"
      ></el-alert>
      <div style="margin-top:20px">售后方式：{{aftersaleinfo.aftersaleTypeText}}</div>
      <template v-if="aftersaleinfo.aftersaleType != 4">
        <div style="margin-top:20px">
          退款金额：
          <span style="color:#ff0000">￥{{aftersaleinfo.refundAmount}}</span>
        </div>
        <div style="margin-top:20px">
          退货件数：
          <span style="color:#ff0000">{{aftersaleinfo.aftersaleNum}}</span>
        </div>
      </template>
      <template v-else>
        <div style="margin-top:20px">
          换货件数：
          <span style="color:#ff0000">{{aftersaleinfo.aftersaleNum}}</span>
        </div>
      </template>
      <div style="margin-top:20px">
        收货地址：
        <span>
          <span>[{{aftersaleinfo.merName}}收]</span>
          <span>{{aftersaleinfo.merAddress}}</span>
          <span>{{aftersaleinfo.merMobile}}</span>
        </span>
      </div>
      <div style="margin-lef：20px" class="jue-js" v-if="indexStaus == 2">
        <span>据决原因：</span>
        <el-input style="width:300px;" type="textarea" v-model="aftersaleRefuse"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="shouhuo" v-if="indexStaus == 1">确认收到退货</el-button>
        <el-button type="primary" @click="shouhuo" v-if="indexStaus == 2">
          <span v-if="aftersaleinfo.aftersaleType == 3">未收到货拒绝退款</span>
          <span v-if="aftersaleinfo.aftersaleType == 4">未收到货拒绝换货</span>
        </el-button>
      </span>
    </el-dialog>
    <!-- 确认收货并发货弹窗 -->
    <el-dialog title="确认收货并发货" :visible.sync="dialogTableVisible1">
      <div class="dilogTitle">
        <el-alert title="换货商品重新发货不会引起库存变化" type="warning" :center="true" :closable="false"></el-alert>
      </div>
      <el-table :data="huotable">
        <el-table-column property="date" label="商品" width="300px">
          <template slot-scope="props">
            <section class="flex-box" style="width:100%;padding: 0;">
              <div>
                <img class="thumbImg" :src="props.row.thumbImg" />
                <div class="product-name">
                  <p class="thumbImg-right">{{ props.row.productName }}</p>
                  <div
                    style="margin-left:10px;margin-top:10px"
                    v-show="props.row.goodsSku"
                  >{{props.row.goodsSku}}</div>
                </div>
              </div>
            </section>
          </template>
        </el-table-column>
        <el-table-column property="aftersaleNum" label="数量"></el-table-column>
        <el-table-column property="userLogisticsCode" label="运单号"></el-table-column>
      </el-table>
      <el-form label-width="70px">
        <el-form-item label="发货方式">
          <span style="font-size:12px" class="ems">自己联系快递</span>
          <div>
            <el-input
              v-model="fahuoform.merLogisticsCode"
              size="mini"
              @blur="onSubmit"
              style="width:300px;margin-right:20px"
              onkeyup="value=value.replace(/[\W]/g,'')"
            ></el-input>
          </div>
          <div>
            <el-select
              v-model="fahuoform.merShipperCode"
              placeholder="请选择"
              size="mini"
              style="width:300px"
            >
              <el-option
                v-for="(item, index) in kuaidiarr"
                :key="index"
                :label="item.ShipperName"
                :value="item.ShipperCode"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="disp" @click="shouhuobingfahuo">发货</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 还可以发货弹窗 -->
    <el-dialog title="发货" :visible.sync="dialogTableVisible2">
      <el-table :data="gridData">
        <el-table-column property="date" label="商品" width="300px">
          <template slot-scope="props">
            <section class="flex-box" style="width:100%;padding: 0;">
              <div>
                <img class="thumbImg" :src="props.row.thumbImg" />
                <div class="product-name">
                  <p class="thumbImg-right">{{ props.row.productName }}</p>
                  <div
                    style="margin-left:10px;margin-top:10px"
                    v-show="props.row.goodsSku"
                  >{{props.row.goodsSku}}</div>
                </div>
              </div>
            </section>
          </template>
        </el-table-column>
        <el-table-column property="number" label="数量"></el-table-column>
        <el-table-column property="deliveryStatus" label="状态">
          <template slot-scope="props">
            <section style="width:100%;padding: 0;">
              <div style="color:rgb(240, 186, 8);">{{props.row.deliveryStatus1}}</div>
              <div>{{props.row.deliveryStatus}}</div>
            </section>
          </template>
        </el-table-column>
        <el-table-column property="userLogisticsCode" label="运单号"></el-table-column>
      </el-table>
      <el-form label-width="70px">
        <el-form-item label="发货方式">
          <span style="font-size:12px" class="ems">自己联系快递</span>
          <div>
            <el-input
              v-model="fahuoform1.logisticsCode"
              size="mini"
              @blur="onSubmit1"
              style="width:300px;margin-right:20px"
              onkeyup="value=value.replace(/[\W]/g,'')"
            ></el-input>
          </div>
          <div>
            <el-select
              v-model="fahuoform1.shipperCode"
              placeholder="请选择"
              size="mini"
              style="width:300px"
            >
              <el-option
                v-for="(item, index) in kuaidiarr"
                :key="index"
                :label="item.ShipperName"
                :value="item.ShipperCode"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="disp" @click="haikeyifahuo">发货</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  merAfterSaleConfirmReceipt,
  getAfterSaleDetailInfoNew,
  afterSaleAgreeApply,
  afterSaleRefuseApply,
  viewAftersaleMoneyWhere,
  inquireAddressList,
  merAfterSaleRefuseReceipt,
  merAfterSaleLogisticsInfo,
} from "@/api/aftersale";
import { getDeliveryDetails } from "@/api/merchantOrder";
import { setLogisticsInfoNew } from "@/api/merchantOrder";
import { distinguishHandle } from "@/api/merchantOrder";
export default {
  data() {
    return {
      kuaidiarr: [],
      fahuoform: {
        merShipperCode: "",
        merShipperName: "",
        merLogisticsCode: "",
      },
      fahuoform1: {
        asaleCode: "",
        orderDetailIds: "",
        shipperCode: "",
        shipperName: "",
        logisticsCode: "",
      },
      indexStaus: "",
      radio: "",
      gridData: [],
      listPage: {
        curPage: 1,
        pageSize: 5,
      },
      AddressData: [],
      gridData: [],
      huotable: [],
      dialogTableVisible2: false,
      dialogTableVisible1: false,
      dialogTableVisible: false,
      juejuetext: "",
      aftersaleRefuse: "", //退货不同意拒绝原因
      dialogVisible3: false,
      dialogVisible2: false,
      dialogVisible1: false,
      dialogVisible: false,
      aftersaleinfo: "",
      timetime: "",
      look: false,
    };
  },
  created() {
    let asaleCode = this.$route.query.asaleCode
      ? this.$route.query.asaleCode
      : "AS15967083515250133";
    this.getDetail(asaleCode);
    this.ggosd();
    this.getaddress();
  },
  methods: {
    haikeyifahuo() {
      if (!this.fahuoform1.logisticsCode) {
        this.$message({
          message: "请输入快递单号",
          type: "error",
          center: true,
        });
        return false;
      }
      this.fahuoform1.shipperName = this.kuaidiarr.find(
        (el) => el.ShipperCode == this.fahuoform1.shipperCode
      ).ShipperName;
      if (!this.fahuoform1.shipperName) {
        this.$message({
          message: "请选择物流公司",
          type: "error",
          center: true,
        });
        return false;
      }
      this.fahuoform1.asaleCode = this.aftersaleinfo.asaleCode;
      this.fahuoform1.orderDetailIds = [this.aftersaleinfo.orderDetailId];
      setLogisticsInfoNew(this.fahuoform1).then((res) => {
        this.$message({
          message: "恭喜你，发货成功啦",
          type: "success",
          center: true,
        });
        this.dialogTableVisible2 = false;
        this.getDetail(this.aftersaleinfo.asaleCode);
      });
    },
    justsoso(index) {
      let dialogType = this.aftersaleinfo.dialogType.split(",");
      console.log(dialogType[index]);
      // dialogType  == 1 立即发货
      if (dialogType[index] == 1) {
        this.dialogTableVisible2 = true;
      }
      //  dialogType  == 5  已收到退货立即发货
      if (dialogType[index] == 5) {
        this.dialogTableVisible1 = true;
      }
      // 同意买家退款
      if (dialogType[index] == 2 || dialogType[index] == 4) {
        this.dialogVisible = true;
      }
      // 已收到退货,立即退款
      if (dialogType[index] == 3) {
        this.shouhuo(1);
      }
      if (dialogType[index] == 6) {
        this.queren();
      }
    },
    // 发货查询物流公司
    onSubmit() {
      console.log(this.fahuoform);
      if (this.fahuoform.merLogisticsCode.length <= 0) {
        this.$message({
          message: "请输入物流单号后查询",
          type: "error",
          center: true,
        });
        return false;
      }
      let obj = {
        logisticCode: this.fahuoform.merLogisticsCode,
      };
      distinguishHandle(obj).then((res) => {
        console.log(res);
        if (!res.body) {
          this.$message({
            message: "没查到",
            type: "error",
            center: true,
          });
          return false;
        }
        this.fahuoform.merShipperCode = res.body[0].ShipperCode;
        this.kuaidiarr = res.body;
      });
    },
    onSubmit1() {
      if (this.fahuoform1.logisticsCode.length <= 0) {
        this.$message({
          message: "请输入物流单号后查询",
          type: "error",
          center: true,
        });
        return false;
      }
      let obj = {
        logisticCode: this.fahuoform1.logisticsCode,
      };
      distinguishHandle(obj).then((res) => {
        console.log(res);
        if (!res.body) {
          this.$message({
            message: "没查到",
            type: "error",
            center: true,
          });
          return false;
        }
        this.fahuoform1.shipperCode = res.body[0].ShipperCode;
        this.kuaidiarr = res.body;
      });
    },
    shouhuobingfahuo() {
      if (!this.dialogTableVisible1) {
        this.dialogTableVisible1 = true;
      } else {
        if (!this.fahuoform.merShipperCode) {
          this.$message({
            message: "请输入快递单号",
            type: "error",
            center: true,
          });
          return false;
        }
        this.fahuoform.merShipperName = this.kuaidiarr.find(
          (el) => el.ShipperCode == this.fahuoform.merShipperCode
        ).ShipperName;
        if (!this.fahuoform.merShipperName) {
          this.$message({
            message: "请选择物流公司",
            type: "error",
            center: true,
          });
          return false;
        }
        this.fahuoform.asaleCode = this.aftersaleinfo.asaleCode;
        merAfterSaleLogisticsInfo(this.fahuoform).then((res) => {
          this.$message({
            message: "恭喜你，发货成功啦",
            type: "success",
            center: true,
          });
          this.dialogTableVisible1 = false;
          this.getDetail(this.aftersaleinfo.asaleCode);
        });
      }
    },
    shouhuo(index) {
      if (!this.dialogVisible3) {
        this.dialogVisible3 = true;
        this.indexStaus = index;
      } else {
        let obj = {
          asaleCode: this.aftersaleinfo.asaleCode,
          aftersaleRefuse: this.aftersaleRefuse,
        };
        if (this.indexStaus == 1) {
          merAfterSaleConfirmReceipt(obj).then((res) => {
            this.$message({
              message: "操作成功",
              type: "success",
              center: true,
            });
            this.timetime = "";
            this.dialogVisible3 = false;
            this.getDetail(this.aftersaleinfo.asaleCode);
          });
        } else {
          if (!this.aftersaleRefuse) {
            this.$message({
              message: "拒绝原因填写",
              type: "error",
              center: true,
            });
            return false;
          }
          merAfterSaleRefuseReceipt(obj).then((res) => {
            this.$message({
              message: "操作成功",
              type: "success",
              center: true,
            });
            this.timetime = "";
            this.dialogVisible3 = false;
            this.getDetail(this.aftersaleinfo.asaleCode);
          });
        }
      }
    },
    getaddress() {
      inquireAddressList(this.listPage).then((res) => {
        this.AddressData = res.body.records;
        console.log(this.AddressData);
      });
    },
    lookmoeny() {
      let obj = {
        asaleCode: this.aftersaleinfo.asaleCode,
      };
      viewAftersaleMoneyWhere(obj).then((res) => {
        this.dialogTableVisible = true;
        this.gridData = [];
        this.gridData.push(res.body);
        console.log(res);
      });
    },
    jujue() {
      if (!this.dialogVisible1) {
        this.dialogVisible1 = true;
      } else {
        if (this.juejuetext == "") {
          this.$message({
            message: "拒绝，请填写拒绝原因",
            center: true,
            type: "error",
          });
          return false;
        }
        let obj = {
          asaleCode: this.aftersaleinfo.asaleCode,
          aftersaleRefuse: this.juejuetext,
        };
        afterSaleRefuseApply(obj).then((res) => {
          this.$message({
            message: "操作成功",
            type: "success",
            center: true,
          });
          this.getDetail(this.aftersaleinfo.asaleCode);
          this.dialogVisible1 = false;
        });
      }
    },
    queren() {
      //   aftersaleType 售后类型1退款；3退货退款；4换货
      if (this.aftersaleinfo.aftersaleType == 1) {
        if (!this.dialogVisible) {
          this.dialogVisible = true;
        } else {
          let obj = {
            asaleCode: this.aftersaleinfo.asaleCode,
          };
          afterSaleAgreeApply(obj).then((res) => {
            this.$message({
              message: "操作成功",
              type: "success",
              center: true,
            });
            this.dialogVisible = false;
            this.dialogVisible2 = false;
            this.getDetail(this.aftersaleinfo.asaleCode);
          });
        }
      } else {
        if (!this.dialogVisible2) {
          this.dialogVisible2 = true;
        } else {
          if (this.radio == "") {
            this.$message({
              message: "选择地址",
              type: "error",
              center: true,
            });
            return false;
          }
          let address = this.AddressData.find((el) => {
            return this.radio == el.asuaId;
          });
          let obj = {
            asaleCode: this.aftersaleinfo.asaleCode,
            merAddress: address.addressInfo,
            merMobile: address.recipientsTel,
            merName: address.recipientsName,
          };
          afterSaleAgreeApply(obj).then((res) => {
            this.$message({
              message: "操作成功",
              type: "success",
              center: true,
            });
            this.dialogVisible2 = false;
            this.getDetail(this.aftersaleinfo.asaleCode);
          });
        }
      }
    },
    ggosd(item) {
      let obj = {
        asaleCode: this.$route.query.asaleCode,
      };
      getDeliveryDetails(obj).then((res) => {
        this.gridData = res.body.productInfo;
        this.fahuoinfo = res.body;
        this.kuaidiarr = [];
        // this.gridData = item.detail;
      });
    },
    getDetail(asaleCode) {
      this.timetime = "";
      let obj = {
        asaleCode,
      };
      getAfterSaleDetailInfoNew(obj).then((res) => {
        this.aftersaleinfo = res.body;
        if (this.aftersaleinfo.canDoText != "") {
          this.aftersaleinfo.canDoText = this.aftersaleinfo.canDoText.split(
            ","
          );
        } else {
          this.aftersaleinfo.canDoText = [];
        }
        // aftersaleinfo.remindText
        if (this.aftersaleinfo.remindText) {
          this.aftersaleinfo.remindText = this.aftersaleinfo.remindText.split(
            "。"
          );
        }
        this.huotable = [
          {
            productName: this.aftersaleinfo.productName,
            goodsSku: this.aftersaleinfo.goodsSku,
            thumbImg: this.aftersaleinfo.thumbImg,
            aftersaleNum: this.aftersaleinfo.aftersaleNum,
            userLogisticsCode: this.aftersaleinfo.userLogisticsCode,
            orderDeliveryStatus:
              this.aftersaleinfo.orderDeliveryStatus == 0 ? "未发货" : "已发货",
          },
        ];
        if (this.aftersaleinfo.countDownText) {
          this.opop = this.aftersaleinfo.countDownText.split("countdown");
          this.cutdown(0);
        }
      });
    },
    cutdown(num) {
      setTimeout(() => {
        let start = new Date().getTime();
        if (this.aftersaleinfo.processOverTimeStamp) {
          this.timetime = this.calculateDiffTime(
            start,
            this.aftersaleinfo.processOverTimeStamp * 1000
          );

          this.aftersaleinfo.countDownText = `${this.opop[0]}<span class="time-box" style="font-size: 16px;color: rgb(240, 186, 8);font-weight: bold;">${this.timetime}</span>${this.opop[1]}`;
          // console.log(this.aftersaleinfo.countDownText);
          this.cutdown(1000);
        }
      }, num);
    },
    calculateDiffTime(start_time, end_time) {
      let startTime = 0,
        endTime = 0;
      if (start_time < end_time) {
        startTime = start_time;
        endTime = end_time;
      } else {
        startTime = end_time;
        endTime = start_time;
      }
      let timeDiff = endTime - startTime;
      //计算天数
      // let year = Math.floor(timeDiff / 86400 / 365);
      // timeDiff = timeDiff % (86400 * 365);
      // let month = Math.floor(timeDiff / 86400 / 30);
      // timeDiff = timeDiff % (86400 * 30);
      let day = Math.floor(timeDiff / 86400000);
      timeDiff = timeDiff % 86400000;
      let hour = Math.floor(timeDiff / 3600000);
      timeDiff = timeDiff % 3600000;
      let minute = Math.floor(timeDiff / 60000);
      timeDiff = timeDiff % 60000;
      let second = Math.floor(timeDiff / 1000);
      // timeDiff = timeDiff % 60;
      // let second = timeDiff;
      let timeRemaining =
        "剩余时间" + day + "天" + hour + "时" + minute + "分" + second + "秒";
      return timeRemaining;
    },
  },
};
</script>

<style scoped>
* {
  font-size: 12px;
}
.flex-nima {
  display: flex;
}
.flex-nima > div:first-of-type {
  flex: 0 0 40%;
}
.flex-box {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 10px 0px 10px 20px;
  border-bottom: solid 1px #d5d5d5;
}
.flex-box > div:first-of-type {
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  margin-right: 10px;
}
.flex-box > div:nth-of-type(2) {
  flex: 0 0 20%;
}
.flex-box > div:nth-of-type(3) {
  flex: 0 0 20%;
}
.flex-box:last-of-type {
  border-bottom: none;
}
.thumbImg {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  flex: 0 0 60px;
}
.thumbImg-right {
  width: 95%;
  margin-left: 10px;
  flex: 1;
  font-size: 12px;
  font-weight: 400;
  color: #44abf7;
  line-height: 1.2;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.flex-button {
  display: flex;
  justify-content: flex-end;
}
* {
  font-size: 12px;
  font-family: Microsoft YaHei;
}
.container {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
}
.top-box {
  padding: 10px 10px;
  border-bottom: solid 1px #d5d5d5;
  background: #fff;
}
.top-flex {
  display: flex;
  align-items: center;
  position: relative;
}
.big-title {
  height: 30px;
  background: #44abf7;
  color: #fff;
  padding: 0 30px;
  text-align: center;
  line-height: 30px;
  position: relative;
  margin-left: -10px;
  font-size: 16px;
}
.isYellow {
  height: 30px;
  background: rgb(240, 186, 8);
  color: #fff;
  padding: 0 30px;
  text-align: center;
  line-height: 30px;
  position: relative;
  margin-left: -10px;
  font-size: 16px;
}
.code-box {
  margin-left: 20px;
}
.name-box {
  position: absolute;
  right: 10px;
  color: #666;
}
.name-box > span:first-of-type {
  display: inline-block;
  margin-right: 10px;
  color: #44abf7;
}
.top-second {
  margin-top: 20px;
  margin-bottom: 20px;
}
.top-second > span {
  font-size: 16px;
  color: rgb(240, 186, 8);
  font-weight: bold;
}
.top-last {
  color: #666;
  margin-top: 10px;
}
.top-last > span {
  cursor: pointer;
  color: #44abf7;
}
.top-last > span:first-of-type {
  color: #666;
}
.tips-box {
  width: 100%;
  padding-top: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  line-height: 20px;
  background: #fff;
  padding-left: 10px;
  padding-bottom: 10px;
}
.tips-box > div:first-of-type {
  color: rgb(240, 186, 8);
  line-height: 20px;
}
.buy-info {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  background: #fdfdfd;
  width: 100%;
  border: solid 1px #e4e7ed;
  margin-top: 10px;
  padding: 20px;
  color: #666;
  justify-content: center;
}
.table-box {
  width: 100%;
  box-sizing: border-box;
  background: #fdfdfd;
  width: 100%;
  border: solid 1px #e4e7ed;
  margin-top: 10px;
  padding: 20px;
}
.buy-info > div {
  flex: 1;
  line-height: 20px;
}
.buy-info > div:first-of-type {
  flex: 0 0 40%;
}
.buy-info > div > section:first-of-type {
  flex: 1;
  line-height: 20px;
  font-size: 12px;
  font-family: Microsoft YaHei, MicrosoftYaHei-Bold;
  font-weight: bold;
}
.goods-content {
  display: flex;
  align-items: center;
}
.goods-content > img {
  border-radius: 5px;
}
.goods-content > div {
  margin-left: 10px;
  flex: 0 0 55%;
}
.timebox {
  width: 100%;
  background: #fff;
  margin-top: 20px;
}
.time-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 5px;
  box-sizing: border-box;
  border-bottom: solid 1px #d5d5d5;
}
.time-title > div:first-of-type {
  font-weight: bold;
}
.time-title > div:last-of-type {
  color: #44abf7;
  font-weight: bold;
}
.btn-box {
  margin-top: 20px;
  padding: 30px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.jue-js {
  display: flex;
  margin-top: 20px;
}
.flex-s {
  display: flex;
  justify-content: space-between;
}
.flex-s > div:first-of-type > span {
  color: #ff0000;
}
.lookmoeny {
  cursor: pointer;
}
.address-tel {
  font-weight: bold;
  color: #666;
}
.address-tel span {
  display: inline-block;
  margin-right: 10px;
  padding: 5px 0px;
}
/* .time-content{

} */
</style>