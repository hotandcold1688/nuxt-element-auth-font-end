<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-for="breadcrumb in breadcrumbs">
            <el-breadcrumb-item><i :class="breadcrumb.icon"></i>{{breadcrumb.title}}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script>
    export default {
        created() {
            let name = this.$route.name;
            let breads = this.$store.getters.getAllPathByName(name)
            this.breadcrumbs = breads;
        },
        asyncData() {

        },
        mounted() {

        },
        methods: {},
        data() {
            return {
                breadcrumbs: []
            }
        },
    };
</script>

<style scoped lang="scss">
    .el-breadcrumb{
        margin-bottom: 20px;
    }
</style>
