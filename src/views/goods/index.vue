<template>
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
        <el-cascader
          :props="defaultParams1"
          class="el-input-s"
          :options="valArr"
          style="width:160px"
          placeholder="请选择商品分类"
          v-model="listpage.category"
        ></el-cascader>
      </div>
      <div class="mini-flexs" style="margin-top:20px">
        <section class="reblc">
          <el-input-number
            v-model="listpage.goodsPriceBeginStr"
            :controls="false"
            label="请输入价格"
            class="deep-number"
            :max="9999999"
          ></el-input-number>
          <span class="lin-hi">至</span>
          <el-input-number
            v-model="listpage.goodsPriceBeginStr"
            :controls="false"
            label="请输入价格"
            class="left-none"
            :max="9999999"
          ></el-input-number>
        </section>
        <section class="reblc">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </section>
        <el-button type="primary" class="btn-search">搜索</el-button>
        <el-button type="success" class="btn-search">清空筛选条件</el-button>
      </div>
    </section>
    <section class="screening-box-one">
      <el-button type="primary" class="btn-search">发布商品</el-button>
    </section>
    <section class="table-container">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="address" label="主图">
          <template slot-scope="props">
            <img :src="props.row.thumbImg" style="width:100%;height:100%;" />
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsOriginalPrice" label="市场价"></el-table-column>
        <el-table-column prop="goodsPrice" label="销售价"></el-table-column>
        <el-table-column prop="anchorMoney" label="主播佣金"></el-table-column>
        <el-table-column prop="accountMoney" label="分享佣金"></el-table-column>
        <el-table-column prop="stock" label="库存"></el-table-column>
        <el-table-column prop="selled" label="销量"></el-table-column>
        <el-table-column prop="shelfDay" label="保质期"></el-table-column>
        <el-table-column prop="address" label="是否推荐"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script>
import { queryGoodsList, selectShopCategoryv2 } from "@/api/goods";
export default {
  data() {
    return {
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
        // {
        //   val: "3",
        //   text: "库存预警",
        // },
        // {
        //   val: "4",
        //   text: "保质期预警",
        // },
        {
          val: "5",
          text: "回收站",
        },
      ],
      valArr: [],
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
    };
  },
  created() {
    this.getlist();
    this.getcat();
  },
  methods: {
    serach(val) {
      this.listpage.listType = val;
    },
    // 获取分类
    getcat() {
      selectShopCategoryv2().then((res) => {
        this.valArr = [];
        this.valArr = res.body;
      });
    },
    getlist() {
      queryGoodsList(this.listpage).then((res) => {
        let { records, pages } = res.body;
        this.list = records;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.table-container {
  width: 100%;
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
  padding: 20px;
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
.screening-box-one {
  margin-top: 20px;
}
</style>
