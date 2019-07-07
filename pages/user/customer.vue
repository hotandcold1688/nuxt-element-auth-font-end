<template>
    <div class="page-container">
        <PageNavTab />
        <div class="inner-container">
            <PageTitle/>
        </div>
    </div>
</template>

<script>
    import PageTitle from '@/components/PageTitle.vue';
    import PageNavTab from '@/components/PageNavTab.vue';

    export default {
        components: {
            PageTitle,
            PageNavTab
        }
    };
</script>

<style scoped lang="scss">

</style>
