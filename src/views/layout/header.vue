<template>
  <div class="header-container">
    <div class="header-menu-placeholder"></div>
    <div class="home-con">
      <icon icon="home"></icon>
    </div>
    <el-popover trigger="click" placement="bottom-start" v-model="isShowPopver">
      <div class="visit-con">
        <div class="visit-con-left">
          <div class="visit-title">所有菜单</div>
          <div class="visit-scroll-con">
            <div class="visit-item" :class="{'active': menuItem.path === basePath}" v-for="(menuItem, menuIndex) in menuList" :key="menuIndex" @mouseenter="switchRouter(menuItem, menuIndex)">{{menuItem.meta.title}}</div>
          </div>
        </div>
        <div class="visit-con-right">
          <div class="visit-item" v-for="(item, index) in menuItemList" :key="index" :class="{'active': item.path === path}" @mouseenter="handleItemEnter(item)" @click="handleSwitchRouter(item.path)">{{item.meta.title}}</div>
        </div>
        <div></div>
      </div>
      <template slot="reference" @click="handlePopver">
        <div class="home-con">
          <icon icon="xiangqing"></icon>
        </div>
      </template>
    </el-popover>
    <div class='search-luyou-con'>
      <el-select :value="[]" multiple filterable remote reserve-keyword placeholder="请输入关键词搜索" :remote-method="remoteMethod" @change='handleSelectChange'>
        <el-option v-for="(item, index) in options" :key="index" :label="item.meta.title" :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="search-con"></div>
    <div class="refresh" @click="reload">
      <i class="el-icon-refresh-right"></i>刷新
    </div>
    <el-popover trigger="hover" width="154">
      <div class="user-action-con">
        <div class="user-action-item">
          <img src="../../../static/img/qiehuan.png" />
          切换账号
        </div>
        <div class="user-action-item">
          <img src="../../../static/img/xiugai.png" />
          修改密码
        </div>
      </div>
      <div class="name-con" slot="reference">
        <div class="user-name">{{name}}</div>
        <icon icon="danjiantouxia" style="width:10px;height:10px;margin-left:9px;"></icon>
      </div>
    </el-popover>
    <el-tooltip class="item" content="退出登录" placement="bottom">
      <div class="home-con" @click="signout">
        <icon icon="guanbikaiguan"></icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { mapActions } from 'vuex';
const { mapState } = createNamespacedHelpers('user');
import Icon from '@/components/base/icon.vue';
import { deepClone } from '@/utils/util';
export default {
  name: 'headercontainer',
  components: {
    Icon,
  },
  computed: {
    ...mapState({
      name: 'name',
      menuList: 'routes',
    }),
  },
  data() {
    return {
      valueSelect: '',
      loading: false,
      states: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
      ],
      options: [],
      isShowPopver: false,
      path: '',
      basePath: '',
      menuItemList: [],
    };
  },
  methods: {
    handleSelectChange (value) {
      let {
        path,
        meta: {
          parentPath
        }
    } = value[0]
      if (path !== '') {
        this.$router.push(path)
        return false
      }
      this.$router.push(parentPath)
    },
    remoteMethod(query) {
      let ret = [];
      if (query.trim()) {
        const getList = (item) => {
          let {
            meta: { title },
            children,
          } = item;
          if (title.includes(query)) {
            if (item.children && item.children.length) {
              ret = ret.concat(item.children.flat(Infinity))
            } else {
              ret.push(item);
            }
          }
        };
        this.menuList.forEach((listItem, listIndex) => {
          listItem.children.forEach((item, index) => {
            getList(item)
          });
        });
      }
      this.options = ret;
    },
    signout() {
      this.$store.dispatch('user/resetToken').then(() => {
        window.location.hash = '/login';
      });
    },
    reload() {
      window.location.reload();
    },
    handlePopver() {
      this.isShowPopver = true;
    },
    handleSwitchRouter(path) {
      this.isShowPopver = false;
      this.$router.push(path !== '/' ? path.replace(/\/$/g, '') : path);
    },
    handleItemEnter(item) {
      this.path = item.path;
    },
    switchRouter(menuItem, index) {
      this.basePath = menuItem.path;
      this.menuItemList = this.filterMenuItem(deepClone(menuItem.children));
    },
    filterMenuItem(list) {
      let result = [];
      try {
        list.forEach((menuItem, menuIndex) => {
          let {
            path,
            meta: { basePath, parentPath },
          } = menuItem;
          if (menuItem.path == '') {
            menuItem.path = (parentPath || basePath) + '/';
          }
          if (!menuItem.hidden) {
            if (menuItem.children) {
              result.push(...this.filterMenuItem(menuItem.children));
            } else {
              result.push(menuItem);
            }
          }
        });
      } catch (error) {
        console.log(error, 'error');
      }
      return result;
    },
  },
  created() {
    let {
      path,
      meta: { basePath, parentPath },
    } = this.$route;
    this.basePath = basePath || path;
    this.path = path == basePath ? path + '/' : path;
    this.menuList.forEach((menuItem, menuIndex) => {
      if (menuItem.path === basePath) {
        this.menuItemList = this.filterMenuItem(
          deepClone(this.menuList[menuIndex].children)
        );
      }
    });
    this.currentNodeKey = this.$route.matched[
      this.$route.matched.length - 1
    ].path;
  },
  mounted() {
    this.list = this.states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
};
</script>

<style  scoped lang='scss'>
.header-container {
  display: flex;
  height: 54px;
  width: 100%;
  .header-menu-placeholder {
    width: 138px;
    height: 100%;
    background: #24303c;
  }
  .search-luyou-con {
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #e7eaec;
    border-right: 1px solid #e7eaec;
    display: flex;
    align-items: center;
    width: 284px;

    & ::v-deep .el-select {
      width: 100% !important;
      border: none !important;
      .el-input__inner {
        border: none !important;
        padding-right: 0 !important;
      }
      .el-select__tags {
        border: none !important;
        max-width: 280px !important;
      }
      .el-input {
        border: none !important;
        padding-right: 0;
      }
      .el-select__input {
        max-width: 247px !important;
      }
      .el-input__suffix {
        width: 0 !important;
      }
    }
  }
  .home-con {
    flex: 0 0 60px;
    width: 60px;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid #e7eaec;
    cursor: pointer;
    &::after {
      content: ' ';
      position: absolute;
      width: 1px;
      background: #e7eaec;
      height: 100%;
      right: 0;
      top: 0;
    }
  }
  .search-con {
    flex: 1;
    height: 100%;
    position: relative;
    background: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #e7eaec;
    &::after {
      content: ' ';
      position: absolute;
      width: 1px;
      background: #e7eaec;
      height: 100%;
      right: 0;
      top: 0;
    }
  }
  .refresh {
    flex: 0 0 120px;
    width: 120px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    color: #333333;
    background: #fff;
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid #e7eaec;
    cursor: pointer;
    .el-icon-refresh-right {
      margin-right: 10px;
    }
    &::after {
      content: ' ';
      position: absolute;
      width: 1px;
      background: #e7eaec;
      height: 100%;
      right: 0;
      top: 0;
    }
  }
  .name-con {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    color: rgba(51, 51, 51, 1);
    background: #fff;
    width: 178px;
    padding: 0 9px;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid #e7eaec;
    &::after {
      content: ' ';
      position: absolute;
      width: 1px;
      background: #e7eaec;
      height: 100%;
      right: 0;
      top: 0;
    }
    .user-name {
      width: 155px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
  .focusing {
    outline: none;
  }
}
.user-action-con {
  height: 80px;
  display: flex;
  box-sizing: border-box;
  padding: 10px 0;
  .user-action-item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    cursor: pointer;
    img {
      display: block;
      width: 30px;
      height: 30px;
      margin-bottom: 12px;
    }
  }
}
.visit-con {
  min-width: 629px;
  height: 390px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  .visit-con-left {
    flex: 0 0 153px;
    height: 390px;
    border-right: 1px solid #f5f5f5;
    .visit-title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 15px;
      font-size: 15px;
      font-family: Microsoft YaHei;
      color: rgba(51, 51, 51, 1);
      margin-top: 20px;
      margin-bottom: 7px;
    }
    .visit-scroll-con {
      height: calc(100% - 55px);
      overflow-y: scroll;
      box-sizing: border-box;
      padding-left: 17px;
      .visit-item {
        font-size: 13px;
        font-family: Microsoft YaHei;
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 17px;
        cursor: pointer;
        margin-bottom: 10px;
        &:hover,
        &.active {
          font-size: 13px;
          font-family: Microsoft YaHei;
          background: rgba(68, 171, 247, 1);
          color: #ffffff;
        }
      }
    }
  }
  .visit-con-right {
    box-sizing: border-box;
    padding: 42px 17px 34px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex: 1;
    .visit-item {
      width: 136px;
      height: 30px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 14px;
      font-size: 13px;
      font-family: Microsoft YaHei;
      color: rgba(102, 102, 102, 1);
      background: #f7f8fa;
      cursor: pointer;
      margin-bottom: 10px;

      &:hover,
      &.active {
        font-size: 13px;
        font-family: Microsoft YaHei;
        background: rgba(68, 171, 247, 1);
        color: #ffffff;
      }
    }
  }
}
.el-popover {
  padding: 0 !important;
  font-size: 13px;
  font-family: Microsoft YaHei;
  color: rgba(102, 102, 102, 1);
}
</style>