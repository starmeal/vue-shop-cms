<template>
  <div class="big-container">
    <section class="form-container">
      <el-form ref="form" :model="form" label-width="150px">
        <div class="title title-margin">
          <Icon icon="jibenxinxi" class="authentication-title" />基本信息
        </div>
        <el-form-item label="商品类型">
          <el-select v-model="value" placeholder="请选择商品类型" :size="size" class="input-update">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input
            class="input-update"
            type="text"
            placeholder="请输入内容"
            v-model="value"
            maxlength="10"
            show-word-limit
            :size="size"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类目">
          <el-select v-model="value" placeholder="请选择商品类型" :size="size" class="input-update">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品所在地">
          <cascader v-model="cityvalue" level="city" size="small" width="90%"></cascader>
        </el-form-item>
        <el-form-item label="商品重量（克）">
          <el-input-number
            class="deep-number"
            v-model="value"
            :controls="false"
            controls-position="right"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload action multiple class="bili">
            <section class="input-con">
              <input placeholder="批量上传图片" size="small" class="input-cla" />
              <div class="btnsss">选择图片</div>
            </section>
          </el-upload>
          <!-- <el-upload
              class="upload-png"
              accept=".jpg, .png, .gif"
              action
              :data="{
                        data:'powerOfAttorneyImg',
                        idx:'other'
                      }"
              :http-request="uploadHttp"
              :multiple="true"
            >
              <input placeholder="批量上传图片" size="small" class="input-cla" />
              <div class="btnsss">选择图片</div>
          </el-upload>-->
        </el-form-item>
        <el-form-item label="展示视频">
          <div id="mse"></div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import Player from "xgplayer";
import Icon from "@/components/base/icon.vue";
import cascader from "@/components/city/cascader.vue";
export default {
  components: {
    Icon,
    cascader,
  },
  data() {
    return {
      videoplayer: "",
      options: [],
      cityvalue: [],
      form: "",
      size: "small",
      value: "",
      form: {
        noticeName: "",
      },
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initvideo();
    });
  },
  methods: {
    uploadHttp({ file, data }) {
      if (file.type.split("/")[0] !== "image") {
        this.$message({
          message: "请上传图片",
          type: "warning",
        });
        return false;
      }
      if (file.size > 1024 * 1024 * 2) {
        this.$message({
          message: "上传图片过大",
          type: "warning",
        });
        return false;
      }
      let consat = `hs_star/app_shop/goods/${this.randomNum(1, 100)}`;
      let that = this;
      SSupload(consat, file)
        .then(({ res, url, name }) => {
          if (res && res.status == 200) {
            if (url) {
              // 替换文件
              // https://hs-star-bucket-prod.oss-cn-zhangjiakou.aliyuncs.com
              url = url.replace(
                "https://hs-star-bucket-prod.oss-cn-zhangjiakou.aliyuncs.com",
                "https://hs.star.oss.xingfaner.cn"
              );
              if (data.data == "powerOfAttorneyImg") {
                console.log(url);
              }
            }
          }
        })
        .catch((err) => {
          // loading.close();
          this.$message("图片上传失败");
          console.log(`阿里云OSS上传图片失败回调`, err);
        });
    },
    initvideo() {
      this.videoplayer = new Player({
        id: "mse",
        autoplay: false,
        volume: 0.3,
        loop: true,
        lang: "zh-cn",
        url:
          "https://hs-star-bucket-test.oss-cn-zhangjiakou.aliyuncs.com/hs_star/app_shop/goods/202073/1360891594134896001593738601000.mp4",
        poster:
          "//s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
        width: 600,
        height: 337.5,
      });
    },
  },
};
</script>
<style>
.bili > .el-upload {
  display: block;
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
.title {
  width: 100%;
  height: 48px;
  line-height: 48px;
  padding-left: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-family: Microsoft YaHei, MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  border-bottom: solid 2px #fff;
  box-sizing: border-box;
}
.title-margin {
  margin-bottom: 18px;
}
.input-cla {
  width: 100%;
  background: #efefef;
  height: 32px;
  display: inline-block;
  background: #eaeaea;
  border: 1px solid rgba(234, 234, 234, 1);
  outline-color: rgba(68, 171, 247, 1);
  text-indent: 10px;
}
.input-con {
  position: relative;
  width: 90%;
}
.input-cla:focus {
  background: rgba(239, 239, 239, 1);
}
.btnsss {
  background: rgba(68, 171, 247, 1);
  border: 1px solid rgba(68, 171, 247, 1);
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  width: 82px;
  text-align: center;
  line-height: 32px;
  height: 32px;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
}
</style>
