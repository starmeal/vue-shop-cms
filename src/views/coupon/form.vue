<template>
  <div class="big-container">
    <section class="form-container">
      <div style="height:20px"></div>
      <el-form ref="form" :rules="rules" :size="size" :model="form" label-width="150px">
        <el-form-item label="优惠券名称" prop="couponName">
          <el-input
            style="width:300px"
            class="input-update"
            :size="size"
            type="textarea"
            show-word-limit
            v-model="form.couponName"
            :rows="2"
            maxlength="30"
            placeholder="请输入优惠券名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型" prop="used">
          <el-select v-model="form.used" placeholder="请选择类型" style="width:300px">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in options"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满减金额" prop="withAmount">
          <span style="margin-right:20px;font-size: 12px;color: #333;">满</span>
          <el-input
            @keyup.native="(val)=>{
              changeMoeny(val,'withAmount')
            }"
            :controls="false"
            style="width:90px;"
            v-model.trim="form.withAmount"
          ></el-input>
          <span style="margin:0 20px;font-size: 12px;color: #333;">减</span>
          <el-input
            @keyup.native="(val)=>{
              changeMoeny(val,'usedAmount')
            }"
            :controls="false"
            style="width:90px;"
            v-model.trim="form.usedAmount"
          ></el-input>
        </el-form-item>
        <el-form-item label="发行数量" prop="quota">
          <el-input-number
            v-model="form.quota"
            :controls="false"
            style="width:300px"
            class="num-in"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="限领">
          <span style="font-size:12px">每人限领一张</span>
        </el-form-item>
        <el-form-item label="开始时间" prop="validStartTime">
          <el-date-picker
            :size="size"
            placeholder="选择开始时间"
            :picker-options="endTimepickerOptions"
            v-model="form.validStartTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="validEndTime">
          <el-date-picker
            placeholder="选择结束时间"
            :picker-options="endTimepickerOptions1"
            :size="size"
            v-model="form.validEndTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="优惠券状态" prop="status">
          <el-select v-model="form.status" placeholder="优惠券状态 " style="width:300px">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in optionsone"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            style="width:300px"
            class="input-update"
            :size="size"
            type="textarea"
            show-word-limit
            v-model="form.remark"
            :rows="5"
            maxlength="30"
            placeholder="备注"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="商品范围" prop="couponRange">
          <el-radio-group
            v-model="form.couponRange"
            @change="radioChange"
            :disabled="$route.query.couponCode ? true : false"
          >
            <el-radio label="1">全场通用</el-radio>
            <el-radio label="2">指定商品</el-radio>
            <el-radio label="3">指定分类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="添加商品" v-if="form.couponRange == 2">
          <el-input
            placeholder="请输入商品名称/商品货号"
            v-model="auxiliary.keyWord"
            :disabled="$route.query.couponCode ? true : false"
            class="input-with-select"
            style="width:250px"
          >
            <el-button
              slot="append"
              @click="getgetAllValidGoods(1)"
              :loading="searchLoading"
              :disabled="$route.query.couponCode ? true : false"
            >搜索</el-button>
          </el-input>
          <el-select
            v-model="selectvalue"
            placeholder="请选择"
            style="margin-left:10px"
            :disabled="$route.query.couponCode ? true : false"
          >
            <el-option
              v-for="item in select"
              :key="item.goodsCode"
              :label="item.goodsName"
              :value="item.goodsCode"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            style="margin-left:10px"
            @click="inittable"
            :disabled="$route.query.couponCode ? true : false"
          >添加</el-button>
          <div v-show="tableData.length" style="margin-top:20px;">
            <el-table :data="tableData" style="width:70%">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="goodsCode" label="货号"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="delItem(scope)"
                    :disabled="$route.query.couponCode ? true : false"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <section class="page-box">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="changepage"
                  layout="sizes,total, prev, pager, next, jumper"
                  :page-size="pageData.pageSize"
                  :current-page.sync="pageData.curPage"
                  :total="totalCount"
                  :page-sizes="[10, 20, 30, 50]"
                ></el-pagination>
              </section>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="选择分类" v-if="form.couponRange == 3" prop="couponUsedCategoryName">
          <el-select
            v-model="form.couponUsedCategoryId"
            placeholder="选择分类"
            style="width:300px"
            @change="selectChange"
          >
            <el-option
              :label="item.categoryName"
              :value="item.category"
              v-for="(item,index) in ShopGoodsCategory"
              :key="index"
            ></el-option>
          </el-select>
          <div class="tips">购买以上分类商品可使用优惠券抵扣金额</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{$route.query.couponCode ? '修改' : '完成'}}</el-button>
          <el-button @click="golist">取消</el-button>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import {
  couponadd,
  selectShopGoodsCategory,
  getAllValidGoods,
  coupondetail,
  couponupdate,
  couponsGoodsList,
} from "@/api/coupon";
export default {
  data() {
    return {
      searchLoading: false,
      endTimepickerOptions: {
        disabledDate: (time) => {
          return time.getTime() + 24 * 60 * 60 * 1000 < new Date().getTime();
        },
      },
      endTimepickerOptions1: {
        disabledDate: (time) => {
          return this.dealDisabledDate(time);
        },
      },
      radio: "1",
      size: "mini",
      options: [
        {
          value: "2",
          label: "新人券",
        },
        {
          value: "1",
          label: "普通券",
        },
      ],
      optionsone: [
        {
          value: "1",
          label: "生效",
        },
        {
          value: "2",
          label: "失效",
        },
      ],
      rules: {
        couponName: [
          { required: true, message: "请输入优惠券名称", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择优惠券状态", trigger: "change" },
        ],
        used: [
          { required: true, message: "请选择优惠券类型", trigger: "change" },
        ],
        withAmount: [
          { required: true, message: "请输入满额", trigger: "blur" },
        ],
        quota: [{ required: true, message: "请输入发券数量", trigger: "blur" }],
        validStartTime: [
          { required: true, message: "请选择开始时间", trigger: "change" },
        ],
        validEndTime: [
          { required: true, message: "请选择结束时间", trigger: "change" },
        ],
        remark: [
          { required: true, message: "请输入优惠券备注", trigger: "blur" },
        ],
        couponRange: [
          { required: true, message: "请选择优惠券范围", trigger: "change" },
        ],
        couponUsedCategoryName: [
          { required: true, message: "请选择指定分类", trigger: "change" },
        ],
      },
      auxiliary: {
        keyWord: "",
      },
      select: [],
      selectvalue: "",
      form: {
        couponName: "",
        status: "",
        used: "",
        limitedCollar: "1",
        withAmount: "",
        usedAmount: "",
        quota: "",
        validStartTime: "",
        validEndTime: "",
        remark: "",
        couponRange: "",
        couponGoodsList: [],
        couponUsedCategoryId: null,
        couponUsedCategoryName: "",
      },
      pageData: {
        curPage: 1,
        pageSize: 10,
        couponCode: "",
      },
      pagetable: [],
      ShopGoodsCategory: [],
      totalCount: 0,
    };
  },
  computed: {
    tableData() {
      if (this.pagetable.length == 0) {
        return [];
      }
      return this.pagetable.slice(
        (this.pageData.curPage - 1) * 10,
        (this.pageData.curPage - 1) * 10 + 10
      );
    },
  },
  created() {
    this.getselectShopGoodsCategory();
    this.getgetAllValidGoods();
    // 详情
    if (this.$route.query.couponCode) {
      this.getDetail();
    }
  },
  methods: {
    // 翻页
    changepage(page) {
      if (this.$route.query.couponCode) {
        this.pageData.curPage = page;
        this.getTable();
      } else {
        this.pageData.curPage = page;
      }
    },
    // 修改页总数
    handleSizeChange(val) {
      if (this.$route.query.couponCode) {
        this.pageData.pageSize = val;
        this.getTable();
      }
    },
    // 跳页
    golist() {
      this.$router.push({
        path: "/coupon",
      });
    },
    // 详情
    getDetail() {
      let obj = {
        couponCode: this.$route.query.couponCode,
      };
      coupondetail(obj).then((res) => {
        this.form = res.body;
        if (this.form.couponRange == 2) {
          this.getTable();
        }
        console.log(res);
      });
    },
    getTable() {
      this.pageData.couponCode = this.$route.query.couponCode;
      couponsGoodsList(this.pageData).then((res) => {
        console.log(res);
        this.tableData = res.body.records;
        this.totalCount = res.body.total;
      });
    },
    // 删除表格
    delItem(sope) {
      --this.totalCount;
      this.pagetable.splice((this.pageData.curPage - 1) * 10 + sope.$index, 1);
      if (this.tableData.length == 0 && this.pagetable.length) {
        --this.pageData.curPage;
      }
    },
    // change生成表格
    inittable() {
      if (!this.selectvalue) {
        this.$message({
          message: "请选择后添加",
          type: "error",
        });
        return false;
      }
      let obj;
      if (this.tableData.length == 0) {
        obj = this.select.find((el) => {
          return el.goodsCode == this.selectvalue;
        });
      } else {
        obj = this.select.find((el) => {
          return el.goodsCode == this.selectvalue;
        });
        let ostate = this.tableData.some((item, index) => {
          return item.goodsCode == obj.goodsCode;
        });
        if (ostate) {
          this.$message({
            message: "请勿添加重复信息",
            type: "error",
          });
          return false;
        }
      }
      obj.len = this.pagetable.length;
      this.pagetable.push(obj);
      this.pageData.curPage = Math.ceil(this.pagetable.length / 10);
      this.totalCount = this.totalCount + 1;
    },
    // 单选切换
    radioChange(val) {
      if (val == 1) {
        this.form.couponUsedCategoryName = "";
        this.form.couponUsedCategoryId = null;
        this.form.couponGoodsList = "";
        this.tableData = [];
      }
    },
    // 分类切换
    selectChange(val) {
      let obj = this.ShopGoodsCategory.find((el) => {
        return el.category == val;
      });
      this.form.couponUsedCategoryName = obj.categoryName;
    },
    // 获取分类
    getselectShopGoodsCategory() {
      selectShopGoodsCategory().then((res) => {
        this.ShopGoodsCategory = res.body;
      });
    },
    // 获取上架商品
    getgetAllValidGoods(st) {
      if (st) {
        this.searchLoading = true;
      }
      let obj = {
        keyWord: this.auxiliary.keyWord,
      };
      getAllValidGoods(obj).then((res) => {
        this.searchLoading = false;
        if (this.auxiliary.keyWord) {
          let hotlist = [];
          let reg = new RegExp("(" + this.auxiliary.keyWord + ")", "g");
          res.body.forEach((element, index) => {
            let ret = element.goodsName
              .split(reg)
              .filter((keyItem, keyIndex) => {
                return keyItem != "";
              });
            hotlist.push(ret);
            element.hot = hotlist[index];
          });
          console.log(res.body);
        }
        this.select = res.body;
      });
    },
    // 提交表单
    submitForm() {
      if (this.pagetable.length > 0) {
        this.form.couponGoodsList = [];
        this.pagetable.forEach((item, index) => {
          this.form.couponGoodsList.push(item.goodsCode)
        });
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.withAmount < this.form.usedAmount) {
            this.$message({
              message: "满减填写有误请核对后重新填写",
              type: "error",
            });
            return false;
          }
          if (this.$route.query.couponCode) {
            couponupdate(this.form).then((res) => {
              this.$message({
                message: this.$route.query.couponCode ? "修改成功" : "创建成功",
                type: "success",
              });
              this.$router.push({
                path: "/coupon",
              });
            });
          } else {
            couponadd(this.form).then((res) => {
              this.$message({
                message: this.$route.query.couponCode ? "修改成功" : "创建成功",
                type: "success",
              });
              this.$router.push({
                path: "/coupon",
              });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dealDisabledDate(time) {
      return (
        time.getTime() + 24 * 60 * 60 * 1000 <
        new Date(this.form.validStartTime).getTime() + 24 * 60 * 60 * 1000
      );
    },
    changeMoeny(val, type) {
      this.form[type] = this.form[type].replace(/[^\.\d]/g, "");
      this.form[type] = this.form[type].replace(".", "");
    },
  },
};
</script>
<style>
.num-in .el-input__inner {
  text-align: left;
}
</style>
<style scoped lang="scss">
.form-container {
  width: 100%;
  background: #f7f6f9;
  height: auto;
}
.font-f {
  font-size: 12px;
  color: #606266;
  margin-right: 20px;
  flex: 1;
  text-align: right;
}
.flex-box {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.hidden-box {
  width: 0px;
  height: 0px;
}
.img-licenseImgUrl {
  width: 100%;
  height: 100%;
}
.tips {
  font-size: 12px;
  color: #999;
}
.page-box {
  background-color: #fff;
  width: 70%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
