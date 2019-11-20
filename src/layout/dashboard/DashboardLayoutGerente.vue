<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/estoque" :name="$t('sidebar.estoque')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/compras" :name="$t('sidebar.compras')" icon="tim-icons icon-puzzle-10"/>
        <sidebar-link to="/funcionarios" :name="$t('sidebar.funcionarios')" icon="tim-icons icon-puzzle-10"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
