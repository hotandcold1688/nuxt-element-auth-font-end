<template>
    <el-aside width="230px" v-if="this.menus.length>0">
        <div class="sys-menu-title">欢迎使用xx系统</div>
        <el-menu :default-active="activeIndex"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 @select="menuChoose"
                 router>
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
                    <el-menu-item v-for="child in item.children" :index="child.index" :key="child.id">
                        {{child.title}}
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        methods: {
            menuChoose(index,indexPath) {
                let menu=this.originalMenus.find(function (val) {
                        return val.index===index;
                });
                if(menu.parent!=='-1'){
                    this.$store.commit('push_tabs',menu)
                    this.$store.commit('set_tab_active',menu)
                }
            }
        },
        computed: {
            menus() {
                return this.$store.state.menus;
            },
            originalMenus(){
                return this.$store.state.original_menus;
            }
        },
        data() {
            return {
                activeIndex: '/welcome'
            }
        },
        watch: {
            $route(newValue, oldValue) {
                console.log(this.$route)
                /**
                 * 暂时留着这个口子，后续可能用到 begin
                 * @type {null|*}
                 */
                let active=this.$store.state.active_tab;
                this.activeIndex=active?active.index:'/welcome';

                /**
                 * end
                 */
                //this.activeIndex=this.$route.fullPath
            }
        }
    }
</script>

<style scoped lang="scss">

    .el-menu {
        border-right: 0px;
    }

    .sys-menu-title {
        padding: 20px;
        background-color: #545c64;
        color: white;
    }
</style>
