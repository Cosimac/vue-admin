<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from "./components";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scope>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
</style>