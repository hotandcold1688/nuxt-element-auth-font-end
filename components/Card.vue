<template>
    <div class="card card-stats">
        <div class="card-header" :class="theme">
            <div class="card-icon">
                <img :src="img"/>
            </div>
            <p class="card-category">{{title}}</p>
            <h3 class="card-title">{{category}}</h3>
        </div>
        <div class="card-footer">
            <div class="stats">
                <i class="material-icons">更新时间:<span>{{time}}</span></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            theme: {
                type: String,
                default: 'card-header-warning'
            },
            img: {
                type: String,
                default: require('~/assets/img/rubbish-1-64x64.png')
            },
            category: {
                type: Number,
                default: 0
            },
            title: {
                type: String,
                default: 'xx垃圾'
            },
            time: {
                type: String,
                default: '下午3:54:42'
            }
        },
    }
</script>

<style scoped lang="scss">
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
