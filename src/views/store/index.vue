<template>
  <div class="shopSettings">
    <div class="containers">
      <el-form :model="form" :rules="rules" ref="form" :size="size" label-width="200px" class="demo-form">
        <el-form-item label="经营类目" prop="name">
          {{form.name}}
        </el-form-item>
        <el-form-item label="店铺名称" prop="name1">
          <el-input v-model="form.name1" placeholder="请输入店铺名称，建议15字以内"></el-input>
          <div style="font-size: 12px;color:#999;">详细阅读 <span style="color:#3976e6">《店铺命名规范》</span>，如需申请“旗舰店”、“专营店”、“专卖店”，请进入<span style="color:#3976e6">《店铺名称认证》</span></div>
        </el-form-item>
        <el-form-item label="店铺标志" prop="">

        </el-form-item>
        <el-form-item label="店铺介绍" prop="name3">
          <el-input v-model="form.name3"
                    placeholder="请输入店铺的经营范围、经营品牌、售后承诺等相关的文字(入驻申请时的简介)"
                    type="textarea"
                    show-word-limit
                    maxlength="200"
                    rows="6"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" prop="name5">
          <el-input class="inputStyle1" v-model="form.name4" placeholder="区号"></el-input>
          <el-input class="inputStyle2" v-model="form.name5" placeholder="如果输入手机号不填区号"></el-input>
        </el-form-item>
        <el-form-item label="经营地址" prop="name7">
          <cascader level="city" :size="size" @changecity="changecity" />
          <el-input v-model="form.name7"
                    placeholder="填写详细地址"
                    type="textarea"
                    show-word-limit
                    style="margin-top: 10px;"
                    maxlength="100"
                    rows="4"></el-input>
        </el-form-item>
        <el-form-item label="店招图片" prop="">

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import cascader from './../../components/city/cascader'
  import {shopSettings} from "@/api/store/index";
export default {
  data(){
    return {
      size: 'mini',
      form: {
        name: '123',
        name1: '',
        name3: '',
        name4: '',
        name5: '',
        name7: ''
      },
      rules: {
        name1: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        name3: [
          { required: true, message: '请输入店铺介绍', trigger: 'blur' }
        ],
        name5: [
          { required: true, message: '请输入客服电话', trigger: 'blur' }
        ],
        name7: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    cascader
  },
  created(){
    this.getInfo();
  },
  methods: {
    async getInfo(){
      let res = await shopSettings();
      console.log(res);
    },
    //城市选择
    changecity(){

    },
    //保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('提交');
        } else {
          console.log('错误提交');
          return false;
        }
      });
    },
  }
}
</script>

<style>
 .containers {
    width: 98%;
    margin: 0 auto;
    padding: 20px 0px;
    background: #fff;
    border-radius: 4px;
 }
  .demo-form {
    width: 85%;
  }
  .inputStyle1 {
    width: 200px;
    margin-right: 15px;
  }
  .inputStyle2 {
    width: 465px;
  }
</style>