<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item)">
      <el-menu-item :index="onlyOneChild.path">
        <!-- <item :icon="onlyOneChild.meta.icon || (item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" /> -->
        <span slot="title">{{onlyOneChild.meta.title}}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="item.path">
      <template slot="title">
        <span v-if="item.meta">
          {{item.meta.title}}
        </span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="child.path" />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";

export default {
  name: "SidebarItem",
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