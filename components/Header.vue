<template>
    <div>
        <el-row>
            <el-col :span="2">
                <div class="logo-icon-container">
                    <el-avatar :size="50" :src="circleUrl" class="logo"></el-avatar>
                </div>
            </el-col>
            <el-col :span="21">
                <el-menu mode="horizontal" text-color="white" background-color="#409EFF">
                    <el-menu-item index="1">xx系统</el-menu-item>
                    <el-menu-item index="2">消息中心</el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="4">处理中心</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="1">
                <div class="log-btn-container">
                    <el-tooltip
                            effect="dark"
                            placement="bottom-start"
                            :content="loginflag?'登出':'登录'">
                        <i @click="logoutSys()" :class="loginflag?'el-icon-switch-button':'el-icon-service'"></i>
                    </el-tooltip>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //import { mapActions } from "vuex";
    import ElPopover from "element-ui/packages/popover/src/main";

    export default {
        components: {ElPopover},
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
                }
                this.$router.push("/");
            }
        }
    };
</script>

<style scoped lang="scss">
    .logo-icon-container {
       // border-bottom: 1px solid #e6e6e6;
        height: 60px;
        background-color: #409EFF;
    }

    .logo {
        position: relative;
        top: 5px;
        left: 20px;
    }

    .log-btn-container {
        line-height: 60px;
        font-size: 20px;
        text-align: right;
        padding-right: 20px;
        background-color: #409EFF;
        color: white;
        &:hover {
            cursor: pointer;
        }
    }
    .el-menu.el-menu--horizontal{
        border-bottom: unset;
    }
</style>
