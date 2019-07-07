<template>
    <div class="login-container">
        <div class="login-form">
            <!--微信登录-->
            <template v-if="login_channel==='weixin'">
                <el-row class="wx-saoma">
                    <el-col :span="24">
                        <el-avatar shape="square" :size="320">
                            <img src="~/assets/img/wx-saoma.jpeg"/>
                        </el-avatar>
                    </el-col>
                </el-row>

                <el-row class="wx-tips1">
                    <el-col :span="24">
                        <span>使用手机微信扫码登录</span>
                    </el-col>
                </el-row>
                <el-row class="wx-tips2">
                    <el-col :span="24">
            <span>
              如需密码方式登录页面，请点击
              <a @click.stop="change_login_channel('normal')">这里</a>
            </span>
                    </el-col>
                </el-row>
            </template>
            <!--微博登录-->
            <template v-else-if="login_channel==='weibo'"></template>
            <!--qq登录-->
            <template v-else-if="login_channel==='qq'"></template>
            <!--正常登录-->
            <template v-else>
                <el-row>
                    <el-col :span="24" class="login-form-title">
                        <b>后台</b>管理系统
                    </el-col>
                </el-row>
                <el-form :rules="rules">
                    <el-form-item prop="name">
                        <el-input
                                placeholder="请输入用户名称/手机号"
                                suffix-icon="el-icon-mobile-phone"
                                v-model="user_name"
                                clearable
                        ></el-input>
                    </el-form-item>
                    <template v-if="login_type === 'password'">
                        <el-form-item>
                            <el-input
                                    placeholder="请输入密码"
                                    suffix-icon="el-icon-lock"
                                    type="password"
                                    v-model="login_key"
                                    show-password
                            ></el-input>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item>
                            <el-row :gutter="20">
                                <el-col :span="16">
                                    <el-input
                                            placeholder="请输入短信验证码"
                                            suffix-icon="el-icon-chat-round"
                                            v-model="login_key"
                                    ></el-input>
                                </el-col>
                                <el-col :span="7">
                                    <el-button type="info" plain size="small">发送验证码</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </template>

                    <el-form-item class="login-buttton-item">
                        <el-button type="primary" class="login-btn" @click.native="loginSys">登录</el-button>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-col :span="24" class="login-type">
                        <a @click.stop="change_login_type('password')">密码登录</a>
                        <span>|</span>
                        <a @click.stop="change_login_type('sms')">短信登录</a>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="login-more-desc">
                        <span>-第三方登录-</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="login-social-logo">
                        <el-avatar
                                :size="50"
                                class="wechat-logo"
                                @click.native="change_login_channel('weixin')"
                        >
                            <img src="~/assets/img/wechat.png"/>
                        </el-avatar>
                        <el-avatar :size="50" class="qq-logo">
                            <img src="~/assets/img/qq.png"/>
                        </el-avatar>
                        <el-avatar :size="50" class="weibo-logo">
                            <img src="~/assets/img/weibo.png"/>
                        </el-avatar>
                    </el-col>
                </el-row>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        data() {
            return {
                /**
                 * 登录渠道
                 *  normal：正常登录（密码、短信）
                 *  weixin：微信登录
                 *  weibo：微博登录
                 *  qq：qq登录
                 */
                login_channel: "normal",
                /**
                 * 登录方式：总共两种
                 *  password-密码的登录方式
                 *  sms-短信的登录方式
                 */
                login_type: "password",
                //用户名
                user_name: "",
                //登录的key值
                login_key: "",
                rules: {
                    name: [{}]
                }
            };
        },
        methods: {
            /**
             * 切换类型登录
             */
            change_login_type(type) {
                this.login_type = type;
            },
            /**
             * 切换渠道登录
             */
            change_login_channel(channel) {
                this.login_channel = channel;
            },
            /**
             * 登录系统
             */
            loginSys() {
                this.$store.dispatch("logSys", true);
                this.$router.push("/welcome");

            }
        },
        created() {
            let self=this;
            document.onkeydown=function (e) {
                let key = window.event.keyCode;
                if(key ===13){
                    self.loginSys();
                }
            }
        },
        destroyed(){
            //销毁键盘事件
            document.onkeydown=null;
        }
    };
</script>

<style scoped lang="scss">
    .login-container {
        display: flex;
        height: 100%;
        justify-content: center;
        background-color: #F2F6FC;
        align-items: center;
    }

    .login-form-title {
        text-align: center;
        margin-bottom: 20px;
        font-size: 22px;
    }

    .login-form {
        position: relative;
        top: -60px;
        width: 400px;
        height: 475px;
        padding: 20px 40px 40px 40px;
        background-color: white;
        border-radius: 8px;
    }

    .login-btn {
        width: 100%;
    }

    .login-buttton-item {
        margin-bottom: 10px;
    }

    $login-font-size: 14px;
    .login-type {
        text-align: right;
        color: #877f7f;
        font-weight: 600;
        margin-bottom: 60px;
        font-size: $login-font-size;
        > a {
            &:hover {
                cursor: pointer;
            }
        }
    }

    .login-more-desc {
        text-align: center;
        font-size: $login-font-size;
        margin-bottom: 20px;
    }

    .login-social-logo {
        text-align: center;
    }

    .login-social-logo {
        @each $company in wechat, qq, weibo {
            > .#{$company}-logo {
                &:hover {
                    @if $company == wechat {
                        background-color: #58bc46;
                        cursor: pointer;
                    } @else if $company==qq {
                        background-color: #3caae3;
                        cursor: pointer;
                    } @else if $company == weibo {
                        background-color: #e90e24;
                        cursor: pointer;
                    }
                }
                > img {
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }
            }
        }
    }

    /**
    * 以下是微信扫码登录的样式
    **/
    .wx-saoma {
        text-align: center;
        margin-bottom: 20px;
    }

    .wx-tips1 {
        text-align: center;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .wx-tips2 {
        text-align: center;
        color: #969191;
        a {
            color: #3caae3;
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
