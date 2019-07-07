<template>
    <el-row justify="space-between">
        <el-col :span="12" class="page-title">
            <div>{{title}}</div>
        </el-col>
        <el-col :span="12">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <template v-for="breadcrumb in breadcrumbs">
                    <el-breadcrumb-item><i :class="breadcrumb.icon"></i>{{breadcrumb.title}}</el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </el-col>
    </el-row>
</template>

<script>

    export default {
        components: {},
        created() {
            let name = this.$route.name;
            let breads = this.$store.getters.getAllPathByName(name)
            this.breadcrumbs = breads;
            this.title=this.$store.getters.getCurrentPathTitle(name)
        },
        asyncData() {

        },
        mounted() {

        },
        methods: {},
        data() {
            return {
                breadcrumbs: [],
                title:null
            }
        },
    };
</script>

<style scoped lang="scss">
    .el-breadcrumb{
        line-height: 37px;
        position: absolute;
        right: 10px;
    }
    .page-title{
        font-size: 25px;
        margin-bottom: 10px;
    }
</style>
