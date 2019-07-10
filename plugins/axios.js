/**
 * Created by shunl.li on 2019/7/10.
 */
export default function ({$axios, redirect, store}) {

    // $axios.default.timeout = 500;
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    });
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        if (code === 400) {
            redirect('/error/400')
        }
        if (code === 500) {
            redirect('/error/500')
        }
        if (code === 401) {
            redirect('/error/401')
        }
    });

    /**
     * 拦截请求
     */
    $axios.interceptors.request.use(config => {
        config.headers.common['Content-Type'] = 'application/json;charset=utf8'
        config.headers.common['channel'] = 'web'
        if (store.getters.accessToken) {
            config.headers.common['Authorisation'] = `Token ${store.getters.accessToken}`
            console.log(config.headers.common['Authorisation'])
        }
        if (store.getters.deviceId) {
            config.headers.common['deviceId'] = `${store.getters.deviceId}`
        }

        return config;
    }, error => {
        return Promise.reject(error)
    });

    /**
     * 拦截响应
     */
    $axios.interceptors.response.use(
        response => {
            return response
        },
        error => {
            return Promise.reject(error);
        }
    )
}
