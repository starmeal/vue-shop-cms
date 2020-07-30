<template>
  <div>
    <div class="containers">
      <div class="innerContainer">
        <div ref="forms">
        <el-form ref="form" :model="form" :size="size" label-width="80px">
          <el-form-item label="订单搜索">
            <el-select v-model="form.orderId"
                       clearable>
              <el-option
                      v-for="(item, index) in orderArr"
                      :label="item.label"
                      :value="item.value"
                      :key="index"
              ></el-option>
            </el-select>
            <el-input
                    style="margin-left: 20px;"
                    clearable
                    class="inputStyle"
                    v-model="form.order"
            ></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <p class="orderTime">
              <el-date-picker :size="size"
                              v-model="createTime"
                              class="timeInput"
                              type="datetimerange"
                              range-separator="至"
                              start-placeholder="起始时间"
                              end-placeholder="结束时间"
                              @change="timeChange"
                              value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
              <el-button type="primary" plain @click="today">今天</el-button>
              <el-button type="primary" plain @click="yesterday">昨天</el-button>
              <el-button type="primary" plain @click="lastSeven">最近7天</el-button>
              <el-button type="primary" plain @click="lastThirty">最近30天</el-button>
            </p>
          </el-form-item>
          <p class="orderTime">
            <el-form-item label="商品名称">
              <el-input
                      clearable
                      class="inputStyle"
                      placeholder="请输入商品名称"
                      v-model="form.goodsName"
              ></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="form.orderStatus"
                         clearable
                         placeholder="全部">
                <el-option
                        v-for="(item, index) in orderStatusArr"
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="售后状态">
              <el-select v-model="form.serviceStatus"
                         clearable
                         placeholder="全部">
                <el-option
                        v-for="(item, index) in serviceStatusArr"
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </p>
          <p>
            <el-button
                    style="margin-left:20px;"
                    icon="el-icon-search"
                    :loading="searchLoading"
                    :size="size"
                    type="primary"
                    @click=""
            >筛选</el-button>
            <el-button
                    style="margin-left:20px;"
                    :size="size"
                    @click="exportList"
            >导出</el-button>
          </p>
        </el-form>
        </div>
        <section class="contentBox">
          <p class="retrievalList">
            <span :class="{active: index===isTrue}" @click="tabRetrieval(index)" v-for="(item,index) in retrievalList" :key="index">{{item}}</span>
          </p>
          <div class="similarTable" v-if="tableHeight" :style="'height:' + tableHeight+'px'">
            <div class="list">
              <ul class="header">
                <li :class="index==0 ? 'oneHeader' : 'otherheader'" v-for="(item,index) in listType" :key="index">{{item}}</li>
              </ul>
              <ul>
                <!--<li v-for="(item,index) in list" :key="index">-->
                <li>
                  <div class="listParent">
                    <div class="zTitle">
                      <span>订单编号：</span>
                      <span>下单时间：</span>
                      <span>微信/微信支付</span>
                      <span class="lookDetail">查看详情</span>
                    </div>
                    <div class="containerFlex">
                      <div class="containerGoods">
                        <section>
                          <dl>
                            <dt><img src="//www.baidu.com/img/PCpad_bc531b595cf1e37c3907d14b69e3a2dd.png" alt="" width="100" height="100"></dt>
                            <dd>
                              <div>111</div>
                              <div>222</div>
                            </dd>
                          </dl>
                          <div>
                            <p>0.20</p>
                            <p>1件</p>
                          </div>
                        </section>
                        <section>
                          <dl>
                            <dt><img src="//www.baidu.com/img/PCpad_bc531b595cf1e37c3907d14b69e3a2dd.png" alt="" width="100" height="100"></dt>
                            <dd>
                              <div>111</div>
                              <div>222</div>
                            </dd>
                          </dl>
                          <div>
                            <p>0.20</p>
                            <p>1件</p>
                          </div>
                        </section>
                      </div>
                      <div class="containerOther special" style="flex-direction: column;justify-content:space-around;">
                        <section>
                          卖家发起维权
                        </section>
                        <section>
                          卖家发起维权
                        </section>
                      </div>
                      <div class="containerOther">
                        <section>
                          <p>昵称</p>
                          <p>收货人姓名</p>
                          <p>13105645965</p>
                        </section>
                      </div>
                      <div class="containerOther">

                      </div>
                      <div class="containerOther">

                      </div>
                      <div class="containerOther">

                      </div>
                      <div class="containerOther">
                        <el-button :size="size" @click="sendGoods()">发货</el-button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="listParent">
                    <div class="zTitle">
                      <span>订单编号：</span>
                      <span>下单时间：</span>
                      <span>微信/微信支付</span>
                      <span class="lookDetail">查看详情</span>
                    </div>
                    <div class="containerFlex">
                      <div class="containerGoods">
                        <section>
                          <dl>
                            <dt><img src="//www.baidu.com/img/PCpad_bc531b595cf1e37c3907d14b69e3a2dd.png" alt="" width="100" height="100"></dt>
                            <dd>
                              <div>111</div>
                              <div>222</div>
                            </dd>
                          </dl>
                          <div>
                            <p>0.20</p>
                            <p>1件</p>
                          </div>
                        </section>
                        <section>
                          <dl>
                            <dt><img src="//www.baidu.com/img/PCpad_bc531b595cf1e37c3907d14b69e3a2dd.png" alt="" width="100" height="100"></dt>
                            <dd>
                              <div>111</div>
                              <div>222</div>
                            </dd>
                          </dl>
                          <div>
                            <p>0.20</p>
                            <p>1件</p>
                          </div>
                        </section>
                      </div>
                      <div class="containerOther special" style="flex-direction: column;justify-content:space-around;">
                        <section>
                          卖家发起维权
                        </section>
                        <section>
                          卖家发起维权
                        </section>
                      </div>
                      <div class="containerOther">
                        <section>
                          <p>昵称</p>
                          <p>收货人姓名</p>
                          <p>13105645965</p>
                        </section>
                      </div>
                      <div class="containerOther">

                      </div>
                      <div class="containerOther">

                      </div>
                      <div class="containerOther">

                      </div>
                      <div class="containerOther">
                        <el-button :size="size" @click="sendGoods">发货</el-button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-if="list.length==0" class="no-data">暂无数据</div>
            </div>
          </div>
          <section class="page-box">
            <el-pagination v-if="list.length > 0" @size-change="handleSizeChange" @current-change="changepage" layout="sizes,total, prev, pager, next, jumper" :page-size="form.pageSize" :current-page.sync='form.curPage' :total="totalCount" :page-sizes="[10, 20, 30, 50]">
            </el-pagination>
          </section>
        </section>
      </div>
      <el-dialog title="发货" :visible.sync="examine" width="600px">
        <el-form :model="dialogForm" ref="dialogForm">
          <el-form-item label="联系人 :" label-width="80px" prop="contact">
            <el-input class="inputStyle1" :size="size" v-model="dialogForm.contact" placeholder="请填写联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式 :" label-width="80px" prop="contact">
            <el-input class="inputStyle1" :size="size" v-model="dialogForm.phone" placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="座机 :" label-width="80px" prop="contact">
            <el-input class="inputStyle2" :size="size" v-model="dialogForm.phone" placeholder="请填写区号"></el-input>
            <el-input class="inputStyle2" :size="size" v-model="dialogForm.phone" placeholder="请填写座机号"></el-input>
            <el-input class="inputStyle2" :size="size" v-model="dialogForm.phone" placeholder="分机号(选填)"></el-input>
          </el-form-item>
          <el-form-item label="联系地址 :" label-width="80px" prop="contact">

          </el-form-item>

        </el-form>
        <div slot="footer">
          <el-button @click="" type="primary">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "merchantOrderList",
    data(){
      return {
        size: 'mini',
        tableHeight: '',
        createTime: '',
        examine: false,
        searchLoading: false,
        isTrue: 0,//检索按钮样式
        retrievalList: ['全部','待付款','代发货','已发货','已完成','已关闭','售后中'],
        listType: [
          "商品",
          "单价(元)/数量",
          "售后",
          "买家/收货人",
          "配送方式",
          "实收金额(元)",
          "订单状态",
          "操作"
        ],
        orderArr: [
          {
            value: 0,
            label: '订单编号'
          },
          {
            value: 1,
            label: '收货人姓名'
          },
          {
            value: 2,
            label: '买家手机号'
          }
        ],
        orderStatusArr: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '待付款'
          },
          {
            value: 2,
            label: '代发货'
          },
          {
            value: 3,
            label: '已发货'
          },
          {
            value: 4,
            label: '已完成'
          },
          {
            value: 5,
            label: '已关闭'
          },
          {
            value: 6,
            label: '售后中'
          }
        ],
        serviceStatusArr: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '售后中'
          },
          {
            value: 2,
            label: '售后结束'
          },
        ],
        form: {
          orderId: '',
          order: '',
          startTime: '',
          endTime: '',
          goodsName: '',
          orderStatus: 0,
          serviceStatus: 0,
          pageSize: 10,
          curPage: 1
        },
        dialogForm: {
          contact: '',
          phone: ''
        },
        list: [{}],
        totalCount: 0
      }
    },
    mounted() {
      this.gettableHeight();
    },
    methods: {
      //今天按钮
      today(){
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
        this.createTime = [start, end]
      },
      //昨天按钮
      yesterday(){
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime()- 3600 * 1000 * 24);
        const end = new Date(new Date(new Date().toLocaleDateString()).getTime()-3600 * 1000 * 24+ 24*60*60*1000-1);
        this.createTime = [start, end]
      },
      //最近7天按钮
      lastSeven(){
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime()- 3600 * 1000 * 24 * 7);
        const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
        this.createTime = [start, end]
      },
      //最近30天按钮
      lastThirty(){
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime()- 3600 * 1000 * 24 * 30);
        const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
        this.createTime = [start, end]
      },
      //时间选择器
      timeChange(val){
        console.log(val);
      },
      tabRetrieval(index){
        this.isTrue = index;
      },
      gettableHeight(){
        let winHeight = document.body.clientHeight - 265;
        let boxHeight = this.$refs.forms.offsetHeight;
        this.tableHeight = winHeight - boxHeight;
      },
      handleSizeChange(){

      },
      changepage(){

      },
      exportList(){
        if(this.createTime == ""||this.createTime == null){
          this.$message({
            message: "请选择下单起止时间",
            type: "success"
          });
          return false;
        }
      },
      sendGoods(){
        if(this.examine == false) {
          this.examine = true;
        }
      }
    }
  }
</script>

<style scoped>
  .containers {
    padding: 10px 0px;
    background: #fff;
    border-radius: 4px;
  }
  .innerContainer {
    width: 98%;
    margin: 0 auto;
    padding: 20px 0px;
    background: #F5F7F9;
  }
  .inputStyle {
    width: 200px;
  }
  .timeInput {
    margin-right: 20px;
  }
  .orderTime {
    display: flex;
    flex-direction: row;
  }
  .contentBox {
    padding: 20px;
  }
  .retrievalList span {
    display: inline-block;
    width: 70px;
    font-size: 12px;
    padding: 5px 0;
    color: #333;
    text-align: center;
    border: 1px solid #d5d5d5;
  }
  .retrievalList span:not(:last-child) {
    border-right: none;
  }
  .active {
    background: #fff;
  }
  /*表格样式*/
  ul,li {
    list-style: none;
  }
  .similarTable {
    margin-top: 20px;
    border: 1px solid #EBEEF5;
    font-size: 12px;
    overflow-y:scroll;
  }
  .list .header {
    display: flex;
    background: #FFF;
    width: 100%;
    height: 32px;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333;
    align-items: center;
    margin-bottom: 0;
    padding: 0;
  }
  .list .header .oneHeader {
    width: 40%;
    text-align: center;
  }
  .list .header .otherheader {
    width: 10.2%;
    text-align: center;
  }
  .listParent {
    border: 1px solid #e5e5e5;
    margin: 5px;
  }
  .zTitle {
    padding: 5px 10px;
    background: #fff;
    color: #666;
  }
  .lookDetail {
    float: right;
    color:#3976e6
  }
  .containerFlex {
    display: flex;
  }
  .containerFlex>div:not(:last-child){
    border-right: 1px #e5e5e5 solid;
  }
  .containerGoods {
    display: flex;
    flex-direction: column;
    width: 48%;
    padding: 5px;
  }
  .containerGoods section{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .containerGoods section:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
  .containerGoods section div{
    margin-top: 30px;
  }
  .containerGoods dl {
    display: flex;
  }
  .containerGoods dd {
    margin-left: 5px;
  }
  .containerGoods dd div:first-child {
    margin-top: 15px;
  }
  .containerGoods dd div:last-child {
    margin-top: 30px;
  }
  .containerOther {
    display: flex;
    width: 9.6%;
    align-items: center;
    text-align: center;
  }
  .containerOther section {
    width: 100%;
    text-align: center;
  }
  .containerOther section p{
    text-align: center;
  }
  .no-data {
     width: calc(100% - 12px);
     height: 55px;
     margin: 0 auto;
     font-size: 14px;
     line-height: 55px;
     text-align: center;
     border-bottom: 1px solid #f4f4f4;
     color: #999;
   }
  .page-box {
    background-color: #fff;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inputStyle1 {
    width: 200px;
  }
  .inputStyle2 {
    width: 120px;
    margin-right: 5px;
  }
</style>