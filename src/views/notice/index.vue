<template>
  <div class="banner-container">
    <div class="section-contianer">
      <section class="form-container">
        <el-form ref="form" :rules="rules" :size="size" :model="form" label-width="200px">
          <el-form-item label="公告标题" prop="noticeName">
            <el-input
              :size="size"
              type="textarea"
              show-word-limit
              v-model="form.noticeName"
              :rows="2"
              maxlength="30"
              :placeholder="`公告名称在50字以内`"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="公告时间" prop="displayBeginTime">
            <div class="flex-box">
              <div class="font-f">开始时间：</div>
              <el-date-picker
                :size="size"
                placeholder="选择时间"
                :picker-options="endTimepickerOptions"
                v-model="form.displayBeginTime"
                value-format="yyyy-MM-dd HH:MM:SS"
                type="datetime"
              ></el-date-picker>
              <div class="font-f">结束时间：</div>
              <el-date-picker
                placeholder="公告展示结束时间"
                :picker-options="endTimepickerOptions1"
                :size="size"
                v-model="form.displayEndTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:MM:SS"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="公告内容" prop="noticeContent">
            <el-input
              type="textarea"
              placeholder="请输入内容最多150字"
              v-model="form.noticeContent"
              maxlength="150"
              size="mini"
              resize="none"
              :rows="8"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="是否发布">
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button
              :size="size"
              type="primary"
              @click="submitgoods()"
            >{{ $route.query.id ? "修改" : "创建" }}</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
import {
  addShopMerchantsNotice,
  selectShopMerchantsNoticeById,
  updateShopMerchantsNoticeById
} from "@/api/Notice";
export default {
  data() {
    return {
      radio: "1",
      size: "mini",
      endTimepickerOptions: {
        disabledDate: time => {
          return time.getTime() + 24 * 60 * 60 * 1000 < new Date().getTime();
        }
      },
      endTimepickerOptions1: {
        disabledDate: time => {
          return this.dealDisabledDate(time);
        }
      },
      //  <!-- 1待发布；2已发布；3-已撤销 -->
      options: [
        {
          value: 1,
          label: "待发布"
        },
        {
          value: 2,
          label: "已发布"
        }
      ],
      rules: {
        noticeName: [
          { required: true, message: "请输入公告标题", trigger: "blur" }
        ],
        displayBeginTime: [
          { required: true, message: "请选择开始时间", trigger: "change" }
        ],
        displayEndTime: [
          { required: true, message: "请选择结束时间", trigger: "change" }
        ],
        noticeContent: [
          { required: true, message: "请输入公告内容", trigger: "blur" }
        ]
      },
      form: {
        noticeName: "",
        displayBeginTime: "",
        displayEndTime: "",
        noticeContent: "",
        publishStatus: ""
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      let obj = {
        id: this.$route.query.id
      };
      selectShopMerchantsNoticeById(obj).then(res => {
        this.form = res.body;
      });
    }
  },
  methods: {
    dealDisabledDate(time) {
      return (
        time.getTime() + 24 * 60 * 60 * 1000 <
        new Date(this.form.displayBeginTime).getTime() + 24 * 60 * 60 * 1000
      );
    },
    submitgoods() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.displayEndTime == "") {
            this.$message({
              message: "警告，请选择结束时间",
              type: "warning"
            });
            return false;
          }
          if (
            new Date(this.form.displayBeginTime).getTime() >
            new Date(this.form.displayEndTime).getTime()
          ) {
            this.$message({
              message: "警告，公告的结束时间要大于开始时间！",
              type: "warning"
            });
            return false;
          }
          if (this.$route.query.id) {
            let obj = Object.assign({}, this.form, {
              id: this.$route.query.id
            });
            updateShopMerchantsNoticeById(obj).then(res => {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.$router.push({
                path: "/Notice/Noticelist"
              });
            });
            return false;
          }
          addShopMerchantsNotice(this.form).then(res => {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.$router.push({
              path: "/Notice/Noticelist"
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.el-textarea__inner {
  resize: none;
}
</style>
<style scoped lang="scss">
.font-f {
  font-size: 12px;
  color: #606266;
  margin-right: 20px;
}
.flex-box {
  display: flex;
  justify-content: space-between;
}
.section-contianer {
  width: 98%;
  margin: 0 auto;
  padding: 20px 0px;
  background: #fff;
  border-radius: 4px;
}
.form-container {
  width: 85%;
  background-color: #fff;
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
