<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false"
        :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import variables from "@/styles/variables.scss";
import SidebarItem from "./SidebarItem";
// import { mapState } from "vuex";

export default {
  name: "Sidebar",
  components: {
    SidebarItem
  },
  computed: {
    // ...mapState([
    //   'sidebar'
    // ]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    isCollapse() {
      return false;
    },
    variables() {
      return variables;
    },
    routes() {
      return this.$router.options.routes;
    }
  }
};
</script>