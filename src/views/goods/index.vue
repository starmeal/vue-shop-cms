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
        ></el-input>
        <el-input
          clearable
          v-model="listpage.goodsCode"
          placeholder="请输入商品ID"
          class="el-input-s"
          style="width:160px"
        ></el-input>
        <el-input
          clearable
          v-model="listpage.goodsBarCode"
          placeholder="请输入商品条码"
          class="el-input-s"
          style="width:160px"
        ></el-input>
        <el-select
          v-model="listpage.category"
          clearable
          placeholder="请选择类目"
          class="sel"
          style="width:160px"
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
            :max="9999999"
          ></el-input>
          <span class="lin-hi">至</span>
          <el-input
            v-model="listpage.goodsPriceEndStr"
            :controls="false"
            placeholder="请输入结束价"
            class="left-none"
            :max="9999999"
          ></el-input>
        </section>
        <section class="reblcs">
          <el-date-picker
            v-model="value1"
            type="daterange"
            @change="timechange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </section>
        <el-button type="primary" class="btn-search" @click="serach()">搜索</el-button>
        <el-button type="success" class="btn-search" @click="qingkong">清空筛选条件</el-button>
      </div>
    </section>
    <section class="screening-box-one">
      <el-button type="primary" class="btn-search" @click="goform()">发布商品</el-button>
      <el-button class="btn-search" @click="exportlist">导出</el-button>
    </section>
    <section class="table-container">
      <el-table :data="list" v-loading="loading" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="sort" label="排序" width="50px"></el-table-column>
        <el-table-column prop="id" label="ID" width="50px"></el-table-column>
        <el-table-column prop="address" label="主图">
          <template slot-scope="props">
            <img :src="props.row.thumbImg" style="width:100%;height:100%;" />
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
        <el-table-column prop="shelfDay" label="保质期" width="60px">
          <template slot-scope="props">
            <span>{{props.row.shelfDay || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐">
          <template slot-scope="props">
            <el-switch v-model="props.row.isRecommend" :active-value="1" size="mini"></el-switch>
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
                <i class="el-icon-copy-document icon-content"></i>
              </el-tooltip>
              <el-tooltip class="item light-item" effect="light" placement="top">
                <span slot="content" style="font-size:12px;color:#9d9d9d">删除</span>
                <i class="el-icon-delete icon-content" @click="delgoods(props.row)"></i>
              </el-tooltip>
              <el-tooltip
                class="item light-item"
                effect="light"
                placement="top"
                v-if="listpage.listType == 2"
              >
                <span slot="content" style="font-size:12px;color:#9d9d9d">上架</span>
                <i class="el-icon-top icon-content"></i>
              </el-tooltip>
              <el-tooltip
                class="item light-item"
                effect="light"
                placement="top"
                v-if="listpage.listType ==1 "
              >
                <span slot="content" style="font-size:12px;color:#9d9d9d">下架</span>
                <i class="el-icon-bottom icon-content"></i>
              </el-tooltip>
            </div>
            <div class="flex-btn" v-else>
              <el-tooltip class="item light-item" effect="light" placement="top">
                <span slot="content" style="font-size:12px;color:#9d9d9d">恢复</span>
                <i class="el-icon-refresh icon-content" @click="gomodify(props.row)"></i>
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
      <el-dialog title="提示" :visible.sync="dialogVisibledel" width="30%" :before-close="handleClose">
      <span>您确定要此操作吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibledel = false">取 消</el-button>
        <el-button type="primary" @click="delgoods">确 定</el-button>
      </span>
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
} from "@/api/goods";
export default {
  data() {
    return {
      dialogVisibledel: false,
      defaultParams1: {
        value: "id",
        label: "categoryName",
        children: "Children",
      },
      value1: [],
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
    goform(row) {
      let obj = {
        path: "/goodsform",
      };
      if (row) {
        obj.query = {
          goodsCode: row.goodsCode,
        };
      }
      this.$router.push(obj);
    },
    exportlist() {
      exportGoodsList(this.listpage).then((res) => {
        console.log(res);
      });
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
    timechange(val) {
      if (val) {
        this.listpage.shelfDayBeginStr = val[0];
        this.listpage.shelfDayEndStr = val[1];
      }
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
      if (
        (this.listpage.goodsPriceBeginStr &&
          this.listpage.goodsPriceBeginStr !== Number) ||
        (this.listpage.goodsPriceEndStr &&
          this.listpage.goodsPriceEndStr !== Number)
      ) {
        this.$message({
          showClose: true,
          message: "价格区间输入有误无法进行搜索",
          type: "error",
          center: true,
        });
        return false;
      }
      if (this.listpage.goodsPriceBeginStr > this.listpage.goodsPriceEndStr) {
        this.$message({
          showClose: true,
          message: "价格区间输入有误无法进行搜索",
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
        this.list = records;
        this.totalCount = total;
      });
    },
  },
};
</script>
<style scoped lang="scss">
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
  margin-left: 20px;
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
  font-size: 12px;
}
.reblcs {
  margin-left: 20px;
}
</style>
