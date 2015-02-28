module.exports = {
    "title": "Silky",
    "root": "",
    "subtitle": "这里是全局调用，通过<b>_.global.subtitle可以调用</b>",
    "keyword": "keyword",
    "description": "description",
    "footer": {
        "copyright": "HunanTV.com"
    },
    "linkCSS": {
        "baseUrl": "<global.root>/css/",
        "dir": "/css",
        "match": /\.css|less$/,
        path: /(less)$/,
        to: 'css'
    },
    func: function(){
        return [
            Math.random(),
            Math.random()
        ]
    }
}