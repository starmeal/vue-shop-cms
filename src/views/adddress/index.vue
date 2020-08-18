<template>
  <div>
    <div class="address">
      <div class="ptn-box">
        <el-button type="primary" size="mini" @click="showform">增加地址</el-button>
      </div>
      <div class="table-box">
        <el-table :data="list" style="width: 100%" v-adaptive height="100px">
          <el-table-column prop="recipientsName" label="联系人" width="140"></el-table-column>
          <el-table-column prop="recipientsTel" label="联系方式" width="140">
            <template slot-scope="props">
              <div>{{props.row.landlinePhone}}</div>
              <div>{{props.row.recipientsTel}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="addressInfo" label="地址">
            <template slot-scope="props">
              <div>
                {{props.row.addressInfo}}
                <span
                  style="color:#67C23A;margin-left:10px"
                >{{props.row.isDefaultAddress == 1 ? '默认' : ''}}</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="addressType" label="地址类型" width="140">
            <template slot-scope="props">
              <div>
                {{props.row.addressType == 1 ? '买家地址' : '商家地址'}}
               
              </div>
            </template>
          </el-table-column>-->
          <el-table-column prop="address" label="操作" width="170">
            <template slot-scope="props">
              <el-button type="text" @click="getDetail(props.row)">编辑</el-button>
              <el-button
                type="text"
                @click="deladdress(props.row)"
                :disabled="props.row.isDefaultAddress == 1"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-form :model="form" label-width="120px" :rules="rules" ref="ruleForm">
          <el-form-item label="联系人" prop="recipientsName">
            <el-input
              v-model.trim="form.recipientsName"
              style="width:320px"
              :onkeyup="form.recipientsName = form.recipientsName.replace(/\s+/g,'')"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="recipientsTel">
            <el-input v-model="form.recipientsTel" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="座机">
            <el-input
              v-model="form.quNumber"
              @input="(val)=>{
                nospace1('quNumber',val)
              } "
              style="width:100px;margin-right:10px"
              placeholder="区号"
            ></el-input>
            <el-input
              @input="(val)=>{
                nospace1('landlinePhone',val)
              } "
              v-model="form.landlinePhone"
              style="width:100px;margin-right:10px"
              placeholder="座机号"
            ></el-input>
            <el-input
              @input="(val)=>{
                nospace1('landlinePhone1',val)
              } "
              v-model="form.landlinePhone1"
              style="width:100px;margin-right:10px"
              placeholder="分机号"
            ></el-input>
            <div style="font-size:12px">优先显示座机号码</div>
          </el-form-item>
          <el-form-item label="联系地址" prop="addressValues">
            <cascader v-model="cityvalue" @change="citychange" size="small" width="320px"></cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="addressDetail">
            <el-input
              v-model.trim="form.addressDetail"
              style="width:320px"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="地址类型" prop="addressType">
            <el-checkbox-group v-model="form.addressType">
              <el-checkbox label="1">买家地址</el-checkbox>
              <el-checkbox label="2">商家地址</el-checkbox>
            </el-checkbox-group>
          </el-form-item>-->
          <el-form-item label="是否默认地址">
            <el-radio v-model="form.isDefaultAddress" label="0">否</el-radio>
            <el-radio v-model="form.isDefaultAddress" label="1">是</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="showform">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cascader from "@/components/city/cascader.vue";
import { inquireAddressList } from "@/api/aftersale";
import {
  addOrModifyMerchantAddress,
  deleteShopMerchantsAddress,
  shopMerchantsAddressDetail,
} from "@/api/address";

var myreg = /^[1][3,4,5,6,7,8,9,][0-9]{9}$/;
var districts; // 地址城市

export default {
  data() {
    var EmptyValidator = (rule, value, callback) => {
      console.log(value);
      if (!myreg.test(value)) {
        callback(new Error("手机号格式有误请重新输入"));
      } else {
        callback();
      }
    };
    return {
      list: [],
      cityArrName: [],
      form: {
        quNumber: "",
        recipientsName: "",
        recipientsTel: "",
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        addressValues: "",
        addressDetail: "",
        isDefaultAddress: "0",
        landlinePhone: "",
        landlinePhone1: "",
        addressType: [],
      },
      rules: {
        recipientsName: [
          { required: true, message: "请输入名字", trigger: "blur" },
        ],
        recipientsTel: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            validator: EmptyValidator,
            trigger: "blur",
          },
        ],
        addressValues: [
          { required: true, message: "请选择省市区", trigger: "change" },
        ],
        addressDetail: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        addressType: [
          { required: true, message: "请选择地址类型", trigger: "change" },
        ],
      },
      cityvalue: [],
      dialogTableVisible: false,
      totalCount: 0,
      listpage: {
        curPage: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    cascader,
  },
  created() {
    axios
      .get(
        "https://restapi.amap.com/v3/config/district?keywords=中国&subdistrict=3&key=53db67bb6768fb1da369ea6603e05e1b"
      )
      .then((res) => {
        if (res.statusText == "OK") {
          districts = res.data.districts[0].districts;
        }
      });
    this.getList();
  },
  methods: {
    nospace1(type,val) {
      console.log(this.form)
      this.form[type] = val.replace(/[^\d.]/g, "");
    },
    showform() {
      if (!this.dialogTableVisible) {
        this.dialogTableVisible = true;
        setTimeout(() => {
          this.$refs.ruleForm.clearValidate();
        }, 0);
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let form = Object.assign({}, this.form, {
              addressValues: this.cityArrName.length
                ? this.cityArrName.join(",")
                : this.form.addressValues,
              addressType: this.form.addressType.join(","),
            });
            if (!this.form.landlinePhone && !this.form.quNumber) {
              form.landlinePhone = "";
            } else {
              form.landlinePhone = `${this.form.quNumber} - ${this.form.landlinePhone} -${this.form.landlinePhone1}`;
            }
            addOrModifyMerchantAddress(form).then((res) => {
              this.$message({
                message: "恭喜你，成功啦",
                type: "success",
                center: true,
              });
              this.dialogTableVisible = false;
              this.cityArrName = [];
              this.cityvalue = [];
              this.form = {
                quNumber: "",
                recipientsName: "",
                recipientsTel: "",
                provinceCode: "",
                cityCode: "",
                areaCode: "",
                addressValues: "",
                addressDetail: "",
                isDefaultAddress: "0",
                landlinePhone: "",
                landlinePhone1: "",
                addressType: [],
              };
              setTimeout(() => {
                this.$refs.ruleForm.clearValidate();
              }, 0);
              this.getList();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    getDetail(row) {
      let obj = {
        asuaId: row.asuaId,
      };
      shopMerchantsAddressDetail(obj).then((res) => {
        let { body } = res;
        this.cityvalue = [body.provinceCode, body.cityCode, body.areaCode];
        this.form = body;
        this.form.addressType = this.form.addressType.split(",");
        this.dialogTableVisible = true;
        let ret = this.form.landlinePhone;
        if (ret) {
          ret = ret.split("-");
          let [quNumber, landlinePhone, landlinePhone1] = ret;
          this.$set(this.form, "quNumber", quNumber.trim());
          this.$set(this.form, "landlinePhone", landlinePhone.trim());
          this.$set(this.form, "landlinePhone1", landlinePhone1.trim());
        }
      });
    },
    deladdress(row) {
      let obj = {
        asuaId: row.asuaId,
      };
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteShopMerchantsAddress(obj).then((res) => {
            this.$message({
              type: "success",
              center: true,
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {});
    },
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
    // 城市change
    citychange(value) {
      if (value.length > 0) {
        this.form.provinceCode = value[0];
        this.form.cityCode = value[1];
        this.form.areaCode = value[2];
        this.HandleCityName(districts);
      } else {
        this.form.addressValues = "";
      }
    },
    // 得到省市区中文
    HandleCityName(districts) {
      for (let j = 0; j < this.cityvalue.length; j++) {
        for (let i = 0; i < districts.length; i++) {
          if (districts[i].adcode == this.cityvalue[j]) {
            this.cityArrName.push(districts[i].name);
            this.form.addressValues = districts[i].name;
            if (districts[i].districts && districts[i].districts.length) {
              this.HandleCityName(districts[i].districts);
            }
            break;
          }
        }
      }
      this.form.provinceName = this.cityArrName[0];
      this.form.cityName = this.cityArrName[1];
    },
    getList() {
      inquireAddressList(this.listpage).then((res) => {
        this.loading = false;
        let { records, total } = res.body;
        this.list = records;
        this.totalCount = total;
      });
    },
  },
};
</script>
<style  scoped>
.address {
  width: 100%;
  min-height: 100%;
  background: #fff;
}
.ptn-box {
  padding: 20px;
}
.page-box {
  background-color: #fff;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>