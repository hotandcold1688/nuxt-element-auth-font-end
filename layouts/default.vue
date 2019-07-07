<template>
    <el-container>
        <el-header>
            <Header/>
        </el-header>

        <el-container>
            <SideMenu/>
            <el-main>
                <nuxt/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "~/components/Header";
    import SideMenu from '@/components/SideMenu.vue';
    export default {
        components: {
            Header,
            SideMenu
        },
        data() {
            return {};
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
        background-color: #F2F6FC;
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
