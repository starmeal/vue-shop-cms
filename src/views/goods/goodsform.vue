<template>
  <div class="big-container">
    <section class="form-container">
      <el-form
        :model="form"
        label-width="120px"
        :rules="form.status != 5 ? formrules : draftsrules"
        ref="goodForm"
      >
        <div class="title title-margin">
          <Icon icon="jibenxinxi" class="authentication-title" />基本信息
        </div>
        <el-form-item label="商品类目" prop="category">
          <el-cascader
            :disabled="disabled"
            v-if="valArr.length"
            ref="cascader1"
            :size="size"
            :props="defaultParams1"
            class="input-update"
            :options="valArr"
            placeholder="请选择商品分类"
            v-model="form.category"
            @change="goodsobjchange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input
            :disabled="disabled"
            class="input-update"
            type="text"
            placeholder="请输入内容"
            v-model="form.goodsName"
            maxlength="30"
            @input="nospace"
            show-word-limit
            :size="size"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="goodsItemType">
          <el-select
            :disabled="disabled"
            v-model="form.goodsItemType"
            placeholder="请选择商品类型"
            :size="size"
            class="input-update"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品所在地" prop="provinceCode">
          <cascader
            v-model="cityvalue"
            @change="citychange"
            level="city"
            size="small"
            width="90%"
            :disabled="disabled"
          ></cascader>
        </el-form-item>
        <el-form-item label="商品重量（克）">
          <el-input-number
            :disabled="disabled"
            class="deep-numbers"
            v-model="form.weight"
            :controls="false"
            controls-position="right"
            :max="9999999"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片" prop="goodsImgs">
          <div v-show="!disabled">
            <el-upload
              action
              multiple
              class="bili"
              accept=".png, .jpg, .gif,.webp"
              :http-request="uploadHttp"
              :show-file-list="false"
              :data="{
                data: 'goodsImgs',
              }"
            >
              <section class="input-con">
                <input
                  placeholder="批量上传图片"
                  size="small"
                  class="input-cla"
                />
                <div class="btnsss">选择图片</div>
              </section>
            </el-upload>
          </div>
          <div v-if="form.goodsImgs.length">
            <draggable
              class="img-content"
              element="div"
              v-model="form.goodsImgs"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group
                type="transition"
                :name="'flip-list'"
                key="img-content"
              >
                <div
                  class="img-item list-group-item"
                  v-for="(item, index) in form.goodsImgs"
                  :key="item + '' + index"
                >
                  <i
                    class="el-icon-close close-i"
                    v-if="!disabled"
                    @click="delImg(index)"
                  ></i>
                  <img :src="item" class="img-items" />
                </div>
              </transition-group>
            </draggable>
          </div>
          <div class="hidden-box">
            <el-input
              v-model="form.goodsImgs[0]"
              class="hidden-input"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="首图视频">
          <el-upload
            v-show="!disabled"
            action
            multiple
            class="bili"
            accept=".mp4, .mov, .m4v, .flv, x-flv, .mkv, .wmv, .avi, .rmvb, .3gp"
            :http-request="uploadHttp"
            :show-file-list="false"
            :data="{
              data: 'vedio',
            }"
          >
            <section class="input-con">
              <input placeholder="上传视频" size="small" class="input-cla" />
              <div class="btnsss">选择文件</div>
            </section>
          </el-upload>
          <div
            v-show="form.vedio && !disabled"
            @click="delvideo"
            style="margin-top: 20px"
          >
            <el-button type="primary">删除视频</el-button>
          </div>
          <div id="mse" style="margin-top: 20px" v-show="form.vedio"></div>
          <div class="hidden-box">
            <el-input v-model="form.vedio" class="hidden-input"></el-input>
          </div>
        </el-form-item>
        <div style="border-top: 13px solid rgb(255, 255, 255)"></div>
        <div class="title title-margin">
          <Icon icon="jibenxinxi" class="authentication-title" />商品详情
        </div>
        <el-form-item label="详情图片" prop="detail">
          <div class="hidden-box">
            <el-input v-model="form.detail[0]" class="hidden-input"></el-input>
          </div>
          <el-upload
            v-show="!disabled"
            action
            multiple
            class="bili"
            :http-request="uploadHttp"
            :show-file-list="false"
            accept=".png, .jpg, .gif"
            :data="{
              data: 'detail',
            }"
          >
            <section class="input-con">
              <input
                placeholder="批量上传图片"
                size="small"
                class="input-cla"
              />
              <div class="btnsss">选择图片</div>
            </section>
          </el-upload>
          <div class="detils-img">
            <div>
              <draggable
                v-if="form.detail.length"
                class="img-content"
                element="div"
                v-model="form.detail"
                @start="isDragging = true"
                @end="isDragging = false"
              >
                <transition-group type="transition" :name="'flip-list'">
                  <div
                    class="img-item list-group-item"
                    v-for="(item, ix) in form.detail"
                    :key="item + '' + ix"
                  >
                    <i
                      class="el-icon-close close-i"
                      v-if="!disabled"
                      @click="delImg(ix, 1)"
                    ></i>
                    <img :src="item" class="img-items" />
                  </div>
                </transition-group>
              </draggable>
            </div>
            <div>
              <div class="detils-bg" v-if="form.detail.length">
                <div class="phone-hezi">
                  <div
                    v-for="(item, index) in form.detail"
                    :key="index"
                    class="deatils-items"
                  >
                    <div>
                      <img :src="item" style="height: auto; width: 100%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <div style="border-top: 13px solid rgb(255, 255, 255)"></div>
        <div class="title title-margin">
          <Icon icon="jibenxinxi" class="authentication-title" />价格库存
        </div>
        <el-form-item label="是否临期">
          <el-switch
            :disabled="disabled"
            v-model="form.isOnTime"
            active-value="1"
            @change="isOnTimeChange"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="设置生产日期" v-if="form.isOnTime == 1">
          <el-date-picker
            :disabled="disabled"
            v-model="form.manufactureTime"
            value-format="yyyy-MM-dd"
            @change="shelfDayChange1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <span class="xiaoxue">保质期天数</span>
          <el-input-number
            :disabled="disabled"
            v-model="form.shelfDay"
            @change="shelfDayChange"
            :controls="false"
            label="描述文字"
            class="deep-numbers"
            :max="9999999"
          ></el-input-number>
          <span class="xiaoxue" v-show="form.manufactureTime && form.shelfDay">
            剩余保质期：
            <span>共:{{ numberDay }}天</span>
          </span>
        </el-form-item>
        <el-form-item label="商品规格" prop="resource">
          <el-radio-group
            v-model="form.resource"
            @change="resourceChange"
            :disabled="disabled"
          >
            <el-radio :label="1">统一规格</el-radio>
            <el-radio :label="2">多规格</el-radio>
          </el-radio-group>
        </el-form-item>
        <section v-if="form.resource == 1">
          <el-form-item label="商品条码">
            <el-input
              v-model="form.goodsBarCode"
              :disabled="disabled"
              class="input-update"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="主播佣金">
            <el-input-number
              :disabled="disabled"
              v-model="form.anchorMoney"
              :controls="false"
              label="描述文字"
              :min="0"
              class="deep-numbers"
              :max="9999999"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="分享佣金">
            <el-input-number
              :disabled="disabled"
              :max="9999999"
              :min="0"
              v-model="form.accountMoney"
              :controls="false"
              label="描述文字"
              class="deep-numbers"
            ></el-input-number>
          </el-form-item>
        </section>
        <section v-if="form.resource == 2">
          <el-form-item>
            <el-button
              type="primary"
              @click="addspecificationKey"
              :disabled="disabled"
              >新增规格</el-button
            >
          </el-form-item>
          <section>
            <div
              class="guige"
              v-for="(item, index) in form.specification"
              :key="index"
            >
              <section class="sku-box">
                <section class="flex-sku">
                  <div>
                    规格名称：
                    <el-input
                      placeholder
                      :disabled="disabled"
                      v-model="item.key"
                      @input="changeskuName(index)"
                      size="mini"
                      style="width: 200px"
                    ></el-input>
                    <i
                      class="el-icon-delete"
                      @click="delsku(index)"
                      style="margin-left: 20px"
                    ></i>
                  </div>
                  <div>
                    排序
                    <i
                      class="el-icon-top"
                      style="margin-riht: 20px"
                      v-if="index !== 0"
                      @click="skusort('top', index)"
                    ></i>
                    <i
                      class="el-icon-bottom"
                      style="margin-riht: 20px"
                      @click="skusort('bottom', index)"
                      v-if="index !== form.specification.length - 1"
                    ></i>
                  </div>
                  <div>
                    规格值：
                    <template v-if="item.time">
                      <el-date-picker
                        v-model="item.date"
                        value-format="yyyy-MM-dd"
                        type="date"
                        style="width: 140px"
                        class="gelu"
                        :disabled="disabled"
                        placeholder="生产日期"
                      ></el-date-picker>
                      <el-input-number
                        v-model="item.day"
                        size="mini"
                        style="width: 150px"
                        :controls="false"
                        :disabled="disabled"
                      >
                      </el-input-number>
                      <el-button size="mini" @click="addskuvalue(item, index)"
                        >添加</el-button
                      >
                    </template>
                    <template v-else>
                      <el-input
                        v-model="item.skuvalue"
                        size="mini"
                        style="width: 200px"
                        :disabled="disabled"
                      >
                        <el-button
                          type="primary"
                          slot="append"
                          @click="addskuvalue(item, index)"
                          >添加</el-button
                        >
                      </el-input>
                    </template>
                  </div>
                </section>
                <div class="skuvalue-class">
                  <div
                    v-for="(el, idx) in item.value"
                    :key="idx"
                    class="skuvalue-item"
                  >
                    <el-button @click="delskuvalue(item, index, idx)">
                      {{ el }}
                      <i class="el-icon--right el-icon-delete"></i>
                    </el-button>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <template v-if="skuArr.length > 0">
            <el-table :data="skuArr" border class="sku-table">
              <el-table-column
                v-for="(col, index) in columnArr"
                :prop="col.prop"
                :label="col.label"
                :key="index"
              ></el-table-column>
              <el-table-column label="市场价">
                <template slot-scope="props">
                  <el-input-number
                    :max="9999999"
                    :min="0"
                    :disabled="disabled"
                    v-model="props.row.goodsOriginalPrice"
                    :controls="false"
                    class="table-deep-numbers"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="销售价" width="90px">
                <template slot-scope="props">
                  <el-input-number
                    :max="9999999"
                    :min="0"
                    :disabled="disabled"
                    v-model="props.row.goodsPrice"
                    :controls="false"
                    class="table-deep-numbers"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="主播佣金" width="90px">
                <template slot-scope="props">
                  <el-input-number
                    :max="9999999"
                    :min="0"
                    :disabled="disabled"
                    v-model="props.row.anchorMoney"
                    :controls="false"
                    class="table-deep-numbers"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="分享佣金" width="90px">
                <template slot-scope="props">
                  <el-input-number
                    :disabled="disabled"
                    :max="9999999"
                    :min="0"
                    v-model="props.row.accountMoney"
                    :controls="false"
                    class="table-deep-numbers"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="库存" width="90px">
                <template slot-scope="props">
                  <el-input-number
                    :max="9999999"
                    :min="0"
                    :disabled="disabled"
                    v-model="props.row.stock"
                    :controls="false"
                    class="table-deep-numbers"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="规格照片">
                <template slot-scope="props">
                  <div class="rea-png" v-if="props.row.goodsSkuImg">
                    <img
                      v-if="props.row.goodsSkuImg"
                      :src="props.row.goodsSkuImg"
                      style="width: 50px; height: 50px"
                    />
                    <i
                      class="el-icon-close"
                      v-if="!disabled"
                      @click="delskuIMg(props.$index)"
                    ></i>
                  </div>
                  <el-upload
                    v-if="!props.row.goodsSkuImg"
                    style="overflow: hidden"
                    action
                    :multiple="true"
                    :data="{
                      data: 'specificationList',
                      open: `${props.$index}`,
                    }"
                    :http-request="uploadHttp"
                    :show-file-list="false"
                  >
                    <el-button size="mini" type="primary">上传</el-button>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column label="商品条码" width="90px">
                <template slot-scope="props">
                  <el-input
                    v-model="props.row.goodsBarCode"
                    :disabled="disabled"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="90px">
                <template slot-scope="props">
                  <el-button
                    type="warning"
                    @click="delgoodsType(props)"
                    size="mini"
                    :disabled="disabled"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </section>
        <el-form-item label="市场价" prop="goodsOriginalPrice">
          <el-input-number
            :disabled="disabled || form.resource == 2"
            v-model="form.goodsOriginalPrice"
            :controls="false"
            label="描述文字"
            :min="0"
            class="deep-numbers"
            :max="9999999"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="销售价格" prop="goodsPrice">
          <el-input-number
            :disabled="disabled || form.resource == 2"
            v-model="form.goodsPrice"
            :controls="false"
            label="描述文字"
            :min="0"
            class="deep-numbers"
            :max="9999999"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="总库存" prop="stock">
          <el-input-number
            :disabled="disabled || form.resource == 2"
            :max="9999999"
            :min="0"
            :precision="0"
            v-model="form.stock"
            :controls="false"
            label="描述文字"
            class="deep-numbers"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="库存扣减方式" prop="stockReduceType">
          <el-radio-group v-model="form.stockReduceType" :disabled="disabled">
            <el-radio label="1">拍下减少库存</el-radio>
            <el-radio label="2">付款减库存</el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="border-top: 13px solid rgb(255, 255, 255)"></div>
        <div class="title title-margin">
          <Icon icon="jibenxinxi" class="authentication-title" />物流与服务
        </div>
        <el-form-item label="配送方式" prop="deliveryType">
          <el-radio-group v-model="form.deliveryType" :disabled="disabled">
            <el-radio label="1">快递发货</el-radio>
            <!-- <el-radio label="2">同城配送</el-radio>
            <el-radio label="3">到店自提</el-radio>-->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="运费模板" prop="templateId">
          <el-select
            v-model="form.templateId"
            placeholder="请选择"
            class="input-update"
            :disabled="disabled"
          >
            <el-option
              v-for="item in selectTemplate"
              :key="item.templateId"
              :label="item.templateName"
              :value="item.templateId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品服务">
          <el-checkbox-group
            v-model="form.serviceAssurance"
            @change="serviceAssuranceChange"
            :disabled="disabled"
          >
            <el-checkbox
              v-for="el in sblist"
              :key="el.id"
              :label="el.code"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发票设置">
          <el-radio-group v-model="form.isInvoice" :disabled="disabled">
            <el-radio label="0">关闭</el-radio>
            <el-radio label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-radio-group
            v-model="form.status"
            @change="statusChange"
            :disabled="disabled"
          >
            <el-radio :label="1">立刻上架</el-radio>
            <el-radio :label="2">放入仓库</el-radio>
            <el-radio :label="9">定时上下架</el-radio>
            <el-radio :label="5">放入草稿箱</el-radio>
          </el-radio-group>
          <section class="time-box-s" v-if="form.status == 9">
            <el-date-picker
              placeholder="上架时间"
              :disabled="disabled"
              v-model="form.putawayTime"
              :picker-options="endTimepickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
            ></el-date-picker>
            <span style="width: 40px; display: inline-block"></span>
            <el-date-picker
              :size="size"
              :disabled="disabled"
              :picker-options="endTimepickerOptions1"
              placeholder="下架时间"
              v-model="form.soldOutTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
            ></el-date-picker>
          </section>
        </el-form-item>
        <el-form-item class="submit-btn">
          <el-button
            icon="el-icon-message"
            :disabled="disabled"
            @click="dialogTableVisible = true"
            >{{ DraftBoxList.total }}</el-button
          >
          <el-button
            type="primary"
            size="small"
            style="margin-bottom: 0px"
            @click="bianji"
            v-if="$route.query.goodsCode && this.disabled"
            >编辑</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="submitForm"
            style="margin-bottom: 0px"
            :disabled="disabled"
            >提交商品</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="golist"
            style="margin-bottom: 0px"
            >返回列表</el-button
          >
        </el-form-item>
      </el-form>
    </section>
    <el-dialog :visible.sync="dialogTableVisible">
      <div class="flex-dialog">
        <div>您在当前草稿箱（{{ DraftBoxList.total }}）</div>
        <el-button type="primary" class="btn-search" @click="delallmdrafts"
          >清空全部</el-button
        >
      </div>
      <el-table :data="DraftBoxList.records">
        <el-table-column>
          <template slot-scope="props">
            <div class="flex-dialog-one">
              <div>
                <div>{{ props.row.goodsName }}</div>
                <div>{{ props.row.createTime }}</div>
              </div>
              <div>
                <i
                  style="margin-right: 30px"
                  class="el-icon-edit icon-content"
                  @click="gomdrafts(props.row)"
                ></i>
                <i
                  class="el-icon-delete icon-content"
                  @click="delmdrafts(props.row)"
                  v-if="props.row.goodsCode !== $route.query.goodsCode"
                ></i>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="DraftBoxContent"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import {
  multiply,
  formatDate,
  descartes,
  sortArr,
  deepClone,
} from "@/utils/util";
import { SSupload } from "@/utils/upload";
import Player from "xgplayer";
import {
  update,
  selectShopCategoryv2,
  getMerTemplateList,
  goodsadd,
  queryDraftBoxList,
  detail,
  dictoptions,
  realDeleteGoods,
} from "@/api/goods";
import Icon from "@/components/base/icon.vue";
import cascader from "@/components/city/cascader.vue";
import draggable from "vuedraggable";
import axios from "axios";
var districts; // 地址城市
export default {
  components: {
    Icon,
    cascader,
    draggable,
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: true,
        ghostClass: "ghost",
      };
    },
  },
  data() {
    var nums = (rule, value, callback) => {
      var text = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
      if (value == 0) {
        return callback(new Error("总库存值不能为0"));
      } else if (text.test(value)) {
        return callback(new Error("请输入正整数"));
      } else {
        callback();
      }
    };
    var nums1 = (rule, value, callback) => {
      var text = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
      if (value <= 0) {
        return callback(new Error("销售价格不能小于等于0"));
      } else {
        callback();
      }
    };
    return {
      DraftBoxContent: 0,
      disabled: false,
      skuArr: [],
      columnArr: [],
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
      DraftBoxList: [],
      gridData: [1, 2, 3],
      dialogTableVisible: false,
      valArr: [],
      defaultParams1: {
        value: "id",
        label: "categoryName",
        children: "Children",
      },
      videoplayer: "",
      options: [
        {
          label: "实物商品（快递发货）",
          value: "1",
        },
        {
          label: "虚拟商品（无需物流）",
          value: "2",
        },
        {
          label: "蛋糕烘培（同城自提）",
          value: "3",
        },
      ],
      cityvalue: [],
      cityArrName: [],
      size: "small",
      value: "",
      draftsrules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
      },
      formrules: {
        goodsOriginalPrice: [
          { required: true, message: "请填写市场价格", trigger: "blur" },
          { validator: nums1, trigger: "blur" },
        ],
        provinceCode: [
          { required: true, message: "请选择所在地", trigger: "change" },
        ],
        category: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goodsItemType: [
          { required: true, message: "请选择商品类目", trigger: "change" },
        ],
        goodsImgs: [
          { required: true, message: "请上传商品图片", trigger: "change" },
        ],
        detail: [
          { required: true, message: "请上传商品详情图片", trigger: "change" },
        ],
        resource: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        goodsPrice: [
          { required: true, message: "请填写销售价格", trigger: "blur" },
          { validator: nums1, trigger: "blur" },
        ],
        stock: [
          { required: true, message: "请填写总库存", trigger: "blur" },
          { validator: nums, trigger: "blur" },
        ],
        stockReduceType: [
          { required: true, message: "请选择库存扣减方式", trigger: "change" },
        ],
        deliveryType: [
          { required: true, message: "请选择配送方式", trigger: "change" },
        ],
        templateId: [
          { required: true, message: "请选择运费模板", trigger: "change" },
        ],
      },
      numberDay: "",
      selectTemplate: [],
      sblist: [],
      form: {
        isNoReason: "0",
        isExchange: "0",
        weight: "",
        putawayTime: "",
        soldOutTime: "",
        status: 1,
        resource: 1,
        category: "",
        categoryName: "",
        goodsName: "",
        stock: 0,
        selled: 0,
        goodsImgs: [],
        goodsOriginalPrice: "",
        goodsPrice: "",
        weight: "",
        detail: [],
        serviceAssurance: [],
        vedio: "",
        shopMerchantsCode: "",
        discount: "",
        accountMoney: "",
        templateId: "",
        shelfDay: "",
        manufactureTime: "",
        anchorMoney: "",
        putawayTime: "",
        soldOutTime: "",
        goodsItemType: "",
        provinceCode: "",
        provinceName: "",
        cityCode: "",
        cityName: "",
        isOnTime: "",
        goodsBarCode: "",
        stockReduceType: "1",
        deliveryType: "1",
        isInvoice: "0",
        qualityTime: "",
        specification: [
          // {
          //   key: "尺寸",
          //   value: ["大", "中", "小"],
          // },
          // {
          //   key: "颜色",
          //   value: ["a", "b", "c"],
          // },
          // {
          //   key: "型号",
          //   value: ["1", "2", "3"],
          // },
        ],
        CloneTable: [],
        specificationList: [],
        pageDate: {
          curPage: 1,
          pageSize: 5,
        },
      },
    };
  },
  created() {
    //  为了获取中文地址名
    axios
      .get(
        "https://restapi.amap.com/v3/config/district?keywords=中国&subdistrict=3&key=53db67bb6768fb1da369ea6603e05e1b"
      )
      .then((res) => {
        if (res.statusText == "OK") {
          districts = res.data.districts[0].districts;
        }
      });
    if (this.$route.query.goodsCode) {
      this.getDetail(this.$route.query.goodsCode);
    }
    this.getfreight();
    this.getcat();
    this.getDraftBoxList();
    this.getype();
  },
  watch: {
    skuArr: {
      handler(newval) {
        this.form.stock = 0;
        this.form.goodsPrice = "";
        this.form.goodsOriginalPrice = "";
        let arr = [];
        let soArr = [];
        this.$nextTick(() => {
          this.$refs.goodForm.clearValidate();
        });
        newval.forEach((el, idx) => {
          if (el.stock > 0) {
            this.form.stock += el.stock;
          }
          if (el.goodsPrice > 0) {
            arr.push(el.goodsPrice);
          }
          if (el.goodsOriginalPrice > 0) {
            soArr.push(el.goodsOriginalPrice);
          }
        });
        if (arr.length) {
          this.form.goodsPrice = sortArr(arr, "mini")[0];
        }
        if (soArr.length) {
          this.form.goodsOriginalPrice = sortArr(soArr, "")[0];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    daychange(val) {},
    nospace(val) {
      this.form.goodsName = val.replace(/\s+/g, "");
    },
    changeskuName(index) {
      if (
        this.skuArr.length > 0 &&
        this.columnArr[index] &&
        this.columnArr[index].prop
      ) {
        this.skuArr.forEach((item, idx) => {
          item[this.form.specification[index].key] =
            item[this.columnArr[index].prop];
          delete item[this.columnArr[index].prop];
        });
        this.columnArr[index].prop = this.form.specification[index].key;
        this.columnArr[index].label = this.form.specification[index].key;
      }
    },
    bianji() {
      this.disabled = !this.disabled;
    },
    serviceAssuranceChange(val) {
      if (val.includes("七天无理由退货")) {
        this.form.isNoReason = "1";
      } else {
        this.form.isNoReason = "0";
      }
      if (val.includes("申请换货")) {
        this.form.isExchange = "1";
      } else {
        this.form.isExchange = "0";
      }
    },
    getype() {
      let obj = {
        type: "goods_service_assurance",
      };
      dictoptions(obj).then((res) => {
        this.sblist = res.body.list0;
      });
    },
    // 详情
    getDetail(code, index) {
      let obj = {
        goodsCode: code,
      };
      detail(obj).then((res) => {
        let { body } = res;
        body.status = parseInt(body.status);
        body.category = body.category.split(",");
        let category = [];
        body.category.forEach((el) => {
          category.push(Number(el));
        });
        body.categoryName = body.categoryName.split(",");
        this.cityvalue = [body.provinceCode, body.cityCode];
        if (index) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }

        this.serviceAssuranceChange(body.serviceAssurance);
        this.form = body;
        if (
          this.form.putawayTime &&
          this.form.soldOutTime &&
          this.form.status == 1
        ) {
          this.form.status = 9;
        }
        if (
          !this.form.putawayTime &&
          !this.form.soldOutTime &&
          this.form.status == 1
        ) {
          this.form.status = 1;
        }
        this.form.category = category;
        this.form.resource = body.specification.length > 0 ? 2 : 1;
        this.shelfDayChange(parseInt(body.shelfDay));
        if (body.specificationList.length > 0) {
          let skuArr = [];
          let mapObj = {};
          this.inittable();
          // 生成表格头跟表格数据
          body.specificationList.forEach((item, index) => {
            let obj = {};
            mapObj[item.specsSeq] = item;
            this.columnArr.forEach((itemkey, index) => {
              obj[itemkey.label] = item.goodsSkuName.split(" ")[index];
            });
            item = Object.assign({}, item, obj);
            skuArr.push(item);
          });
          this.mapObj = mapObj;
          // 克隆回显表格一份
          this.CloneTable = deepClone(skuArr);
          // 获取唯一sku集合
          this.skupapa = this.CloneTable.map((el, index) => {
            return el.specsSeq;
          });
          this.update = true;
          this.skuArr = skuArr;
        }
        this.$nextTick(() => {
          this.initvideo();
        });
      });
    },
    // 回到列表
    golist() {
      this.$router.push({
        path: "/goods",
      });
    },
    // 草稿箱列表
    getDraftBoxList() {
      queryDraftBoxList(this.pageDate).then((res) => {
        this.DraftBoxList = res.body;
        this.DraftBoxContent = res.body.total;
      });
    },
    // 切换规格是统一还是多规格
    resourceChange(val) {
      this.form.isOnTime = "0";
      if (this.form.resource == 2) {
        this.form.accountMoney = "";
        this.form.anchorMoney = "";
        this.form.goodsPrice = "";
        this.form.stock = "";
        this.form.goodsOriginalPrice = "";
        this.form.manufactureTime = "";
        this.form.shelfDay = "";
      } else {
        this.form.accountMoney = "";
        this.form.anchorMoney = "";
        this.form.goodsPrice = "";
        this.form.stock = "";
        this.form.goodsOriginalPrice = "";
        this.skuArr = [];
        this.columnArr = [];
        this.form.specificationList = [];
        this.form.specification = [];
      }
      this.$nextTick(() => {
        this.$refs.goodForm.clearValidate();
      });
    },
    //增加规格
    addspecificationKey() {
      let obj = {
        key: "",
        value: [],
        skuvalue: "",
      };
      this.form.specification.push(obj);
    },
    // 删除规格
    delsku(index) {
      if (Object.keys(this.form.specification[index]).includes("time")) {
        this.$message({
          message: "这个不让删除",
          type: "error",
          center: true,
        });
        return false;
      }
      this.$confirm("确定删除此规格", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "none",
      })
        .then(() => {
          this.form.specification.splice(index, 1);
          this.inittable();
        })
        .catch(() => {});
    },
    // 排序规格
    skusort(status, index) {
      let item = this.form.specification[index];
      let lastitem = this.form.specification[index - 1];
      if (status == "top") {
        lastitem = this.form.specification[index - 1];
        this.form.specification.splice(index, 1, lastitem);
        this.form.specification.splice(index - 1, 1, item);
      } else {
        lastitem = this.form.specification[index + 1];
        this.form.specification.splice(index, 1, lastitem);
        this.form.specification.splice(index + 1, 1, item);
      }
    },
    // 增加规格值
    addskuvalue(item, index) {
      if (!item.time) {
        if (!item.skuvalue) {
          this.$message({
            message: "请填写后添加",
            type: "error",
            center: true,
          });
          return false;
        }
      } else if (item.time) {
        if (!item.date || !item.day) {
          this.$message({
            message: "请填写日期保质期",
            type: "error",
            center: true,
          });
          return false;
        }
        let numDate = item.day * 24 * 60 * 60 * 1000;
        let newDate = new Date(
          parseInt(new Date(item.date).getTime() + numDate)
        ).getTime();
        item.skuvalue = `${item.date.split(" ")[0]}至${
          formatDate(newDate).split(" ")[0]
        }`;
      }
      let arr = [item.skuvalue];
      arr = [...this.form.specification[index].value, ...arr];
      this.$set(this.form.specification[index], "value", arr);
      this.$set(this.form.specification[index], "skuvalue", "");
      this.update = false;
      this.inittable();
    },
    // 删除规格值
    delskuvalue(item, index, idx) {
      this.$confirm("确定删除此规格值", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "none",
      })
        .then(() => {
          let arr = this.form.specification[index].value;
          arr.splice(idx, 1);
          this.$set(this.form.specification[index], "value", arr);
          this.inittable();
        })
        .catch(() => {});
    },
    // 生成sku列表
    inittable() {
      let specification = this.form.specification;
      let columnArr = [];
      let lineArr = [];
      let keyArr = [];
      specification.forEach((item, index) => {
        if (item.value.length > 0) {
          columnArr.push({
            prop: item.key,
            label: item.key,
          });
          keyArr.push(item.key);
          lineArr.push(item.value);
        }
      });

      let gridData = descartes(lineArr);
      lineArr = [];
      gridData.forEach((el, idx) => {
        let obj = {
          goodsSkuName: "",
          specsSeq: "",
          stock: 0,
          goodsPrice: 0,
          goodsSkuImg: "",
          accountMoney: 0,
          manufactureTime: "",
          anchorMoney: 0,
          shelfDay: "",
          goodsBarCode: "",
          goodsOriginalPrice: "",
        };
        keyArr.forEach((item, index) => {
          obj[item] = el.constructor === Array ? el[index] : el;
        });
        obj.goodsSkuName = el.constructor === Array ? el.join(" ") : el;
        obj.specsSeq = el.constructor === Array ? el.join(":") : el;
        console.log(obj, 1);
        lineArr.push(obj);
      });
      console.log(lineArr);
      this.skuArr = lineArr;
      this.columnArr = columnArr;
      this.skuArr = lineArr;
      if (!this.update && this.skupapa) {
        let newskupapa = this.skuArr.map((item, index) => {
          return item.specsSeq;
        });
        let oldskupapa = newskupapa.filter((v) => {
          return this.skupapa.indexOf(v) > -1;
        });
        lineArr.forEach((el, idx) => {
          if (oldskupapa.includes(el.specsSeq)) {
            let oldvalIndex = this.CloneTable.findIndex((element) => {
              return element.specsSeq == el.specsSeq;
            });
            lineArr.splice(
              idx,
              1,
              Object.assign({}, el, this.CloneTable[oldvalIndex])
            );
          }
        });
        this.skuArr = lineArr;
      }
    },
    // 删除sku列表某一项
    delgoodsType(pop) {
      this.pop = pop;
      let arr = [];
      this.columnArr.forEach((item) => {
        for (var i in this.pop.row) {
          if (item.label == i) {
            arr.push(this.pop.row[i]);
          }
        }
      });
      this.skuArr.splice(this.pop.$index, 1);
      arr.forEach((its, idx) => {
        if (
          !this.skuArr.some((item, index) => {
            return item.specsSeq.includes(its);
          })
        ) {
          let delteIndex = "";
          arr.forEach((ite, ind) => {
            if (
              this.skuArr.filter((item) => {
                return item.specsSeq.includes(its);
              }).length == 0
            ) {
              delteIndex = this.form.specification[idx].value.findIndex(
                (itm, iex) => {
                  return itm == its;
                }
              );
            }
          });
          this.form.specification[idx].value.splice(delteIndex, 1);
          if (this.form.specification[idx].value.length == 0) {
            this.form.specification.splice(idx, 1);
          }
        }
      });
      this.pop = "";
      this.dialogVisibledeldel = false;
    },
    // 删除sku里面的图片
    delskuIMg(index) {
      this.skuArr[index].goodsSkuImg = "";
    },
    // 上下架时间处理
    dealDisabledDate(time) {
      return (
        time.getTime() + 24 * 60 * 60 * 1000 <
        new Date(this.form.putawayTime).getTime() + 24 * 60 * 60 * 1000
      );
    },
    // 编辑草稿箱
    gomdrafts(row) {
      this.getDetail(row.goodsCode, 1);
      this.dialogTableVisible = false;
    },
    // 删除全部草稿箱
    delallmdrafts() {
      let that = this;
      this.$confirm("确定清空草稿箱", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "none",
      })
        .then(() => {
          console.log();
          let obj = {
            goodsCodes: [],
          };
          that.DraftBoxList.records.forEach((el) => {
            obj.goodsCodes.push(el.goodsCode);
          });
          realDeleteGoods(obj).then((res) => {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
            this.getDraftBoxList();
          });
        })
        .catch(() => {});
    },
    // 删除草稿箱
    delmdrafts(row) {
      this.$confirm("确定删除么?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "none",
      })
        .then(() => {
          let obj = {
            goodsCodes: [row.goodsCode],
          };
          realDeleteGoods(obj).then((res) => {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
            this.getDraftBoxList();
          });
        })
        .catch(() => {});
    },
    // 是否临期change
    isOnTimeChange(val) {
      if (val == 1 && this.form.resource == 2) {
        let obj = {
          key: "保质期",
          value: [],
          skuvalue: "",
          day: "",
          date: "",
          time: true,
        };
        this.form.specification.push(obj);
      }
      if (val == 0) {
        this.form.manufactureTime = "";
        this.form.shelfDay = "";
      }
      if (val == 0 && this.form.resource == 2) {
        let delIndex;
        this.form.specification.forEach((el, idx) => {
          if (Object.keys(el).includes("time")) {
            delIndex = idx;
          }
        });
        this.form.specification.splice(delIndex, 1);
      }
    },
    // 状态change
    statusChange(val) {
      this.$refs.goodForm.clearValidate();
      this.form.putawayTime = "";
      this.form.soldOutTime = "";
    },
    // 保质期change
    shelfDayChange(val) {
      if (val) {
        let numDate = val * 24 * 60 * 60 * 1000;
        let newDate = new Date(
          parseInt(new Date(this.form.manufactureTime).getTime() + numDate)
        ).getTime();
        this.newDate = formatDate(newDate);
        let nowDate = parseInt(new Date().getTime());
        let number = (newDate - nowDate) / (60 * 60 * 24 * 1000);
        this.numberDay = parseInt(number);
      }
    },
    shelfDayChange1(val) {
      if (val) {
        let numDate = this.form.shelfDay * 24 * 60 * 60 * 1000;
        let newDate = new Date(
          parseInt(new Date(this.form.manufactureTime).getTime() + numDate)
        ).getTime();
        this.newDate = formatDate(newDate);
        let nowDate = parseInt(new Date().getTime());
        let number = (newDate - nowDate) / (60 * 60 * 24 * 1000);
        this.numberDay = parseInt(number);
      }
    },
    // 分类change
    goodsobjchange(value) {
      if (this.$refs.cascader1) {
        this.form.categoryName = this.$refs.cascader1.getCheckedNodes()[0].pathLabels;
      }
    },
    // 城市change
    citychange(value) {
      if (value.length > 0) {
        this.form.provinceCode = value[0];
        this.form.cityCode = value[1];
        this.HandleCityName(districts);
      }
    },
    // 得到省市区中文
    HandleCityName(districts) {
      for (let j = 0; j < this.cityvalue.length; j++) {
        for (let i = 0; i < districts.length; i++) {
          if (districts[i].adcode == this.cityvalue[j]) {
            this.cityArrName.push(districts[i].name);
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
    // 获取分类
    getcat() {
      selectShopCategoryv2().then((res) => {
        this.valArr = [];
        this.valArr = res.body;
      });
    },
    // 获取运费模板
    getfreight() {
      let obj = {
        curPage: 1,
        pageSize: 999,
      };
      getMerTemplateList(obj).then((res) => {
        this.selectTemplate = res.body;
        let element = this.selectTemplate.find((el) => {
          return el.isChecked == 1;
        });
        this.form.templateId = element.templateId;
      });
    },
    // 提交表单
    submitForm() {
      this.$refs.goodForm.validate((valid) => {
        if (valid) {
          if (this.form.status != 5 && this.form.stock <= 0) {
            this.$message({
              message: "库存值填写不正确",
              type: "error",
              center: true,
            });
            return false;
          }
          if (
            this.form.goodsPrice <
            this.form.accountMoney + this.form.anchorMoney
          ) {
            this.$message({
              message: "主播佣金+分享佣金应小于销售价格",
              type: "error",
              center: true,
            });
            return false;
          }
          if (
            this.form.status == 9 &&
            (this.form.putawayTime == "" || this.form.soldOutTime == "")
          ) {
            this.$message({
              message: "定时上下架请填写时间",
              type: "error",
              center: true,
            });
            return false;
          }
          if (
            !this.form.goodsOriginalPrice == 0 &&
            this.form.goodsPrice > this.form.goodsOriginalPrice
          ) {
            this.$message({
              message: "商品销售价格小于商品原价",
              type: "error",
              center: true,
            });
            return false;
          }
          if (this.form.isOnTime == 1 && this.form.manufactureTime == "") {
            this.$message({
              message: "请填写生产日期",
              type: "error",
              center: true,
            });
            return false;
          }
          if (this.form.isOnTime == 1 && !this.form.shelfDay) {
            this.$message({
              message: "请填写保质期",
              type: "error",
              center: true,
            });
            return false;
          }
          if (this.form.isOnTime == 1 && this.numberDay <= 0) {
            this.$message({
              message: "商品已过期",
              type: "error",
              center: true,
            });
            return false;
          }
          let abc = this.form.specification.find((el) => {
            return el.key == "保质期" && el.value.length == 0;
          });
          let def = this.form.specificationList.find((el) => {
            if (el["保质期"]) {
              return el;
            }
          });
          console.log(def);
          if (
            this.form.isOnTime == 1 &&
            this.form.resource == 2 &&
            abc &&
            !def
          ) {
            this.$message({
              message: "在多规格开启是否临期保质期sku必须有值",
              type: "error",
              center: true,
            });
            return false;
          }
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          this.timeout = setTimeout(() => {
            let form = Object.assign({}, this.form, {
              goodsOriginalPrice:this.form.goodsOriginalPrice.toFixed(2),
              discount:
                this.form.goodsOriginalPrice > 0
                  ? (this.form.goodsPrice / this.form.goodsOriginalPrice) * 10
                  : 0,
              specificationList: this.skuArr,
              category: this.form.category ? this.form.category.join(",") : "",
              categoryName: this.form.categoryName
                ? this.form.categoryName.join(",")
                : "",
              qualityTime: this.newDate ? this.newDate : "",
            });
            // 9 是定时后台没有变成1
            if (form.status == 9) {
              form.status = 1;
            }
            form.specification.forEach((el) => {
              if (el.skuvalue || el.skuvalue == "") {
                delete el.skuvalue;
              }
              if (el.time) {
                delete el.time;
              }
              if (el.day) {
                delete el.day;
              }
              if (el.date) {
                delete el.date;
              }
              console.log(el);
            });
            form.specificationList.forEach((el) => {
              if (el["保质期"] && el["保质期"] !== "") {
                el.manufactureTime = el["保质期"].split("至")[0];
                el.qualityTime = el["保质期"].split("至")[1];
              }
            });
            if (this.$route.query.goodsCode && !this.$route.query.status) {
              update(form).then((res) => {
                this.$message({
                  message: "修改商品成功",
                  type: "success",
                  center: true,
                });
                this.$router.push({
                  path: "/goods",
                });
              });
              return false;
            } else if (
              this.$route.query.goodsCode &&
              this.$route.query.status
            ) {
              goodsadd(form).then((res) => {
                this.$message({
                  message: "复制商品成功",
                  type: "success",
                  center: true,
                });
                this.$router.push({
                  path: "/goods",
                });
              });
            } else {
              goodsadd(form).then((res) => {
                this.$message({
                  message: "创建商品成功",
                  type: "success",
                  center: true,
                });
                this.$router.push({
                  path: "/goods",
                });
              });
            }
          }, 300);
        } else {
          this.$nextTick(() => {
            let obj = {
              alignToTop: false,
              block: "center",
              behavior: "smooth",
            };
            document
              .querySelectorAll(".el-form-item__error")[0]
              .scrollIntoView(obj);
          });
          return false;
        }
      });
      console.log(this.form);
    },
    // 删除图片
    delImg(index, type) {
      if (type) {
        this.form.detail.splice(index, 1);
        return false;
      }
      this.form.goodsImgs.splice(index, 1);
    },
    // 随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 上传图片
    uploadHttp({ file, data }) {
      if (data.data != "vedio") {
        if (file.type.split("/")[0] !== "image") {
          this.$message({
            message: "请上传图片",
            type: "error",
            center: true,
          });
          return false;
        }
        if (data.data === "goodsImgs" && this.form.goodsImgs.length == 15) {
          this.$message({
            message: "上传图片在15张以内",
            type: "error",
            center: true,
          });
          return false;
        }
        if (data.data === "detail" && this.form.detail.length == 15) {
          this.$message({
            message: "上传图片在15张以内",
            type: "error",
            center: true,
          });
          return false;
        }
        if (file.size > (1024 * 1024 * 1) / 2) {
          this.$message({
            message: "上传图片过大请上传500kb以下的图片",
            type: "error",
            center: true,
          });
          return false;
        }
      } else {
        if (file.type.split("/")[0] != "video") {
          this.$message({
            message: "只能上传视频",
            type: "error",
            center: true,
          });
          return false;
        }
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let houzhui = "";
      let fileName = "";
      houzhui = file.name.split(".");
      let fenge = file.name.split(".");
      let now = new Date();
      let year = now.getFullYear(); // 得到年份
      let month = now.getMonth(); // 得到月份
      let date = now.getDate(); // 得到日期
      var timestamp = Date.parse(new Date());
      month = month + 1;
      var timestamp = Date.parse(new Date());
      fileName = `${parseInt(
        (Math.random() + 1) * Math.pow(10, 18 - 1)
      )}${timestamp}.${houzhui[houzhui.length - 1]}`;
      let consat = `hs_star/app_shop/goods/${year}${month}${date}/${
        fileName || timestamp
      }`;
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
              if (data.data == "vedio") {
                that.form.vedio = url;
                this.$nextTick(() => {
                  this.initvideo();
                });
              } else {
                if (data.data == "specificationList") {
                  that.skuArr[data.open].goodsSkuImg = url;
                } else {
                  that.form[data.data].push(url);
                  if (
                    data.data === "goodsImgs" &&
                    that.form.goodsImgs.length > 15
                  ) {
                    that.form.goodsImgs.splice(
                      14,
                      that.form.goodsImgs.length - 15
                    );
                  }
                  if (data.data === "detail" && that.form.detail.length > 15) {
                    that.form.detail.splice(14, that.form.detail.length - 15);
                  }
                }
              }
              loading.close();
            }
          }
        })
        .catch((err) => {
          loading.close();
          this.$message("上传失败");
          console.log(`阿里云OSS上传图片失败回调`, err);
        });
    },
    delvideo() {
      this.videoplayer.pause();
      this.videoplayer.reload();
      this.videoplayer.destroy(true);
      this.form.vedio = "";
      this.videoplayer = "";
    },
    // 初始化video
    initvideo() {
      let that = this;
      if (this.videoplayer) {
        this.videoplayer.reload();
        this.videoplayer.pause();
        this.videoplayer.destroy();
      }
      this.videoplayer = new Player({
        id: "mse",
        autoplay: false,
        volume: 0.3,
        loop: true,
        lang: "zh-cn",
        url: that.form.vedio,
        width: 600,
        pip: true,
        height: 337.5,
      });
    },
  },
};
</script>
<style>
.guige {
  margin-bottom: 10px;
}
.gelu .el-input__inner {
  line-height: 28px !important;
  height: 28px !important;
}
.hidden-box {
  width: 0px;
  height: 0px;
}
.hidden-box /deep/ .el-input > .el-input__inner {
  position: absolute !important;
  width: 0 !important;
  height: 0 !important;
  z-index: -1 !important;
  padding: 0 !important;
  margin: 0 !important;
  top: 0;
  left: 0;
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
  display: inline-block;
}

.list-group-item i {
  cursor: pointer;
}
.bili > .el-upload {
  display: block;
}
</style>
<style scoped lang="scss">
.sku-box {
  padding: 20px;
  width: 84%;
  margin: 0 auto;
  box-sizing: border-box;
  border: solid 1px #afafaf;
  margin-top: 10px;
}
.sku-table {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
  margin: 0 auto;
}
.icon-content {
  border: solid 1px #efefef;
  border-radius: 2px;
  padding: 4px;
  display: inline-block;
  box-sizing: border-box;
  font-size: 12px;
  cursor: pointer;
}
.flex-dialog-one {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-dialog {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-container {
  height: auto;
}
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
.img-content {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
}
.img-item {
  margin-right: 15px;
  margin-top: 15px;
  position: relative;
  padding-right: 10px;
}
.img-item > .close-i {
  position: absolute;
  right: -10px;
  top: -10px;
}
.img-items {
  width: 80px;
  height: 80px;
}
.detils-img {
  width: 100%;
  display: flex;
  margin-top: 20px;
  position: relative;
}
.detils-img > div:first-of-type {
  flex: 0 0 50%;
}
.detils-img > div:last-of-type {
  flex: 0 0 50%;
  position: relative;
}
.detils-bg {
  top: -138px;
  width: 425px;
  right: 50px;
  position: relative;
  transform: scale(0.65);
  box-sizing: border-box;
  padding: 24px 24px 24px 24px;
  height: 852px;
  background-image: url("https://hs.star.oss.xingfaner.cn/shopmall/px.png");
  background-repeat: no-repeat;
  // overflow-y: scroll;
  overflow: hidden;
}
.deatils-items {
  width: 100%;
  line-height: 0;
}
.phone-hezi {
  width: 375px;
  height: 100%;
  border-radius: 34px;
  scrollbar-width: none;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
  }
}
.xiaoxue {
  display: inline-block;
  margin-left: 30px;
  margin-right: 20px;
  font-family: MicrosoftYaHeiLight;
  font-size: 12px;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
}
.submit-btn {
  padding: 20px 0px;
  background: #fff;
  margin-bottom: 0px;
}
.btn-search {
  border-radius: 0px;
}
.time-box-s {
  margin-top: 10px;
}
.big-container {
  font-size: 12px;
  font-family: Microsoft YaHei, MicrosoftYaHei-Bold;
  font-weight: bold;
  color: #666666;
}
.flex-sku {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-sku > div:last-of-type {
  flex: 1;
  display: flex;
  align-items: center;
}
.flex-sku > div:nth-of-type(2) {
  flex: 0 0 15%;
  margin: 0 auto;
  padding-left: 3%;
  box-sizing: border-box;
}
.skuvalue-class {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.skuvalue-item {
  margin-right: 20px;
}
.rea-png {
  position: relative;
}
.rea-png .el-icon-close {
  position: absolute;
  top: 0;
  display: block;
  right: 0;
  cursor: pointer;
}
</style>
