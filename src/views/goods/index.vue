<template>
  <div class="goods-container">
    <section class="screening-box">
      <div class="felx-scr">
        <span>全部</span>
        <span>出售中</span>
        <span>仓库中</span>
        <span>库存预警</span>
        <span>保质期预警</span>
      </div>
    </section>
    <section class="table-container"></section>
  </div>
</template>

<script>
import { queryGoodsList } from "@/api/goods";
export default {
  data() {
    return {
      pageData: {
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
  },
  methods: {
    getlist() {
      queryGoodsList(this.pageData).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style scoped lang="scss">
.goods-container {
  width: 100%;
  min-height: 100%;
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
    &:span{
      margin-right: 20px;
    }
  }
}
</style>
