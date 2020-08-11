<template>
  <div>
    <!-- v-adaptive  -->
    <div class="operator">
      <el-table :data="list" v-loading="loading" style="width: 100%;height:100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="nickName" label="用户名"></el-table-column>
        <el-table-column prop="actualName" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="lastLoginDate" label="最后一次登录"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="props">
            <el-tooltip class="item light-item" effect="light" placement="top">
              <span slot="content" style="font-size:12px;color:#9d9d9d">编辑</span>
              <i class="el-icon-tickets icon-content" @click="deluser(props.row)"></i>
            </el-tooltip>
            <el-tooltip class="item light-item" effect="light" placement="top">
              <span slot="content" style="font-size:12px;color:#9d9d9d">删除</span>
              <i class="el-icon-delete icon-content" @click="deluser(props.row)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { permissionuser } from "@/api/operator";
export default {
  data() {
    return {
      listpage: {
        curPage: 1,
        pageSize: 10,
      },
      totalCount: 0,
      loading: true,
      list: [],
    };
  },
  created() {
    this.getpermissionuser();
  },
  methods: {
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
    getpermissionuser() {
      permissionuser(this.listpage).then((res) => {
        this.loading = false;
        this.list = res.body.records;
        this.totalCount = res.body.total;
        console.log(res);
      });
    },
    deluser() {},
  },
};
</script>

<style>
.operator {
  min-height: 100%;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.operator > div {
  flex: 1;
}
.operator > div:last-of-type {
  flex: 0 0 40px;
}
.icon-content {
  border: solid 1px #efefef;
  border-radius: 2px;
  padding: 4px;
  display: inline-block;
  box-sizing: border-box;
  font-size: 15px;
}
.page-box {
  background-color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>