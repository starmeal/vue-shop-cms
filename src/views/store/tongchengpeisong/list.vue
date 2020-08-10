<template>
  <div class="authentication yunfeiList">
    <div class="innerContainer">
      <div class="top_button_w">
        <el-button :size="size" type="success" @click="add">增加</el-button>
        <el-input
          v-model="listpage.templateName"
          placeholder="请搜索模板名称"
          :size="size"
          clearable
          @clear="searchlist"
          class="el-input-w"
        ></el-input>
        <el-button
          icon="el-icon-search"
          :loading="searchLoading"
          :size="size"
          @click="searchlist"
        >搜索</el-button>
      </div>

      <el-table ref="multipleTable" :data="list" v-loading="tableloading">
        <el-table-column prop="sort" label="排序">
          <template slot-scope="{row,$index}">
            <div v-show="!row.isSet" @dblclick="dblclick(row,$index)">{{row.sort}}</div>
            <el-input
              @keyup.native="keyup(row)"
              v-show="row.isSet"
              style="wdith:50px"
              @blur="blur(row,$index)"
              v-model="row.sort"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="templateName" label="模板名称"></el-table-column>
        <el-table-column label="计费方式">
          <template slot-scope="props">
            {{
            props.row.chargeMode == 1
            ? "按件数"
            : props.row.chargeMode == 2
            ? "按重量"
            : "按体积"
            }}
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="100">
          <template slot-scope="{row,$index}">
            <el-switch
              v-model="row.isEnabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="scwithisEnabled(row,$index)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="默认" width="100">
          <template slot-scope="{row,$index}">
            <el-switch
              v-model="row.isChecked"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="scwithisChecked(row,$index)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="{row}">{{row.createTime || '--'}}</template>
        </el-table-column>
        <el-table-column prop="unreachableCityNames" width="200" label="不可到达城市">
          <template slot-scope="props">
            <el-popover
              popper-class="popper-class-w"
              placement="top-start"
              width="250"
              height="500"
              trigger="hover"
              :content="props.row.unreachableCityNames | addressFilters"
            >
              <div
                class="hidden3"
                slot="reference"
              >{{ props.row.unreachableCityNames | addressFilters }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="caozuo" label="操作" width="200px">
          <template slot-scope="props">
            <el-tooltip class="item light-item" effect="light" placement="top">
              <span slot="content" style="font-size:12px;color:#9d9d9d">删除</span>
              <i class="el-icon-delete icon-content" @click="deleteList(props.row)"></i>
            </el-tooltip>
            <el-tooltip class="item light-item" effect="light" placement="top">
              <span slot="content" style="font-size:12px;color:#9d9d9d">修改</span>
              <i class="el-icon-edit icon-content" @click="editorList(props.row.templateId)"></i>
            </el-tooltip>
            <el-tooltip class="item light-item" effect="light" placement="top">
              <span slot="content" style="font-size:12px;color:#9d9d9d">查看</span>
              <i class="el-icon-edit icon-content" @click="toLook(props.row.templateId)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="templateName" :visible.sync="dialogVisible" width="30%">
      <span>确认删除【{{ templateName }}】吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="makeSureDeleteList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMerTemplateList,
  delMerTemplate,
  setTemplateIsEnabled,
  setTemplateIsChecked,
  setTemplateSort,
} from "@/api/store/index.js";
export default {
  data() {
    return {
      dblclickNum: "",
      templateId: "",
      dialogVisible: false,
      templateName: "",
      tableloading: true,
      list: [],
      searchLoading: false,
      size: "mini",
      listpage: {
        templateName: "",
      },
    };
  },
  filters: {
    addressFilters: function (value) {
      if (value.length == 0 || !value) {
        return "--";
      }
      if (value[0] == "[") {
        return JSON.parse(value).toString();
      }
      return value;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    keyup(e) {
      let sort = parseInt(e.sort);
      e.sort = sort ? sort : 0;
    },
    //  是否启用按钮事件
    async scwithisEnabled(row, index) {
      this.searchLoading = true;
      let { body, code } = await setTemplateIsEnabled({
        templateId: row.templateId,
        isEnabled: row.isEnabled ? 1 : 0,
      });
      this.searchLoading = false;
      if (code != "000000") {
        this.$set(this.list[index], "isEnabled", !row.isEnabled);
      }
    },
    async scwithisChecked(row, index) {
      this.searchLoading = true;
      let { body, code } = await setTemplateIsChecked({
        templateId: row.templateId,
        isChecked: row.isChecked ? 1 : 0,
      });
      this.searchLoading = false;
      if (code != "000000") {
        this.$set(this.list[index], "isChecked", !row.isChecked);
      } else {
        this.list.forEach((res, indexs) => {
          if (indexs != index) {
            res.isChecked = false;
          }
        });
        this.list.push(this.list.pop());
      }
    },
    dblclick(row, index) {
      this.dblclickNum = row.sort;
      this.list.forEach((res, indexs) => {
        if (indexs != index) {
          res.isSet = false;
        } else {
          res.isSet = true;
        }
      });
    },
    async blur(row, index) {
      this.list[index].isSet = false;
      if (this.dblclickNum == row.sort) {
        return;
      }
      let { body, code } = await setTemplateSort({
        templateId: row.templateId,
        sort: row.sort,
      });
      if (code == "000000") {
        this.getList();
      }
    },
    toLook(templateId) {
      let obj = {
        path: "/expressDeliveryAdd",
        query: {
          templateId: templateId,
          lock: true,
        },
      };
      this.$router.push(obj);
      // this.$router.options.routes.forEach((element) => {
      //   if (element.path == "/extra") {
      //     element.children.forEach((el) => {
      //       if (el.path == "/templateform") {
      //         el.meta.title = "查看运费模板";
      //         console.log(el);
      //       }
      //     });
      //   }
      // });
      // this.$router.push({
      //   path: "/templateForm",
      //   query: {
      //     title: "查看运费模板",
      //     templateId: templateId,
      //     look: "true",
      //   },
      // });
      // this.$router.push(`/templateForm?templateId=${templateId}&look=true`);
    },
    editorList(templateId) {
      // this.$router.options.routes.forEach((element) => {
      //   if (element.path == "/extra") {
      //     element.children.forEach((el) => {
      //       if (el.path == "/templateform") {
      //         el.meta.title = "编辑运费模板";
      //         console.log(el);
      //       }
      //     });
      //   }
      // });
      let obj = {
        path: "/expressDeliveryAdd",
        query: {
          templateId: templateId,
          lock: false,
        },
      };
      this.$router.push(obj);
      // this.$router.push(`/templateForm?templateId=${templateId}`);
    },
    makeSureDeleteList() {
      delMerTemplate({
        templateId: this.templateId,
      })
        .then((res) => {
          if (res.code == "000000") {
            this.dialogVisible = false;
            this.getList();
          }
        })
        .catch((res) => {});
    },
    deleteList(row) {
      let { templateName, templateId } = row;
      this.templateId = templateId;
      this.templateName = templateName;
      this.dialogVisible = true;
    },

    // 请求列表
    async getList() {
      this.tableloading = true;
      let { body } = await getMerTemplateList(this.listpage);
      this.searchLoading = false;
      this.tableloading = false;
      body.map((res) => {
        res.isChecked = res.isChecked == 1;
        res.isEnabled = res.isEnabled == 1;
        res.isSet = false;
      });
      this.list = body;
    },
    // 条件筛选
    searchlist() {
      this.searchLoading = true;
      this.getList();
    },
    add() {
      let obj = {
        path: "/expressDeliveryAdd",
        query: {
          templateId: "",
          lock: false,
        },
      };
      this.$router.push(obj);
    },
  },
};
</script>

<style scoped>
.authentication {
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  font-family: MicrosoftYaHei-Bold;
}
.innerContainer {
  /* width: 98%;
  margin: 0 auto;
  padding: 20px 0px; */
  background: #fff;
}
.top_button_w {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 10px 0px;
  margin-bottom: 10px;
}
.el-input-w {
  width: 200px;
  margin: 0 10px;
}
.hidden3 {
  -webkit-line-clamp: 4;
  line-height: 1.5em;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style lang="scss">
.yunfeiList {
  .el-table {
    margin-top: 10px;
    // width: 96%;
    margin: 0 auto;
  }
  .el-popover {
    height: 20px;
  }
}
</style>