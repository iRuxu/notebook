module.exports = {
    //如果需要指定特殊的项目名称，请在此指定
    //name: "your_project",
    //配置文件的版本，和silky的版本无关
    version: 0.2,
    //80端口在*nix下需要sudo
    port: 14422,
    //使用兼容模式，即可以兼容0.5.5之前的silky项目
    compatibleModel: true,
    //代理配置相关，兼容json-proxy的代理配置
    proxy: {
        forward: {
            //定义代理转发
            //"/ajax": "/"
        }
    },
    //路由
    routers: [],
    //插件的配置
    plugins: {
      /*"honey": {},
      "honey-preview": {
        "server": "108"
      },*/
      "autoprefix":{},
      //用于上传示例图片的插件
      "honey-image-demo-upload": {}
    },
    //build的配置
    build: {
        //构建的目标目录，命令行指定的优先
        output: "./",
        //将要复制的文件目录，直接复制到目标
        copy: [],
        //完全忽略处理的文件
        ignore: [/^.git$/,/^module$/,/^css$/,/^font$/,/^image$/,/^js$/,/^temp$/],
        //重命名
        rename: [],
        //是否压缩
        compress: {
            //将要忽略压缩的文件
            ignore: [],
            //压缩js，包括coffee
            js: true,
            //压缩css，包括less
            css: true,
            //压缩html
            html: false,
            //是否压缩internal的js
            internal: true
        }
    }
}
