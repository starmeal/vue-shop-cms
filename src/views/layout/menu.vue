<template>
  <div class='menu-container'>
    <div :class="['menu-con', {'is-collapse': isCollapse}]">
      <div class='menu-top-item' :class="{'is-collapse': isCollapse}" @click='changeIsCollapse'>
        <Icon :icon="isCollapse ? 'yousuojin':'zuosuojin'" />
      </div>
      <div v-for="(menuItem, index ) in menuList" :key='menuItem.path' class='menu-item' :class="{'is-collapse': isCollapse, 'is-collapse-color': menuItem.path  === $route.path || menuItem.path === basePath}" @click='switchRouter(menuItem, index)'>
        <Icon :icon='menuItem.meta.icon' />
        <div class='menu-item-name' v-show='isCollapse'>{{menuItem.meta.title}}</div>
      </div>
    </div>

    <div :class="['menu-second-container', {'active': isCollapseSecond}]">
      <div :class="['second-title', {'active': isCollapseSecond}]"><span>店铺首页</span></div>
      <el-tree :data="menuItemList" highlight-current node-key="path" @node-click='handleNodeClick' :default-expanded-keys="defaultExpandedKeys" :current-node-key='currentNodeKey'>
        <div class="second-init-title" slot-scope="{ node, data }">
          <span :class="{'has-children': data.children && data.children.length}">{{ data.title }}</span>
        </div>
      </el-tree>
    </div>
    <div class='close' @click='handleIsCollapseSecond'></div>
  </div>
</template>

<script>
import { deepClone } from '@/utils/util';
import Icon from '@/components/base/icon.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('user');
export default {
  data() {
    return {
      isCollapse: true,
      isCollapseSecond: true,
      menuItemList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      defaultExpandedKeys: [],
      currentNodeKey: ''
    };
  },
  components: {
    Icon
  },
  computed: {
    ...mapState({
      menuList: 'routes'
    })
  },
  created() {
    let {
      path,
      meta: { basePath, parentPath }
    } = this.$route;
    this.defaultExpandedKeys = [path];
    this.basePath = basePath;
    this.menuList.forEach((menuItem, menuIndex) => {
      if (menuItem.path != '/' && menuItem.path == basePath) {
        this.menuItemList = this.filterMenuItem(
          deepClone(this.menuList[menuIndex].children)
        );
      }
    });
    this.currentNodeKey = this.$route.matched[
      this.$route.matched.length - 1
    ].path;
  },
  methods: {
    handleNodeClick(data, node, self) {
      let {
        path,
        meta: { parentPath },
        children
      } = data;
      if (children && children.length > 0) {
        return false;
      }
      this.$router.push(path.replace(/\/$/g, ''));
    },
    filterMenuItem(list) {
      let result = [];
      list.forEach((menuItem, menuIndex) => {
        let {
          path,
          meta: { basePath, parentPath }
        } = menuItem;
        if (menuItem.path == '') {
          menuItem.path = (parentPath || basePath) + '/';
        }
        if (!menuItem.hidden) {
          result.push(menuItem);
          if (menuItem.children) {
            this.filterMenuItem(menuItem.children);
          }
        }
      });
      return result;
    },
    switchRouter(menuItem, index) {
      if (menuItem.path !== this.$route.path) {
        this.$router.push(menuItem.path);
        this.menuItemList = this.filterMenuItem(
          deepClone(this.menuList[index].children)
        );
      }
    },
    changeIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    handleIsCollapseSecond() {
      this.isCollapseSecond = !this.isCollapseSecond;
    }
  }
};
</script>

<style scoped lang='scss'>
.menu-container {
  display: flex;
  position: relative;
  height: calc(100vh - 54px);
  .close {
    position: absolute;
    width: 18px;
    height: 36px;
    background: #fff;
    right: -18px;
    top: 0;
    cursor: pointer;
  }
  .menu-con {
    flex: 0 0 60px;
    height: 100%;
    background: #24303c;
    transition: all 0.3s linear;
    &.is-collapse {
      flex: 0 0 138px;
    }
    .menu-top-item {
      transition: all 0.3s linear;
      width: 60px;
      height: 30px;
      background: #28394a;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.is-collapse {
        width: 138px;
      }
    }
    .menu-item {
      transition: width 0.3s linear;
      width: 60px;
      height: 54px;
      display: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.is-collapse {
        width: 138px;
      }
      &.is-collapse-color {
        background: #19222e;
      }
      .menu-item-name {
        position: relative;
        z-index: -1px;
        right: 0;
        font-size: 15px;
        font-family: Microsoft YaHei;
        color: rgba(255, 255, 255, 1);
        margin-left: 10px;
      }
    }
  }
  .menu-second-container {
    width: 0px;
    height: 100%;
    background: #fff;
    position: relative;
    transition: all 0.3s;
    overflow-x: hidden;
    &.active {
      width: 120px;
    }
    .second-title {
      width: 120px;
      height: 54px;
      font-size: 13px;
      font-family: Microsoft YaHei;
      color: rgba(51, 51, 51, 1);
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 24px;
    }
    .second-init-title {
      box-sizing: border-box;
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
      .has-children {
        font-size: 13px;
        font-family: Microsoft YaHei;
        color: #333333;
        font-weight: normal;
      }
    }
  }
  & ::v-deep .el-tree-node__content {
    width: 120px;
    height: 55px;
    &:hover {
      background: rgba(0, 174, 255, 0.06) !important;
    }
  }
  & ::v-deep .el-tree-node:focus > .el-tree-node__content {
    background: rgba(0, 174, 255, 0.06) !important;
  }
}
</style>