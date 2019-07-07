<template>
    <div class="inner-container">
        <el-row :gutter="10">
            <el-col :span="6">
                <Card :title=card1.title :category=card1.category :img=card1.img
                      :time=card1.time :theme=card1.theme></Card>
            </el-col>
            <el-col :span="6">
                <Card :title=card2.title :category=card2.category :img=card2.img
                      :time=card2.time :theme=card2.theme></Card>
            </el-col>
            <el-col :span="6">
                <Card :title=card3.title :category=card3.category :img=card3.img
                      :time=card3.time :theme=card3.theme></Card>
            </el-col>
            <el-col :span="6">
                <Card :title=card4.title :category=card4.category :img=card4.img
                      :time=card4.time :theme=card4.theme></Card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div id="charts" ref="myEchart" :style="{height:height,width:width}"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import Card from '@/components/Card.vue';
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/line'

    export default {
        components: {
            Card,
        },
        asyncData() {
            console.log('门户首页-asyncData')
        },
        methods: {
            init() {
                const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
                setTimeout(() => {
                    window.onresize = function () {
                        self.chart.resize();
                    }
                }, 20)
            },
            initChart() {
                this.chart = echarts.init(this.$refs.myEchart);
                this.chart.setOption(this.option)
            }
        },
        mounted() {
            this.initChart();
            this.init();//让窗口自适应
        },
        data() {
            return {
                chart: null,
                option: {
                    title: {
                        text: '未来一周气温变化',
                        subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['最高气温', '最低气温']
                    },
                    opts: {
                        width: '100%',
                        height: '100%',
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '最高气温',
                            type: 'line',
                            data: [11, 11, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '最低气温',
                            type: 'line',
                            data: [1, -2, 2, 5, 3, 2, 0],
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                },
                card1: {
                    title: '厨余垃圾',
                    category: 10,
                    time: '下午5:18:00',
                    img: require('~/assets/img/rubbish-1-64x64.png'),
                    theme: 'card-header-warning'
                },
                card2: {
                    title: '有害垃圾',
                    category: 9,
                    time: '下午5:18:00',
                    img: require('~/assets/img/rubbish-2-64x64.png'),
                    theme: 'card-header-rose'
                },
                card3: {
                    title: '可回收物',
                    category: 27,
                    time: '下午5:18:00',
                    img: require('~/assets/img/rubbish-3-64x64.png'),
                    theme: 'card-header-success'
                },
                card4: {
                    title: '其他垃圾',
                    category: 18,
                    time: '下午5:18:00',
                    img: require('~/assets/img/rubbish-4-64x64.png'),
                    theme: 'card-header-info'
                },
            }
        },
        props: {
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '100%'
            }
        },
        created(){

        },
        destroyed() {
            window.onresize="";
        }
    }
</script>

<style lang="scss" scoped>
    .el-row:first-child {
        height: 195px;
    }

    .el-row:last-child {
        height: calc(100% - 195px);
        > .el-col {
            height: 100%;
        }
    }

    .card {
        border: 0;
        margin-bottom: 30px;
        margin-top: 30px;
        border-radius: 6px;
        color: #333;
        background: #fff;
        width: 100%;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
    }

    .card-header {
        margin: 0 15px;
        padding: 0;
        position: relative;
        text-align: right;

        .card-icon {
            border-radius: 3px;
            background-color: #999;
            padding: 15px;
            margin-top: -20px;
            margin-right: 15px;
            float: left;
        }
        .card-category {
            margin: 0;
            padding-top: 10px;
            color: #999;
            font-size: 14px;
        }
        .card-title {
            font-weight: 400;
            margin: 0;
            color: #3c4858;
        }
    }

    .card-footer {
        padding: 10px;
        margin: 40px 15px 0 15px;
        border-radius: 0;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        border-top: 1px solid #eee;
        color: rgb(153, 153, 153);
        font-size: 12px;
    }

    .card-header-warning {
        > .card-icon {
            background: linear-gradient(60deg, #ffa726, #fb8c00);
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(255, 152, 0, .4);
        }
    }

    .card-header-rose {
        > .card-icon {
            background: linear-gradient(60deg, #ec407a, #d81b60);
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(233, 30, 99, .4);
        }
    }

    .card-header-success {
        > .card-icon {
            background: linear-gradient(60deg, #66bb6a, #43a047);
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(76, 175, 80, .4);
        }
    }

    .card-header-info {
        > .card-icon {
            background: linear-gradient(60deg, #26c6da, #00acc1);
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(0, 188, 212, .4);
        }
    }

</style>
