/**
 * Created by shunl.li on 2019/7/10.
 */
export default $axios => resource => ({
    //获取设备号
    getDeviceId() {
        return $axios.get(`/sign/deviceId`);
    },
    //发送验证码
    sendSmsCode(phone){
        return $axios.get(`/validate/code/loginSms?mobile=${phone}`);
    },
    /**
     * 通过用户密码登录
     * @param payload-{username,password}
     * @return {Q.Promise<any> | * | {} | void}
     */
    loginByPassWord(payload){
        return $axios.post(`/login`,payload);
    },
    /**
     * 通过短信验证码登录
     * @param payload-{smscode,mobile}
     * @return {Q.Promise<any> | * | {} | void}
     */
    loginBySmsCode(payload){
        return $axios.post(`/authentication/mobile`,payload);
    }

})
