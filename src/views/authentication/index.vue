<template>
  <div>
    <div class="form-content">
      <el-form ref="form" :model="form" label-width="150px">
        <div class="title">选择类目</div>
        <el-form-item label="经验类目：">
          <span>食品</span>
          <span>化妆品</span>
        </el-form-item>
        <el-form-item label="增加类目：">
          <el-cascader v-model="value" :options="options" size="mini"></el-cascader>
        </el-form-item>
        <el-form-item label="需要材料：">
          <div>1:证明合法经营的材料：三证/五证合一营业执照；</div>
          <div style="color:#3976e6">请提供《食品流通许可证》或《食品经营许可证》或《食品生产许可证》或《全国工业产品生产许可证》</div>
          <div>2:证明真实经营的材料：店铺门头、店铺内景、收银台照片，无实体门店的线上商家可提供线上店铺首页、管理后台、商品照片；</div>
          <div>3:证明实际经营人材料：法人手持证件照，法人身份证正反面照片；</div>
          <div>4:照片规则：照片需要四角完整，清晰可辨，若加水印需保证照片重要信息清晰可辨；可提交复印件，每张复印件均需加盖完整红色公章；</div>
          <div>5:提现、发票的主体需要与认证主题一致，请如实填写主题认证信息；</div>
          <div>6:详细资质要求可参考《认证资质要求》。</div>
        </el-form-item>
        <div class="title">营业执照信息</div>
        <el-form-item>
          <div>输入你的企业名称或统一社会信用代码:</div>
          <el-input v-model="value" placeholder="请输入内容" style="width:400px" size="mini"></el-input>
          <el-button type="primary" size="mini" style="margin-left:20px">搜索</el-button>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input placeholder="请输入企业名称" clearable style="width:400px" size="mini"></el-input>
          <div>该名称需要与提现银行卡所对应的对公账户名称一致</div>
        </el-form-item>
        <el-form-item label="注册地址：">
          <el-cascader v-model="value" :options="options" size="mini"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            style="width:450px:"
            placeholder="请输入内容"
            v-model="textarea"
            rows="5"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="经营范围：">
          <el-input
            type="textarea"
            style="width:450px"
            placeholder="请输入内容"
            v-model="textarea"
            rows="3"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <el-input size="mini" style="width:400px" placeholder="请输入内容"></el-input>
          <div>请输入营业执照18位统一社会信用代码</div>
        </el-form-item>
        <el-form-item label="营业期限：">
          <div>
            <el-radio v-model="radio" label="1">区间有效</el-radio>
            <el-date-picker
              v-model="value"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div>
            <el-radio v-model="radio" label="2">长期有效</el-radio>
            <el-date-picker v-model="value" type="date" placeholder="选择日期" size="mini"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="营业执照照片：">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="title">法人信息</div>
        <div style="margin-left: 52px; padding: 20px 0px;font-size:12px">法人代表人证件照（身份证）</div>
        <el-form-item label="手持身份证：">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div>
            必须为彩色图片且小于4M，文件格式为bmp，png，jpeg，或gif。
            <span style="color:#3976e6">查看示例</span>
          </div>
        </el-form-item>
        <el-form-item label="身份证正面：">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证反面：">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div style="margin-left: 52px; padding: 20px 0px; font-size:12px">法人代表信息</div>
        <el-form-item label="法人代表姓名：">
          <el-input v-model="value" placeholder="请输入内容" style="width:400px" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="证件号码：">
          <el-input v-model="value" placeholder="请输入内容" style="width:400px" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="法人手机：">
          <el-input v-model="value" placeholder="请输入内容" style="width:400px" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="证件有效期：">
          <div>
            <el-radio v-model="radio" label="1">区间有效</el-radio>
            <el-date-picker
              v-model="value"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div>
            <el-radio v-model="radio" label="2">长期有效</el-radio>
            <el-date-picker v-model="value" type="date" placeholder="选择日期" size="mini"></el-date-picker>
            <span style="margin-left:10px">身份证开始日期</span>
          </div>
        </el-form-item>
        <div class="title" style="margin-bottom:20px">其他资质</div>
        <el-form-item>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div style="width:80%">
            请提供《食品流通许可证》或《食品经营许可证》或《食品生产许可证》或《全国工业产品生产许可证》；必须为彩色图片且小于6M，文件格式为bmp、png、jpeg、或gif
            <span
              style="color:#3976e6"
            >查看示例</span>
          </div>
        </el-form-item>
         <el-form-item>
           <el-button type="danger" size="mini">提交审核</el-button>
         </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 1,
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      value: "",
      form: {
        name
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style>
.el-textarea .el-textarea__inner {
  resize: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>

<style lang="scss" scpoed>
.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #f0f0f0;
  text-indent: 40px;
}
.form-content {
  background: #fff;
}
</style>