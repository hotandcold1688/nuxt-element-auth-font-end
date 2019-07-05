<template>
  <div>
    <el-row>
      <el-col :span="3">
        <div class="logo-icon-container">
          <el-avatar :size="50" :src="circleUrl" class="logo"></el-avatar>
        </div>
      </el-col>
      <el-col :span="21">
        <el-menu mode="horizontal">
          <el-menu-item index="4" @click.native="logoutSys()">{{loginflag?'退出':'登录'}}</el-menu-item>
          <el-menu-item index="3">消息中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="1">处理中心</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//import { mapActions } from "vuex";
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  computed: {
    loginflag() {
      return this.$store.state.loginflag;
    }
  },
  methods: {
    logoutSys() {
      if (this.loginflag) {
        this.$store.dispatch("logSys", !this.loginflag);
        this.$router.push("/");
      }
    }
    // ...mapActions({
    //   topLogSys:'topLogSys'
    // })
  }
};
</script>

<style scoped>
.logo-icon-container {
  border-bottom: 1px solid #e6e6e6;
  height: 60px;
}
.logo {
  position: relative;
  top: 5px;
  left: 20px;
}
.el-menu--horizontal > .el-menu-item {
  float: right;
}
.el-menu--horizontal > .el-submenu {
  float: right;
}
</style>