<template>
  <div class="authentication addYunFei">
    <div class="innerContainer">
      <el-form
        ref="templateForm"
        :model="form"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="模板名称" prop="templateName" class="defaulStra">
          <el-input
            :disabled="lock"
            maxlength="20"
            v-model="form.templateName"
            :size="size"
            style="width: 80%"
            placeholder="单行输入"
            show-word-limit
          ></el-input>
          <!-- :disabled="$route.query.look == 'true'" -->
        </el-form-item>
        <!-- <el-form-item label="省市区" prop="goodsShipAddress"    class="defaulStra">
          <el-cascader
            v-model="form.goodsShipAddress"
            :options="cascaderList"
            :props="optionProps"
            :size="size"
            style="width:300px;"
            @change="changeCascader"
          >
            <template slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf">({{ data.districts.length }})</span>
            </template>
          </el-cascader>
        </el-form-item>-->
        <el-form-item label="是否默认" prop="isChecked" class="defaulStraw">
          <el-radio :disabled="lock" v-model="form.isChecked" label="1"
            >是</el-radio
          >
          <el-radio :disabled="lock" v-model="form.isChecked" label="0"
            >否</el-radio
          >
        </el-form-item>
        <el-form-item label="计费方式" prop="chargeMode" class="defaulStra">
          <el-radio :disabled="lock" v-model="form.chargeMode" label="1"
            >按件计费</el-radio
          >
          <el-radio :disabled="lock" v-model="form.chargeMode" label="2"
            >按重量计费</el-radio
          >
        </el-form-item>
        <el-form-item label="配送区域" prop="region" class="defaulStra">
          <el-table
            :data="form.templateSub"
            style="width: 92%"
            row-class-name="row-class"
            :header-cell-style="headerCellStyle"
            :border="false"
          >
            <el-table-column label="配送到" width="300px">
              <template slot-scope="{ row, $index }">
                <div class="Nodelivery_span">
                  <span
                    class
                    v-for="(item, index) in row.cityNames"
                    :key="index"
                    >{{ item }}</span
                  >
                  <span v-show="!lock">
                    <span
                      v-if="$index !== 0"
                      @click="editDeliveryclick($index)"
                      class="edit"
                      >编辑</span
                    >
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="'首' + danwei">
              <template slot-scope="{ row, $index }">
                <el-input
                  :disabled="lock"
                  @blur="
                    (e) => {
                      burTableChange(e.target.value, 'designatedFirst', $index);
                    }
                  "
                  v-model="row.designatedFirst"
                  style="width: 60%"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="运费(元)">
              <template slot-scope="{ row, $index }">
                <el-input
                  :disabled="lock"
                  @blur="
                    (e) => {
                      burTableChange(
                        e.target.value,
                        'designatedFirstFreight',
                        $index
                      );
                    }
                  "
                  v-model="row.designatedFirstFreight"
                  style="width: 60%"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column :label="'续' + danwei + '(' + danwei + ')'">
              <template slot-scope="{ row, $index }">
                <el-input
                  :disabled="lock"
                  @blur="
                    (e) => {
                      burTableChange(e.target.value, 'designatedAdd', $index);
                    }
                  "
                  v-model="row.designatedAdd"
                  style="width: 60%"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="运费(元)">
              <template slot-scope="{ row }">
                <el-input
                  :disabled="lock"
                  v-model="row.designatedAddFreight"
                  style="width: 60%"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label>
              <template slot-scope="{ row, $index }">
                <span
                  v-show="!lock"
                  @click="rowClick(row, $index)"
                  :hidden="$index == 0"
                >
                  <i class="el-icon-close"></i>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-button
          :disabled="lock"
          type="primary"
          @click="seledtAreaClick"
          class="designatedArea"
          icon="el-icon-circle-plus-outline"
          >指定区域运费</el-button
        >
        <div class="Tips" v-if="form.chargeMode == 1">
          根据件数来计算运费，当物品不足“首件数量”时，按照“首件费用”计算，超过部分按照“续件重量和“续件费用”乘积来计算
        </div>
        <div class="Tips" v-if="form.chargeMode == 2">
          根据重量来计算运费，当物品不足“首重重量”时，按照“首重费用“计算，超过部分按照“续重重量”和“续重费用”乘积来计算。
        </div>
        <el-button
          :disabled="lock"
          type="primary"
          @click="editdesignatedAreaClick"
          class="designatedArea"
          >不可配送地区</el-button
        >
        <div class="Nodelivery" v-if="form.unreachableCityNames.length">
          <span
            class
            v-for="(item, index) in form.unreachableCityNames"
            :key="index"
            >{{ item }}</span
          >
          <span class="edit" v-show="!lock" @click="editdesignatedAreaClick"
            >编辑</span
          >
        </div>
        <el-form-item label="状态" prop="isEnabled" class="isEnabled">
          <el-radio :disabled="lock" v-model="form.isEnabled" label="1"
            >启用</el-radio
          >
          <el-radio :disabled="lock" v-model="form.isEnabled" label="0"
            >禁用</el-radio
          >
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      v-loading.fullscreen.lock="fullscreenLoading"
      @click="submit"
      class="submit"
      :disabled="lock"
      >提交</el-button
    >
    <el-button @click="back" type class="back">返回列表</el-button>

    <el-dialog
      :title="selectType == 1 ? '选择不可配送区域' : '选择配送区域'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="60%"
    >
      <!-- 区域的循环 -->
      <div class="city_content">
        <div
          class="areaClass"
          v-for="(area, areaindex) in cityList"
          :key="area.adcode"
        >
          <!-- , areaindex -->
          <div class="areaClass_left">
            <div
              style="display: inline-block"
              @click="areaClick(area, 'area', areaindex)"
            >
              <Statusimg :status="area.checked" />
              <span class="middle">{{ area.name }}</span>
            </div>
          </div>
          <div class="flexprovince">
            <div
              class="provinceClass"
              v-for="province in area.districts"
              :key="province.adcode"
            >
              <!-- , provinceindex -->
              <!-- 省的名字 -->
              <div @click="provinceBtn(province)">
                <span @click.stop="areaClick(province, 'province', areaindex)">
                  <Statusimg :status="province.checked" />
                </span>
                <span class="middle">{{ province.name }}</span>
                <span class="middle provincelength"
                  >({{ province.total }})</span
                >
                <i class="el-icon-arrow-down middle"></i>
              </div>
              <div class="none" :class="{ showCity: province.showCity }">
                <!-- 点击城市的名字 -->
                <div
                  class="cityLIst_flex_item"
                  v-for="(city, cityIndex) in province.districts"
                  :key="city.adcode"
                  @click="areaClick(province, 'city', cityIndex, areaindex)"
                >
                  <!-- ,cityIndex -->
                  <Statusimg :status="city.checked" />
                  <span class="middle">{{ city.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <div @click="allCheckedClick(allbuttonStatus)">
            <Statusimg :status="allbuttonStatus" />
            <span class="middle">全选</span>
          </div>
          <div class="footerfont">
            <span>已选择{{ cityTotal }}个区域</span>
            <el-button @click="makeSureCity" type="primary" class="el-button-w"
              >提交</el-button
            >
          </div>
          <!-- @click="makeSureCity" -->
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editMerTemplate, getMerTemplateDetails } from "@/api/store/index.js";
import Icon from "@/components/base/icon.vue";
import Statusimg from "./teplate/statusImg";
import city from "./district.json";

export default {
  components: {
    Icon,
    Statusimg,
  },
  data() {
    return {
      fullscreenLoading: false,
      lock: false,
      // 所有城市数量 394
      allbuttonStatus: "unselected", //全选按钮状态 checkAll unselected  forbidden
      cityListLength: 0, //所有城市数量
      NOcityListLength: 0, //bu可选城市数量
      IScityListLength: 0, //bu可选城市数量
      cityTotal: 0, //选中城市数量
      cityList: [],
      dialogVisible: false,
      editIndex: "", //编辑table index
      selectType: 1, // selectType 1 不可到达城市 2 单独配送地区 3 编辑不可配送区域  4 编辑可配送区域
      size: "small",

      // chargeMode: "1"
      // defaultAdd: (...)
      // defaultAddFreight: (...)
      // defaultFirst: (...)
      // defaultFirstFreight: (...)
      // goodsShipAddress: (...)
      // isChecked: null
      // isEnabled: null
      // shipCityCode: (...)
      // shipProvinceCode: (...)
      // sort: (...)
      // templateId: (...)
      // templateName: (...)
      // templateSub: (...)
      // unreachableCityCodes: (...)
      // unreachableCityNames: (...)
      form: {
        templateId: "",
        // shipProvinceCode: "", //发货地址省编码
        // shipCityCode: "", //发货地址市编码
        unreachableCityCodes: [], //快递不可到达的城市编码（多个用,分隔）
        unreachableCityNames: [], //快递不可到达的城市名称（多个用,分隔）
        templateName: "",
        isChecked: "1",
        chargeMode: "1",
        // goodsShipAddress: [],
        isEnabled: "1",

        templateSub: [
          {
            cityNames: ["全国【默认】"],
            cityCodes: [],
            designatedFirst: 1,
            designatedFirstFreight: "0.00",
            designatedAddFreight: "0.00",
            designatedAdd: 0,
          },
        ],
      },

      cascaderList: [], //级联选择器的数据
      optionProps: {
        // 级联选择器的 opions
        value: "name",
        label: "name",
        children: "districts",
      },
      rules: {
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
        ],
        // goodsShipAddress: [
        //   { required: true, message: "请输入发货地址", trigger: "change" },
        // ],
      },
    };
  },
  created() {
    // 处理级联选择器的数据
    this.initFahuoList(JSON.parse(JSON.stringify(city.districts[0].districts)));
    //用于选择可选 不可选城市的数组
    this.cityListArr(JSON.parse(JSON.stringify(city.districts[0].districts)));

    let { templateId, lock } = this.$route.query;
    this.form.templateId = templateId;
    this.lock = Boolean(lock);

    if (templateId) {
      this.getInfo(templateId);
    }
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    burTableChange(value, propertyName, index) {
      this.$set(
        this.form.templateSub[index],
        propertyName,
        Number.isNaN(Number(value)) ? 0 : Number(value)
      );
    },
    async getInfo(templateId) {
      let { body, code } = await getMerTemplateDetails({ templateId });
      let newObj = {
        cityNames: ["全国【默认】"],
        cityCodes: [],
        designatedAddFreight: body.defaultAddFreight / 100,
        designatedFirstFreight: body.defaultFirstFreight / 100,
        designatedFirst: body.defaultFirst,
        designatedAdd: body.defaultAdd,
      };

      body.unreachableCityCodes = body.unreachableCityCodes
        ? JSON.parse(body.unreachableCityCodes)
        : [];
      body.unreachableCityNames = body.unreachableCityNames
        ? JSON.parse(body.unreachableCityNames)
        : [];
      body.templateSub = body.templateSubs;
      body.templateSub.map((res) => {
        res.designatedFirstFreight = res.designatedFirstFreight / 100;
        res.designatedAddFreight = res.designatedAddFreight / 100;
        res.cityCodes = JSON.parse(res.cityCodes);
        res.cityNames = JSON.parse(res.cityNames);
        delete res.freightTemplateId;
      });
      body.templateSub = [newObj, ...body.templateSub];
      delete body.templateSubs;
      delete body.sort;
      delete body.createTime;
      delete body.merchantsCode;
      console.log(body);
      this.form = body;
    },
    // 确定提交

    submit() {
      var sb = this.form.templateSub.some((element) => {
        console.log(element.designatedAddFreight,1)
        let flag = parseInt(element.designatedAddFreight);
        console.log(flag,2);
        if (flag != 0 && element.designatedAdd == 0) {
          return true;
        }
        if (flag == 0 && element.designatedAdd != 0) {
          return true;
        }
      });

      this.$refs["templateForm"].validate((valid) => {
        if (valid) {
          if (sb) {
            this.$message({
              message: "件数或者克数或者填写不等于0运费也不能等于0",
              type: "error",
            });
            return false;
          }
          alert(1);
          return false;
          // templateSub
          this.templateEditMerTemplate();
        }
      });
    },
    templateEditMerTemplate() {
      let form = JSON.parse(JSON.stringify(this.form));
      let spliceArr = form.templateSub.splice(0, 1);
      console.log(spliceArr[0]);

      let {
        designatedFirstFreight,
        designatedAddFreight,
        designatedFirst,
        designatedAdd,
      } = spliceArr[0];

      form.defaultFirst = designatedFirst;
      form.defaultFirstFreight = designatedFirstFreight * 100;
      form.defaultAdd = designatedAdd;
      form.defaultAddFreight = designatedAddFreight * 100;

      form.templateSub.map((res) => {
        res.designatedFirstFreight = res.designatedFirstFreight * 100;
        res.designatedAddFreight = res.designatedAddFreight * 100;
      });
      console.log(form);
      // if (form.templateSub.length == 0) {
      //   this.$message({
      //     showClose: true,
      //     message: "为指定城市地区设置运费未选择地址",
      //     type: "warning",
      //   });
      //   return;
      // }
      this.fullscreenLoading = true;
      editMerTemplate(form)
        .then((res) => {
          this.fullscreenLoading = false;
          if (res.code == "000000") {
            this.$router.push("/shippingMethods");
          }
        })
        .catch((err) => {});
    },

    // 全选

    allCheckedClick(status) {
      if (status == "forbidden") {
        return;
      }
      this.cityTotal = 0;
      this.cityList.map((item0, index0) => {
        // 区域
        item0.checkedNum = 0;
        item0.selectedNum = 0;
        item0.districts.map((item1, index1) => {
          // 省
          item1.checkedNum = 0;
          item1.selectedNum = 0;
          item1.districts.map((item2, index2) => {
            if (item2.checked != "forbidden") {
              item2.checked = status == "checkAll" ? "unselected" : "checkAll";
              if (item2.checked == "checkAll") {
                item1.showCity = true;
                item0.checkedNum += 1;
                item1.checkedNum += 1;
                this.cityTotal += 1;
              } else {
                item1.showCity = false;
              }
            } else {
              item0.selectedNum += 1;
            }

            item1.checked != "forbidden" &&
              (item1.checked = this.chuliIF(item1.checkedNum, item1.total));
          });
          item0.checked != "forbidden" &&
            (item0.checked = this.chuliIF(
              item0.checkedNum,
              item0.total,
              item0.name
            ));
        });
      });
      this.allbuttonStatus = status == "checkAll" ? "unselected" : "checkAll";
    },
    //  确定按钮
    makeSureCity() {
      if (this.cityTotal == 0) {
        this.dialogVisible = false;
        return;
      }
      let selectType2Obj = {
        //类型selectType为2
        cityNames: [],
        cityCodes: [],
        designatedFirst: 1,
        designatedFirstFreight: "0.00",
        designatedAddFreight: "0.00",
        designatedAdd: 0,
      };
      let unreachableCityCodes = [];
      let unreachableCityNames = [];
      this.cityList.map((item0, index0) => {
        //  item0  区域
        item0.districts.map((item1, index1) => {
          // item1  省
          item1.districts.map((item2, index2) => {
            // item2  市
            if (item2.checked == "checkAll") {
              if (this.selectType == 1) {
                unreachableCityCodes.push(item2.adcode);
                unreachableCityNames.push(item2.name);
              }
              if (this.selectType == 2) {
                selectType2Obj.cityNames.push(item2.name);
                selectType2Obj.cityCodes.push(item2.adcode);
              }

              if (this.selectType == 4) {
                selectType2Obj.cityNames.push(item2.name);
                selectType2Obj.cityCodes.push(item2.adcode);
              }
            }
          });
        });
      });

      if (this.selectType == 1) {
        this.$set(this.form, "unreachableCityNames", unreachableCityNames);
        this.$set(this.form, "unreachableCityCodes", unreachableCityCodes);
      } else if (this.selectType == 2) {
        this.form.templateSub.push(selectType2Obj);
      } else if (this.selectType == 4) {
        this.form.templateSub[this.editIndex].cityNames =
          selectType2Obj.cityNames;
        this.form.templateSub[this.editIndex].cityCodes =
          selectType2Obj.cityCodes;
        this.form.templateSub.push(this.form.templateSub.pop());
      }
      this.cityListArr(city.districts[0].districts);
      this.dialogVisible = false;
    },

    // 点击 区域名字的事件
    areaClick(list, type, cityIndex, areaindex) {
      let status = this.disposeStatus(list.checked);
      if (!status) {
        return;
      }
      //点击区域时
      if (type == "area") {
        list.checked = status;
        this.areaDispose(list, status);
        this.computeArea(this.cityList[cityIndex]);
      }
      // 点击省
      if (type == "province") {
        list.checked = status;
        list.showCity = true;
        this.provinceDispose(list, status);
        this.computeArea(this.cityList[cityIndex]); // 区域列表
      }
      //点击城市
      if (type == "city") {
        status = this.disposeStatus(list.districts[cityIndex].checked);
        list.districts[cityIndex].checked = status;
        status == "checkAll" ? list.checkedNum++ : list.checkedNum--;
        list.checked = this.chuliIF(list.checkedNum, list.total);
        this.computeArea(this.cityList[areaindex]); // 区域列表
      }

      this.cityList.push(this.cityList.pop());
    },
    computeArea(list) {
      list.selectedNum = 0;
      list.checkedNum = 0;
      list.districts.map((item) => {
        list.selectedNum += item.selectedNum;
        list.checkedNum += item.checkedNum;
      });
      list.checked != "forbidden" &&
        (list.checked = this.chuliIF(list.checkedNum, list.total));
      this.cityTotal = 0;
      this.cityList.map((item) => {
        this.cityTotal += item.checkedNum;
      });
    },
    areaDispose(list, status) {
      list.checkedNum = 0;
      list.districts.map((res, index) => {
        res.checkedNum = 0;
        res.showCity = true;
        res.districts.map((res1, index1) => {
          if (res1.checked != "forbidden") {
            if (status == "halfselected") {
              // res1.checked = ( res1.checked == "checkAll" ? "unselected" : "checkAll");
              res1.checked = "unselected";
            } else {
              res1.checked = status;
            }
            if (status == "checkAll") {
              list.checkedNum += 1;
              res.checkedNum += 1;
            }
          }
        });

        res.checked != "forbidden" &&
          (res.checked = this.chuliIF(res.checkedNum, res.total));
      });
    },
    provinceDispose(list, status) {
      list.checkedNum = 0;
      list.districts.map((res1, index1) => {
        //为禁用的数据
        if (res1.checked != "forbidden") {
          if (status == "halfselected") {
            // res1.checked = ( res1.checked == "checkAll" ? "unselected" : "checkAll");
            res1.checked = "unselected";
          } else {
            res1.checked = status;
          }
          if (status == "checkAll") {
            list.checkedNum += 1;
          }
        }
      });
      list.checked = this.chuliIF(list.checkedNum, list.total);
    },
    // 点击 省的 展开
    provinceBtn(list) {
      list.showCity = !list.showCity;
      this.cityList.push(this.cityList.pop());
    },

    //  点击选择指定区域
    seledtAreaClick() {
      this.selectType = 2;
      this.dialogVisible = true;
      // 处理 数据禁用
      this.disposeDisabledArr(this.filtrateNodelivery(this.selectType), []);
    },
    // 处理 数据禁用
    disposeDisabledArr(list, list2) {
      if (list.length == 0 && list2.length == 0) return;
      let num = 0;
      this.NOcityListLength = 0; //可选城市数量
      this.IScityListLength = 0; //可选城市数量
      this.cityList.map((item0, index0) => {
        // 区域
        item0.checkedNum = 0;
        item0.selectedNum = 0;
        item0.districts.map((item1, index1) => {
          // 省
          item1.checkedNum = 0;
          item1.selectedNum = 0;
          item1.districts.map((item2, index2) => {
            // 市
            if (list.includes(item2.adcode)) {
              item0.selectedNum += 1;
              item1.selectedNum += 1;
              item1.showCity = true;
              item2.checked = "forbidden";
            }
            if (list2.includes(item2.adcode)) {
              item0.checkedNum += 1;
              item1.checkedNum += 1;
              item1.showCity = true;
              item2.checked = "checkAll";
            }
            if (item1.total == item1.selectedNum) {
              //如果选择的城市数量==城市的数量 全选
              item1.checked = "forbidden";
            }
            item1.checked != "forbidden" &&
              (item1.checked = this.chuliIF(item1.checkedNum, item1.total));
          });

          if (item0.total == item0.selectedNum) {
            item0.checked = "forbidden";
          } else {
            item0.checked != "forbidden" &&
              (item0.checked = this.chuliIF(
                item0.checkedNum,
                item0.total,
                item0.name
              ));
          }
        });
        this.NOcityListLength += item0.selectedNum;
        this.IScityListLength += item0.checkedNum;
      });
      // 全选按钮
      this.allbuttonStatus = "unselected";
      if (this.NOcityListLength == this.cityListLength) {
        this.allbuttonStatus = "forbidden";
      } else if (
        this.IScityListLength ==
        this.cityListLength - this.NOcityListLength
      ) {
        this.allbuttonStatus = "checkAll";
      }
      this.cityTotal = list2.length;
    },

    // 点击不可配送按钮
    designatedAreaClick() {
      this.dialogVisible = true;
      this.selectType = 1;
      this.disposeDisabledArr(this.filtrateNodelivery(this.selectType), []);
    },
    // 编辑不可配送区域
    editdesignatedAreaClick() {
      this.dialogVisible = true;
      this.selectType = 1;
      this.disposeDisabledArr(
        this.filtrateNodelivery(3),
        this.form.unreachableCityCodes
      );
    },
    // 编辑可配送区域
    editDeliveryclick(index) {
      this.dialogVisible = true;
      this.selectType = 4;
      this.editIndex = index;
      this.disposeDisabledArr(
        this.filtrateNodelivery(this.selectType, index),
        this.form.templateSub[index].cityCodes
      );
    },
    //  选出 已选的 地址
    filtrateNodelivery(type, indexs) {
      let arr = [];
      if (type == 3) {
        this.form.templateSub.map((item, index) => {
          if (index > 0) {
            arr = [...arr, ...item.cityCodes];
          }
        });
        return [...arr];
      } else if (type == 4) {
        this.form.templateSub.map((item, index) => {
          if (index > 0 && indexs != index) {
            arr = [...arr, ...item.cityCodes];
          }
        });
        return [...arr, ...this.form.unreachableCityCodes];
      } else {
        this.form.templateSub.map((item, index) => {
          if (index > 0) {
            arr = [...arr, ...item.cityCodes];
          }
        });
        return [...arr, ...this.form.unreachableCityCodes];
      }
    },
    // el-dialog 关闭事件
    handleClose(done) {
      this.cityListArr(city.districts[0].districts);
      done();
    },
    // 处理 图标状态
    disposeStatus(status) {
      if (status == "unselected") {
        //办选 未选择
        return "checkAll";
      }
      if (status == "halfselected") {
        //办选 未选择
        return "halfselected";
      }
      if (status == "checkAll") {
        return "unselected";
      }
      if (status == "forbidden") {
        //禁用
        return false;
      }
    },
    //  处理if else
    chuliIF(checkedNum, total) {
      if (checkedNum > 0 && checkedNum < total) {
        return "halfselected";
      } else if (checkedNum == 0) {
        return "unselected";
      } else if (checkedNum == total) {
        return "checkAll";
      }
    },
    // 级联选择器 改变  选择省市的code
    // changeCascader(list) {
    //   let obj = this.cascaderList.filter((item, index) => {
    //     return item.name == list[0];
    //   })[0];
    //   this.form.shipProvinceCode = obj.adcode;
    //   this.form.shipCityCode = obj.districts.filter((item, index) => {
    //     return item.name == list[1];
    //   })[0].adcode;
    // },
    // 级联选择器处理的数据
    initFahuoList(list) {
      let result = [];
      list.map((elements) => {
        elements.districts.map((element) => {
          element.districts.map((el) => {
            if (el.level == "city" || el.districts.length == 0) {
              delete el.districts;
            }
          });
          result = [...result, element];
        });
      });
      this.cascaderList = result;
    },
    //用于选择可选 不可选城市的数组
    cityListArr(list) {
      this.cityListLength = 0;
      list.map((item0, index0) => {
        //  item0  区域
        item0.total = 0;
        item0.selectedNum = 0; //已经被选择
        item0.checkedNum = 0; //刚刚被选择
        item0.checked = "unselected";
        item0.districts.map((item1, index1) => {
          item1.total = item1.districts.length;
          item1.selectedNum = 0;
          item1.checkedNum = 0;
          item1.checked = "unselected";
          item1.districts.map((item2, index2) => {
            // item2  市
            item0.total += 1;
            item2.total = item2.districts.length;
            item2.selectedNum = 0;
            item2.checkedNum = 0;
            item2.checked = "unselected";
          });
        });
        this.cityListLength += item0.total;
      });
      this.cityList = list;
    },
    // 点击删除表格 行
    rowClick(row, index) {
      this.form.templateSub.splice(index, 1);
    },
    // 修改table header行的背景色
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      return " background:#f5f7f9;padding-top: 0;";
    },
  },
  computed: {
    // 选择计费方式后 展示单位
    danwei() {
      return this.form.chargeMode == 1 ? "件" : "克";
    },
  },
};
</script>
<style lang="scss" >
.addYunFei {
  .el-icon-close {
    font-size: 15px;
  }
  .defaulStra .el-form-item__label::before {
    content: "";
    display: none;
  }

  .defaulStra .el-form-item__label::after {
    content: "*";
    color: #f56c6c;
    margin-left: 5px;
  }
  .defaulStraw .el-form-item__label::after {
    content: "*";
    color: #f5f7f9;
    margin-left: 5px;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none;
  }
  .el-table::before {
    background-color: #f5f7f9;
  }
  .row-class {
    background: #f5f7f9;
  }
}
</style>
<style scoped lang="scss">
.areaClass {
  display: flex;
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: rgba(102, 102, 102, 1);
}

.middle {
  vertical-align: middle;
  max-width: 60%;
}
.flexprovince {
  display: flex;
  flex-wrap: wrap;
  width: 85%;
}
.none {
  display: none;
}
.showCity {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: 15px;

  // opacity: 1;
  //  height: 100px;
  // transition: opacity 2s,  height .1s;
}

.cityLIst_flex_item {
  display: flex;
  margin-bottom: 10px;
  width: 33.33%;
}
.areaClass_left {
  width: 15%;
  margin-bottom: 30px;
}
.provinceClass {
  width: 33.3333%;
  margin-bottom: 30px;
}
.city_content {
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid rgba(239, 239, 239, 1);
}
.designatedArea {
  margin-left: 150px;
  margin-bottom: 15px;
}
.provincelength {
  color: #44abf7ff;
  margin-right: 6px;
  margin-left: 2px;
}
.submit,
.back {
  margin-top: 20px;
}
.submit {
  margin-left: 150px;
  margin-right: 10px;
}
.Tips {
  margin-left: 150px;
  margin-bottom: 15px;

  font-size: 12px;
  font-family: Microsoft YaHei;
  color: rgba(153, 153, 153, 1);
}
.Nodelivery {
  width: 300px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: rgba(102, 102, 102, 1);
  margin-bottom: 28px;
  margin-left: 150px;
}
.edit {
  color: #44abf7ff !important;
}
.authentication {
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
  font-family: MicrosoftYaHei-Bold;
}
.innerContainer {
  width: 98%;
  margin: 0 auto;
  padding: 20px 0px;
  background: #f5f7f9;
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
.authentication-title {
  width: 14px;
  height: 16px;
  margin-right: 6px;
}
.dialog-footer,
.footerfont {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-button-w {
  width: 104px;
  margin-left: 12px;
}
.footerfont span {
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: rgba(102, 102, 102, 1);
}
.Nodelivery span,
.Nodelivery_span span {
  line-height: 1.5;
  margin-right: 5px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: rgba(102, 102, 102, 1);
}
</style>