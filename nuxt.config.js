export default {
    mode: "spa",
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            {charset: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || ""
            }
        ],
        link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {color: "#fff"},
    /*
     ** Global CSS
     */
    css: [
        "element-ui/lib/theme-chalk/index.css",
        "@/assets/css/main.css",
        "@/assets/css/font-awesome-4.7.0/css/font-awesome.min.css"
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        "@/plugins/element-ui",
        '@/plugins/axios',
        '@/plugins/repository'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: ['@nuxtjs/axios'],
    axios: {
        prefix: '/api/',
        proxy: true
    },
    proxy:{
        '/api/': {
            target:'http://119.3.20.238:8080/rubbish/',
            /**
             * 因为api是用来拦截代理的，api这个路径不存在，所以pathRewrite是把api给去除掉的
             */
            pathRewrite:{
                '^/api/':''
            }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        transpile: ['/^element-ui/', 'vue-echarts', 'resize-detector'],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
        }
    }
};
