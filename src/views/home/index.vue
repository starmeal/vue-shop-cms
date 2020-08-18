<template>
  <div>
    <!-- i am 首页1 -->
    <div class="big-s">
      <div class="felx-s">
        <section class="ns-1">
          <div>
            <div>今日订单总数：</div>
            <div>{{homeInfo.todayOrderTotal}}</div>
          </div>
          <div>
            <div>今日总销售额：</div>

            <div>{{homeInfo.todaySale}}</div>
          </div>
          <div>
            <div>今日关注店铺人数：</div>

            <div>{{homeInfo.todayFansShopNum}}</div>
          </div>
          <div>
            <div>今日分享人数：</div>
            <div>{{homeInfo.todayShareNum}}</div>
          </div>
          <div>
            <div>今日主播带货：</div>
            <div>{{homeInfo.todayAnchorWithGoodsNum}}</div>
          </div>
        </section>
        <section class="ns-1">
          <div>
            <div>累计订单数量：</div>
            <div>{{homeInfo.orderTotal}}</div>
          </div>
          <div>
            <div>累计销售额：</div>
            <div>{{homeInfo.saleTotal}}</div>
          </div>
          <div>
            <div>累计关注人数：</div>
            <div>{{homeInfo.fansShopTotal}}</div>
          </div>
          <div>
            <div>累计主播带货：</div>
            <div>{{homeInfo.anchorWithGoodsTotal}}</div>
          </div>
        </section>
        <section>
          <section class="flex-a">
            <div>单品销售排名</div>
            <div>
              <span
                v-for="(item,index) in tabtable"
                :key="index"
                :class="item.value == dataByType ? 'tableavtive' : ''"
                @click="selecttable(item)"
              >{{item.key}}</span>
            </div>
          </section>

          <el-table :data="tableData" style="width: 100%;height:100%">
            <el-table-column prop="date" label="排行">
              <template slot-scope="props">
                <div class="egm">{{props.$index + 1}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="productName" label="商品信息">
              <template slot-scope="props">
                <div class="egm">{{props.row.productName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="sales" label="销量"></el-table-column>
          </el-table>
        </section>
      </div>
      <div class="felx-r">
        <div class="a-s-a-s">
          <div>
            <div>{{homeInfo.sellingGoodsNum}}</div>
            <div>出售中</div>
          </div>
          <div>
            <div>{{homeInfo.storageGoodsNum}}</div>
            <div>仓库中</div>
          </div>
          <div>
            <div style="color:#ff0000">{{homeInfo.sellOutGoodsNum}}</div>
            <div>售罄了</div>
          </div>
          <div>
            <div style="color:#ff0000">{{homeInfo.stockWarning}}</div>
            <div>库存预警</div>
          </div>
          <div>
            <div>{{homeInfo.waitEvaluationReply}}</div>
            <div>待评论回复</div>
          </div>
          <div>
            <div>{{homeInfo.liveingGoodsNum}}</div>
            <div>直播中商品</div>
          </div>
          <div>
            <div>{{homeInfo.waitPayOrderNum}}</div>
            <div>待付款</div>
          </div>
          <div>
            <div>{{homeInfo.waitDeliveryOrderNum}}</div>
            <div>待发货</div>
          </div>
          <div>
            <div style="color:#ff0000">{{homeInfo.alreadyDeliveryOrderNum}}</div>
            <div>已发货</div>
          </div>
          <div>
            <div style="color:#ff0000">{{homeInfo.unSettleOrderNum || 0}}</div>
            <div>未结算</div>
          </div>
          <div>
            <div>{{homeInfo.settledOrderNum || 0}}</div>
            <div>已结算</div>
          </div>
          <div>
            <div>{{homeInfo.refundingOrderNum || 0 }}</div>
            <div>退款中</div>
          </div>
          <div>
            <div>{{homeInfo.afterSaleWaitMerProcessNum}}</div>
            <div>售后待处理</div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <section style="width:100%;background:#fff">
          <div class="pspp">
            <span
              @click="initcharts(item.value,index)"
              v-for="(item,index) in tabls"
              :key="index"
              :class="index == active ? 'abg' : ''"
            >{{item.key}}</span>
          </div>
          <div id="container" style="width: 100%;height:200px;"></div>
        </section>
        <section style="width:100%;background:#fff;margin-top:10px">
          <div class="pspp">
            <span
              @click="initcharts1(item.value,index)"
              v-for="(item,index) in tabls1"
              :key="index"
              :class="index == active1 ? 'abgc' : ''"
            >{{item.key}}</span>
          </div>
          <div id="container1" style="width: 100%;height:200px;"></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {
  homeGoodsSalesToTal,
  homeOrderToTal,
  homeMerInfoData,
  homeCollectionToTal,
} from "@/api/home";
var Highcharts = require("highcharts");
export default {
  name: "home",
  created() {
    this.gethomeGoodsSalesToTal();
    this.gethomeOrderToTal();
    this.gethomeMerInfoData();
    this.gethomeCollectionToTal();
  },
  data() {
    return {
      homeInfo: "",
      tableData: [],
      tabls: [
        {
          key: "今日",
          value: "todayDate",
        },
        {
          key: "昨日",
          value: "yesterdayDate",
        },
        {
          key: "本周",
          value: "thisWeekDate",
        },
        {
          key: "本月",
          value: "thisMonthDate",
        },
      ],
      tabls1: [
        {
          key: "今日",
          value: "todayDate1",
        },
        {
          key: "昨日",
          value: "yesterdayDate1",
        },
        {
          key: "本周",
          value: "thisWeekDate1",
        },
        {
          key: "本月",
          value: "thisMonthDate1",
        },
      ],
      tabtable: [
        {
          key: "今日",
          value: "1",
        },
        {
          key: "昨日",
          value: "2",
        },
        {
          key: "本周",
          value: "3",
        },
        {
          key: "本月",
          value: "4",
        },
      ],
      active: 0,
      active1: 0,
      dataByType: "4",
    };
  },
  methods: {
    gethomeMerInfoData() {
      homeMerInfoData().then((res) => {
        this.homeInfo = res.body;
      });
    },
    selecttable(item) {
      this.dataByType = item.value;
      this.gethomeGoodsSalesToTal();
    },
    gethomeGoodsSalesToTal() {
      let obj = {
        dataByType: this.dataByType,
      };
      homeGoodsSalesToTal(obj).then((res) => {
        this.tableData = res.body;
      });
    },
    gethomeOrderToTal() {
      homeOrderToTal().then((res) => {
        res.body.todayDate.forEach((element) => {
          element.y = parseInt(element.axisY);
          element.x = element.axisX;
        });
        res.body.yesterdayDate.forEach((element) => {
          element.y = parseInt(element.axisY);
          element.x = element.axisX;
        });
        res.body.thisWeekDate.forEach((element) => {
          element.y = parseInt(element.axisY);
          element.x = element.axisX;
        });
        res.body.thisMonthDate.forEach((element) => {
          element.y = parseInt(element.axisY);
          element.x = element.axisX;
        });
        this.todayDate = res.body.todayDate;
        this.yesterdayDate = res.body.yesterdayDate;
        this.thisWeekDate = res.body.thisWeekDate;
        this.thisMonthDate = res.body.thisMonthDate;
        this.initcharts("todayDate", 0);
      });
    },
    gethomeCollectionToTal() {
      homeCollectionToTal().then((res) => {
        res.body.thisMonthDate.forEach((element) => {
          element.y = parseInt(element.axisY);
          element.x = element.axisX;
        });
        res.body.thisWeekDate.forEach((element) => {
          element.y = parseInt(element.axisY);
          element.x = element.axisX;
        });
        res.body.todayDate.forEach((element) => {
          element.y = parseInt(element.axisY);
          element.x = element.axisX;
        });
        res.body.yesterdayDate.forEach((element) => {
          element.y = parseInt(element.axisY);
          element.x = element.axisX;
        });
        this.todayDate1 = res.body.todayDate;
        this.yesterdayDate1 = res.body.yesterdayDate;
        this.thisWeekDate1 = res.body.thisWeekDate;
        this.thisMonthDate1 = res.body.thisMonthDate;
        this.initcharts1("todayDate1", 0);
      });
    },
    initcharts1(val, index) {
      this.active1 = index;
      let arrx = [];
      let yarr = [];
      this[val].forEach((element) => {
        element.y = parseInt(element.axisY);
        element.x = element.axisX;
        yarr.push(element.y);
        arrx.push(element.x);
      });
      this.$nextTick(() => {
        var chart = Highcharts.chart("container1", {
          title: {
            text: "订单数统计",
            align: "left",
            style: {
              color: "#3E576F",
              fontSize: "12px",
            },
          },
          credits: {
            enabled: false,
          },
          chart: {
            zoomType: "x",
          },
          xAxis: {
            categories: arrx,
            crosshair: true,
            title: "",
          },
          yAxis: {
            title: {
              text: "",
            },
            tickPixelInterval: 200,
            tickInterval: 200,
          },
          series: [
            {
              name: "",
              data: yarr,
            },
          ],
        });
      });
    },
    initcharts(val, index) {
      this.active = index;
      let arrx = [];
      let yarr = [];
      this[val].forEach((element) => {
        element.y = parseInt(element.axisY);
        element.x = element.axisX;
        yarr.push(element.y);
        arrx.push(element.x);
      });
      this.$nextTick(() => {
        var chart = Highcharts.chart("container", {
          title: {
            text: "关注数统计",
            align: "left",
            style: {
              color: "#3E576F",
              fontSize: "12px",
            },
          },
          credits: {
            enabled: false,
          },
          chart: {
            zoomType: "x",
          },
          xAxis: {
            categories: arrx,
            crosshair: true,
            title: "",
          },
          yAxis: {
            title: {
              text: "",
            },
            tickPixelInterval: 200,
            tickInterval: 200,
          },
          series: [
            {
              name: "",
              data: yarr,
            },
          ],
        });
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.big-s {
  color: rgb(16, 16, 16);
  min-height: 100%;
}
.flex-a > div:last-of-type > .tableavtive {
  color: rgb(247, 169, 2);
}
.abg {
  color: rgb(247, 169, 2);
}
.abgc {
  color: rgb(247, 169, 2);
}
.felx-r {
  flex: 1;
}
.felx-s {
  display: flex;
  width: 30%;
  flex-direction: column;
  font-size: 14px;
  flex: 0 0 30%;
  margin-right: 10px;
}
.felx-s > section {
  /* flex: 1; */
  box-sizing: border-box;
  padding: 20px;
}
.felx-s > section:first-of-type {
  border-radius: 5px;
  background: rgb(253, 247, 235);
  margin-bottom: 10px;
  flex: 0 0 29.5%;
}
.felx-s > section:nth-of-type(2) {
  border-radius: 5px;
  background: rgb(255, 230, 230);
  margin-bottom: 10px;
  flex: 0 0 34%;
}
.felx-s > section:last-of-type {
  padding: 0px;
  margin-bottom: 10px;
  flex: 1;
}
.felx-s > section:first-of-type > div {
  font-size: 14px;
  line-height: 30px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: solid 1px #e9e9e9;
}
.felx-s > section:nth-of-type(2) > div {
  font-size: 14px;
  line-height: 30px;
  border-bottom: solid 1px #e9e9e9;
}
.flex-a {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 12px;
}
.flex-a > div:last-of-type {
  background: #fff;
}
.flex-a > div:last-of-type > span {
  display: inline-block;
  padding: 0 5px;
  font-size: 12px;
  cursor: pointer;
}
.big-s {
  display: flex;
}
.a-s-a-s {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #fff;
  margin-bottom: 10px;
}
.a-s-a-s > div {
  font-size: 14px;
  width: 60px;
  display: flex;
  flex-direction: column;
  height: 55px;
  margin-bottom: 10px;
  text-align: center;
  padding: 20px;
}
.a-s-a-s > div > div:first-of-type {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 10px;
}
.a-s-a-s > div > div:last-of-type {
  font-size: 12px;
  font-weight: bold;
  padding-bottom: 10px;
}
.egm {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ns-1 > div {
  display: flex;
  justify-content: space-between;
}
.pspp {
  cursor: pointer;
  font-size: 12px;
  display: flex;
  padding-left: 10px;
  padding-top: 20px;
}
.pspp span {
  padding: 5px;
}
</style>