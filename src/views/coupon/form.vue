<template>
  <div class="big-container">
    <section class="form-container">
      <div style="height:20px"></div>
      <el-form ref="form" :rules="rules" :size="size" :model="form" label-width="150px">
        <el-form-item label="优惠券名称" prop="noticeName">
          <el-input
            style="width:300px"
            class="input-update"
            :size="size"
            type="textarea"
            show-word-limit
            v-model="form.noticeName"
            :rows="2"
            maxlength="30"
            :placeholder="`公告名称在30字以内`"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型" prop="noticeName">
          <el-select v-model="form.noticeName" placeholder="请选择类型" style="width:300px">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in options"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满减金额" prop="noticeName">
          <span style="margin-right:20px;font-size: 12px;color: #333;">满</span>
          <el-input
            @keyup.native="changeMoeny"
            :controls="false"
            style="width:90px;"
            v-model.trim="form.nowMoney"
          ></el-input>
          <span style="margin:0 20px;font-size: 12px;color: #333;">减</span>
          <el-input
            @keyup.native="changeMoeny"
            :controls="false"
            style="width:90px;"
            v-model.trim="form.nowMoney"
          ></el-input>
        </el-form-item>
        <el-form-item label="发行数量" prop="noticeName">
          <el-input-number
            v-model="form.noticeName"
            :controls="false"
            style="width:300px"
            class="num-in"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="限领" prop="noticeName">
          <span style="font-size:12px">每人限领一张</span>
        </el-form-item>
        <el-form-item label="开始时间" prop="noticeName">
          <el-date-picker
            :size="size"
            placeholder="选择开始时间"
            :picker-options="endTimepickerOptions"
            v-model="form.displayBeginTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="noticeName">
          <el-date-picker
            placeholder="选择结束时间"
            :picker-options="endTimepickerOptions1"
            :size="size"
            v-model="form.displayEndTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="优惠券类型" prop="noticeName">
          <el-select v-model="form.noticeName" placeholder="优惠券状态" style="width:300px">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in options"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="noticeName">
          <el-input
            style="width:300px"
            class="input-update"
            :size="size"
            type="textarea"
            show-word-limit
            v-model="form.noticeName"
            :rows="5"
            maxlength="30"
            :placeholder="`公告名称在30字以内`"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="商品范围" prop="noticeName">
          <el-radio-group v-model="radio">
            <el-radio :label="3">全场通用</el-radio>
            <el-radio :label="6">指定商品</el-radio>
            <el-radio :label="9">指定分类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="添加商品" prop="noticeName">
          <el-input
            placeholder="请输入商品名称/商品货号"
            v-model="form.noticeName"
            class="input-with-select"
            style="width:240px"
          >
            <el-button slot="append">搜索</el-button>
          </el-input>
          <el-input
            placeholder="请选择商品"
            v-model="form.noticeName"
            class="input-with-select"
            style="width:280px;margin-left:30px"
          >
            <el-button slot="append">添加</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">完成</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import {
  addShopMerchantsNotice,
  selectShopMerchantsNoticeById,
  updateShopMerchantsNoticeById,
} from "@/api/Notice";
export default {
  data() {
    return {
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
          value: 1,
          label: "新人券",
        },
        {
          value: 2,
          label: "普通券",
        },
      ],
      rules: {
        noticeName: [
          { required: true, message: "请输入公告标题", trigger: "blur" },
        ],
        displayBeginTime: [
          { required: true, message: "请选择开始时间", trigger: "change" },
        ],
        displayEndTime: [
          { required: true, message: "请选择结束时间", trigger: "change" },
        ],
        noticeContent: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
        ],
      },
      form: {
        noticeName: "",
        displayBeginTime: "",
        displayEndTime: "",
        noticeContent: "",
        publishStatus: "1",
      },
    };
  },
  created() {},
  methods: {
    dealDisabledDate(time) {
      return (
        time.getTime() + 24 * 60 * 60 * 1000 <
        new Date(this.form.displayBeginTime).getTime() + 24 * 60 * 60 * 1000
      );
    },
    changeMoeny(val) {
      this.form.nowMoney = this.form.nowMoney.replace(/[^\.\d]/g, "");
      this.form.nowMoney = this.form.nowMoney.replace(".", "");
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
