<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>

    <el-container>
      <el-aside width="230px" v-if="this.menus.length>0">
        <el-col :span="24">
          <div class="sys-menu-title">欢迎使用xx系统</div>
          <el-menu
            default-active="/welcome"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <template v-for="item in menus">
              <el-menu-item v-if="item.isleaf" :index="item.index" :key="item.id">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
              <el-submenu v-else :index="item.index" :key="item.id">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.index" :key="child.id">{{child.title}}</el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "~/components/Header";
export default {
  components: {
    Header
  },
  data() {
    return {};
  },
  computed: {
    menus() {
      return this.$store.state.menus;
    }
  },
  mounted() {
    console.log("default-layout-mounted");
  }
};
</script>

<style scoped>
.el-aside {
  background-color: #545c64;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-main {
  height: 100%;
  padding: 0;
}
.el-menu {
  border-right: 0px;
}

.sys-menu-title {
  padding: 20px;
  background-color: #545c64;
  color: white;
}
</style>