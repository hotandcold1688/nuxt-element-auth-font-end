/**
 * Created by shunl.li on 2019/7/10.
 * 需要将api注入$axios
 */
import login from '~/api/login'

export default ({$axios}, inject) => {
    const loginWithAxios = login($axios)
    inject('loginApi', loginWithAxios('/'))
}
