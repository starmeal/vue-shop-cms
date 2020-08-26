<template>
  <div>
    <div class="goods-container">
      <section class="screening-box">
        <div class="felx-scr">
          <div
            v-for="(item,index) in textarr"
            :key="index"
            :class="item.val == listpage.listType ? 'spanavtive' : ''"
            @click="serach(item.val)"
          >{{item.text}}</div>
        </div>
        <div class="mini-flexs">
          <el-input
            clearable
            v-model="listpage.goodsName"
            placeholder="请输入商品名称"
            class="el-input-s"
            style="width:160px"
            size="mini"
          ></el-input>
          <el-input
            clearable
            v-model="listpage.goodsCode"
            placeholder="请输入商品ID"
            class="el-input-s"
            style="width:160px"
            size="mini"
          ></el-input>
          <el-input
            clearable
            v-model="listpage.goodsBarCode"
            placeholder="请输入商品条码"
            class="el-input-s"
            style="width:160px"
            size="mini"
          ></el-input>
          <el-select
            v-model="listpage.category"
            clearable
            placeholder="请选择类目"
            class="sel"
            style="width:160px"
            size="mini"
          >
            <el-option
              v-for="item in valArr"
              :key="item.value"
              :label="item.categoryName"
              :value="item.category"
            ></el-option>
          </el-select>
        </div>
        <div class="mini-flexs" style="margin-top:20px">
          <section class="reblc">
            <el-input
              v-model="listpage.goodsPriceBeginStr"
              :controls="false"
              placeholder="请输入起始价"
              class="deep-number"
              @input="nospace1"
              size="mini"
            ></el-input>
            <span class="lin-hi">至</span>
            <el-input
              v-model="listpage.goodsPriceEndStr"
              :controls="false"
              placeholder="请输入结束价"
              class="left-none"
              @input="nospace2"
              size="mini"
            ></el-input>
          </section>
          <section class="mini-flexs" style="margin-left:10px">
            <el-input
              v-model="listpage.shelfDayBeginStr"
              :controls="false"
              placeholder="请输入有效期"
              class="deep-number"
              @input="nospace3"
              size="mini"
            ></el-input>
            <span class="lin-hi">至</span>
            <el-input
              size="mini"
              v-model="listpage.shelfDayEndStr"
              :controls="false"
              placeholder="请输入有效期"
              class="left-none"
              @input="nospace4"
            ></el-input>
          </section>
          <el-button type="primary" class="btn-search" @click="serach()" size="mini">搜索</el-button>
          <el-button type="success" class="btn-search" @click="qingkong" size="mini">清空筛选</el-button>
        </div>
      </section>
      <section class="screening-box-one">
        <el-button type="primary" class="btn-search" size="mini" @click="goform()">发布商品</el-button>
        <el-button class="btn-search" size="mini" @click="exportlist">导出</el-button>
      </section>
      <section class="table-container">
        <el-table
          @select-all="handleSelectionChange"
          @selection-change="handleSelectionChange"
          :data="list"
          v-loading="loading"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="sort" label="排序" width="50px"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="putawayTime" label="上架时间" width="140px"></el-table-column>
          <el-table-column prop="goodsCode" label="ID" width="150px"></el-table-column>
          <el-table-column prop="address" label="主图">
            <template slot-scope="props">
              <img :src="props.row.thumbImg" v-if="props.row.thumbImg" style="width:100%;height:100%;" />
              <img  v-else src="./logo2.png" style="width:100%;height:100%;"/>
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称" width="100px">
            <template slot-scope="props">
              <span class="elsiner">{{props.row.goodsName || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="goodsOriginalPrice" label="市场价"></el-table-column>
          <el-table-column prop="goodsPrice" label="销售价"></el-table-column>
          <el-table-column prop="anchorMoney" label="主播佣金"></el-table-column>
          <el-table-column prop="accountMoney" label="分享佣金"></el-table-column>
          <el-table-column prop="stock" label="库存"></el-table-column>
          <el-table-column prop="selled" label="销量"></el-table-column>
          <el-table-column prop="selled" label="排序" width="100px">
            <template slot-scope="props">
              <div
                style="width:100%"
                v-show="props.row.disabled"
                @dblclick="updateSort(props.row)"
              >{{props.row.sort || '--'}}</div>
              <el-input
               style="width:100;"
                v-model="props.row.sort"
                :min="1"
                v-show="!props.row.disabled"
                autofocus
                @blur="toSortEnd(props.row)"
                type="number"
              />
            </template>
          </el-table-column>
          <!-- <el-table-column prop="shelfDay" label="保质期" width="60px">
            <template slot-scope="props">
              <span>{{props.row.shelfDay || '--'}}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="是否推荐">
            <template slot-scope="props">
              <el-switch
                v-model="props.row.isRecommend"
                active-value="1"
                inactive-value="0"
                size="mini"
                @change="(val)=>{switchChange(val,props)}"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="props">
              <span v-if="props.row.status == 1">已上架</span>
              <span v-if="props.row.status == 2">待上架</span>
              <span v-if="props.row.status == 3">已下架</span>
              <span v-if="props.row.status == 4">回收站</span>
              <span v-if="props.row.status == 5">草稿箱</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="props">
              <div class="flex-btn" v-if="listpage.listType != 5">
                <el-tooltip class="item light-item" effect="light" placement="top">
                  <span slot="content" style="font-size:12px;color:#9d9d9d">详情</span>
                  <i class="el-icon-picture-outline icon-content" @click="goform(props.row)"></i>
                </el-tooltip>
                <el-tooltip class="item light-item" effect="light" placement="top">
                  <span slot="content" style="font-size:12px;color:#9d9d9d">复制</span>
                  <i class="el-icon-copy-document icon-content" @click="goform(props.row,'copy')"></i>
                </el-tooltip>
                <el-tooltip class="item light-item" effect="light" placement="top" v-if="props.row.status !== 4">
                  <span slot="content" style="font-size:12px;color:#9d9d9d">删除</span>
                  <i class="el-icon-delete icon-content" @click="delgoods(props.row)"></i>
                </el-tooltip>
                <el-tooltip class="item light-item" effect="light" placement="top">
                  <span slot="content" style="font-size:12px;color:#9d9d9d">备注</span>
                  <i class="el-icon-info icon-content" @click="addremark(props.row)"></i>
                </el-tooltip>
                <el-tooltip
                  class="item light-item"
                  effect="light"
                  placement="top"
                  v-if="props.row.status == 2 || props.row.status == 3"
                >
                  <span slot="content" style="font-size:12px;color:#9d9d9d">上架</span>
                  <i class="el-icon-top icon-content" @click="updateStatus(props.row,'down')"></i>
                </el-tooltip>
                <el-tooltip
                  class="item light-item"
                  effect="light"
                  placement="top"
                  v-if="props.row.status == 1"
                >
                  <span slot="content" style="font-size:12px;color:#9d9d9d">下架</span>
                  <i class="el-icon-bottom icon-content" @click="updateStatus(props.row,'up')"></i>
                </el-tooltip>
              </div>
              <div class="flex-btn" v-else>
                <el-tooltip class="item light-item" effect="light" placement="top">
                  <span slot="content" style="font-size:12px;color:#9d9d9d">恢复</span>
                  <i class="el-icon-refresh icon-content" @click="updateStatus(props.row,'pop')"></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="page-box">
        <el-pagination
          v-if="list.length > 0"
          @size-change="handleSizeChange"
          @current-change="changepage"
          layout="sizes,total, prev, pager, next, jumper"
          :page-size="listpage.pageSize"
          :current-page.sync="listpage.curPage"
          :total="totalCount"
          :page-sizes="[10, 20, 30, 50]"
        ></el-pagination>
      </section>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibledel"
        width="30%"
        :before-close="handleClose"
      >
        <span>您确定要此操作吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibledel = false">取 消</el-button>
          <el-button type="primary" @click="delgoods">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="备注" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="请输入备注">
            <el-input v-model="objform.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addremark">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  queryGoodsList,
  fakeDeleteGoods,
  selectShopGoodsCategory,
  exportGoodsList,
  modifyRecommendationStatus,
  updateGoodsSort,
  modifyProductStatus,
} from "@/api/goods";
import { Loading } from 'element-ui';
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogVisibledel: false,
      defaultParams1: {
        value: "id",
        label: "categoryName",
        children: "Children",
      },
      objform: {
        status: "",
        remark: "",
      },
      list: [],
      textarr: [
        {
          val: "0",
          text: "全部",
        },
        {
          val: "1",
          text: "出售中",
        },
        {
          val: "2",
          text: "仓库中",
        },
        {
          val: "5",
          text: "回收站",
        },
      ],
      valArr: [],
      totalCount: "",
      listpage: {
        curPage: 1,
        pageSize: 10,
        listType: 0,
        goodsName: "",
        goodsCode: "",
        goodsBarCode: "",
        category: "",
        goodsPriceBeginStr: "",
        goodsPriceEndStr: "",
        shelfDayBeginStr: "",
        shelfDayEndStr: "",
        orderField: "",
        sortType: "",
      },
      loading: false,
    };
  },
  created() {
    this.getList();
    this.getcat();
  },
  methods: {
    updateSort: function (row) {
      row.disabled = false;
      this.beforeSort = row.sort;
    },
    toSortEnd: function (row) {
      row.disabled = true;
      if (row.sort == this.beforeSort) {
        return false;
      }
      this.liveRoomUpdateSort(row.sort, row.goodsCode);
    },
    liveRoomUpdateSort(sort, goodsCode) {
      let loadingInstance = Loading.service({
        fullscreen: false,
        background: "transparent",
      });
      updateGoodsSort({
        sort,
        goodsCode,
      })
        .then((res) => {
          if (res.data.code == "0000") {
            this.getList();
            loadingInstance.close();
          }
        })
        .catch((res) => {
          loadingInstance.close();
        });
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    updateStatus(row, status) {
      let obj = {
        goodsCodeList: [row.goodsCode],
      };
      if (status == "up") {
        obj.status = 3;
      }
      if (status == "down") {
        obj.status = 1;
      }
      if (status == "pop") {
        obj.status = 2;
      }
      modifyProductStatus(obj).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
          center: true,
        });
        this.getList();
      });
    },
    nospace1(val) {
      this.listpage.goodsPriceBeginStr = val.replace(/[^\d.]/g, "");
    },
    nospace2(val) {
      this.listpage.goodsPriceEndStr = val.replace(/[^\d.]/g, "");
    },
    nospace3(val) {
      this.listpage.shelfDayBeginStr = val.replace(/[^\d.]/g, "");
    },
    nospace4(val) {
      this.listpage.shelfDayEndStr = val.replace(/[^\d.]/g, "");
    },
    goform(row, status) {
      let obj = {
        path: "/goodsform",
      };
      if (row) {
        obj.query = {
          goodsCode: row.goodsCode,
          status: status,
        };
      }
      this.$router.push(obj);
    },
    exportlist() {
      exportGoodsList(this.listpage).then((res) => {
        console.log(res);
      });
    },
    switchChange(val, prpp) {
      console.log(val);
      let obj = {
        goodsCode: prpp.row.goodsCode,
        status: val,
      };
      modifyRecommendationStatus(obj).then((res) => {
        this.$set(this.list[prpp.$index], "isRecommend", val);
        this.$message({
          message: "修改成功",
          type: "success",
          center: true,
        });
      });
    },
    addremark(row) {
      if (!this.dialogFormVisible) {
        this.dialogFormVisible = true;
        this.remarkRow = row;
        this.objform.remark = row.remark;
      } else {
        let objform = Object.assign({}, this.remarkRow, this.objform);
        modifyRecommendationStatus(objform).then((res) => {
          this.$message({
            message: "备注添加成功",
            type: "success",
            center: true,
          });
          this.dialogFormVisible = false;
          this.objform = {
            goodsCode: "",
            status: "",
            remark: "",
          };
        });
      }
    },
    qingkong() {
      let obj = {
        goodsName: "",
        goodsCode: "",
        goodsBarCode: "",
        category: "",
        goodsPriceBeginStr: "",
        goodsPriceEndStr: "",
        shelfDayBeginStr: "",
        shelfDayEndStr: "",
        orderField: "",
        sortType: "",
      };
      this.listpage = Object.assign({}, this.listpage, obj);
      this.getList();
    },
    // 翻页
    changepage(page) {
      this.listpage.curPage = page;
      this.getList();
    },
    // 修改页总数
    handleSizeChange(val) {
      this.listpage.pageSize = val;
      this.getList();
    },
    // 全选的删除按钮
    delall() {},
    serach(val) {
      if (val) {
        this.listpage.listType = val;
      }
      if (this.listpage.goodsPriceBeginStr && !this.listpage.goodsPriceEndStr) {
        this.$message({
          showClose: true,
          message: "价格区间输入有误无法进行搜索",
          type: "error",
          center: true,
        });
        return false;
      }
      if (!this.listpage.goodsPriceBeginStr && this.listpage.goodsPriceEndStr) {
        this.$message({
          showClose: true,
          message: "价格区间输入有误无法进行搜索",
          type: "error",
          center: true,
        });
        return false;
      }
      if (
        parseInt(this.listpage.goodsPriceBeginStr) >
        parseInt(this.listpage.goodsPriceEndStr)
      ) {
        this.$message({
          showClose: true,
          message: "价格区间输入有误无法进行搜索",
          type: "error",
          center: true,
        });
        return false;
      }
      if (this.listpage.shelfDayBeginStr && !this.listpage.shelfDayEndStr) {
        this.$message({
          showClose: true,
          message: "区间输入有误无法进行搜索",
          type: "error",
          center: true,
        });
        return false;
      }
      if (!this.listpage.shelfDayBeginStr && this.listpage.shelfDayEndStr) {
        this.$message({
          showClose: true,
          message: "区间输入有误无法进行搜索",
          type: "error",
          center: true,
        });
        return false;
      }
      if (this.listpage.shelfDayEndStr < this.listpage.shelfDayBeginStr) {
        this.$message({
          showClose: true,
          message: "区间输入有误无法进行搜索",
          type: "error",
          center: true,
        });
        return false;
      }
      this.listpage.curPage = 1;
      this.getList();
    },
    // 获取分类
    getcat() {
      selectShopGoodsCategory().then((res) => {
        this.valArr = [];
        this.valArr = res.body;
      });
    },
    handleClose() {
      this.row = "";
      this.rowname = "";
      this.delrow = "";
      this.dialogVisibledel = false;
    },
    delgoods(row) {
      if (this.dialogVisibledel) {
        let obj = {
          goodsCodes: [this.delrow.goodsCode],
        };
        fakeDeleteGoods(obj).then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
            center: true,
          });
          this.dialogVisibledel = false;
          this.delrow = "";
          this.getList();
        });
      } else {
        this.delrow = row;
        this.dialogVisibledel = true;
      }
    },
    downgoods(row) {},
    getList() {
      this.loading = true;
      queryGoodsList(this.listpage).then((res) => {
        this.loading = false;
        let { records, total } = res.body;
        records.forEach((item, index) => {
          item.disabled = true;
        });
        this.list = records;
        this.totalCount = total;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.table-container {
  width: 100%;
}
.page-box {
  background-color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-search {
  border-radius: 0px;
  margin-left: 10px;
}
.goods-container {
  min-height: 100%;
  width: 100%;
}
.screening-box-one {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: 20px 0px 20px 0px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  border-bottom: 1px solid rgba(231, 234, 236, 1);
}
.screening-box {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  .felx-scr {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: #555555;
    div {
      margin-right: 20px;
      padding-bottom: 10px;
      box-sizing: border-box;
    }
    .spanavtive {
      border-bottom: solid 2px #00aeff;
    }
  }
  .mini-flexs {
    display: flex;
    align-items: center;
    font-size: 12px;
    position: relative;
  }
}
.reblc {
  position: relative;
  display: flex;
}
.lin-hi {
  height: 32px;
  line-height: 32px;
  box-sizing: border-box;
  font-size: 12px;
  z-index: 10;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
.felx-btn {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.felx-btn > div {
  line-height: 28px;
  padding: 0 8px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  border: 1px solid rgba(231, 234, 236, 1);
}
.felx-btn > div:nth-of-type(n-2) {
  border-right: none;
}
.felx-btn > div:last-of-type {
  border-right: 1px solid rgba(231, 234, 236, 1);
}
.elsiner {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.icon-content {
  border: solid 1px #efefef;
  border-radius: 2px;
  padding: 4px;
  display: inline-block;
  box-sizing: border-box;
  font-size: 15px;
}
.reblcs {
  margin-left: 20px;
}
</style>
