<template>
    <div class="nav-tab">
        <div class="nav-tab-left">
            <el-button size="mini" class="fa fa-backward"></el-button>
        </div>
        <div class="nav-tab-center">
            <el-button-group>
                <template v-for="tab in tabs">
                    <template v-if="activeTab!==null && tab.index===activeTab.index">
                        <el-button size="mini" type="primary" @click.native="setActive(tab)">{{tab.title}}<i
                                class="fa fa-close" @click.stop="closeTab(tab)"></i></el-button>
                    </template>
                    <template v-else>
                        <el-button size="mini" @click.native="setActive(tab)">{{tab.title}}<i class="fa fa-close"
                                                                                              @click.stop="closeTab(tab)"></i>
                        </el-button>
                    </template>
                </template>
            </el-button-group>
        </div>
        <div class="nav-tab-right">
            <el-button-group>
                <el-button size="mini" class="fa fa-forward"></el-button>
                <el-dropdown size="mini" split-button>
                    标签操作
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>关闭其他</el-dropdown-item>
                        <el-dropdown-item>关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-button-group>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //activeTab:null
            }
        },
        methods: {
            setActive(tab) {
                if(tab){
                    this.$store.commit('set_tab_active', tab)
                }
                this.$router.push(this.activeTab.index);
            },
            closeTab(tab) {
                this.$store.commit('remove_tabs', tab)
            }
        },
        computed: {
            tabs() {
                return this.$store.state.tabs;
            },
            activeTab(){
                return this.$store.state.active_tab;
            }
        },
    }
</script>

<style scoped lang="scss">
    .nav-tab {
        position: relative;
        width: 100%;
        height: 30px;
        background-color: white;
        border-bottom: 1px solid #e9e9e9;
    }

    .nav-tab-left {
        position: absolute;
        left: 0;
        z-index: 2;
        .el-button {
            position: relative;
            top: 1px;
        }
    }

    .nav-tab-center {
        position: absolute;
        white-space: nowrap;
        z-index: 1;
        display: inline-block;
        left: 46px;
        .el-button {
            font-weight: 300;
            position: relative;
            top: 1px;
            margin-right: 2px;
            .fa {
                position: relative;
                left: 10px;
                top: -1px;
            }
        }
    }

    .nav-tab-right {
        position: absolute;
        right: 0;
        z-index: 2;
        .el-dropdown {
            position: relative;
            top: 1px;
        }
        .el-button {
            position: relative;
            top: 1px;
        }
    }

    .el-button {
        font-size: 12px;
    }
</style>
