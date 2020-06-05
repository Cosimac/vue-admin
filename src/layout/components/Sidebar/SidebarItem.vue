<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item)">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="onlyOneChild.path">
          <span>{{onlyOneChild.meta.title}}</span>
          <!-- <item :icon="onlyOneChild.meta.icon || (item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" /> -->
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else :index="item.path">
      <template slot="title">
        <span v-if="item.meta">{{item.meta.title}}</span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)" />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import AppLink from "./AppLink";
// import Item from "./Item";

export default {
  name: "SidebarItem",
  components: {
    AppLink,
    // Item
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    // 查看是否存在多个子节点
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // 子节点存在一个
      if (showingChildren.length === 1) {
        return true;
      }
      // 子节点不存在
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>