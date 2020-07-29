<template>
  <div>
    <section ref="goodslist">
      <div class="operation-container"></div>
    </section>
    <section class="table-container"></section>
  </div>
</template>

<script>
import { queryGoodsList } from "@/api/goods";
export default {
  data() {
    return {
        pageData:{
            curPage:1,
            pageSize:10,
            listType:0,
            goodsName:'',
            goodsCode:'',
            goodsBarCode:'',
            category:'',
            goodsPriceBeginStr:'',
            goodsPriceEndStr:'',
            shelfDayBeginStr:'',
            shelfDayEndStr:'',
            orderField:'',
            sortType:'',
        }
    };
  },
  created() {
      this.getlist()
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
</style>
