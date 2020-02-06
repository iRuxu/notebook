const Setting = require("./public/setting.json");
const Config = require("./public/config.json");

module.exports = {
    productionSourceMap: false,
    outputDir: "docs",
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = Setting.meta.title
            args[0].meta = {
                'keywords': Setting.meta.keywords,
                'description': Setting.meta.description
            }
            return args
        });
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? Config.publicPath
    : '/'
};
