<template>
    <footer class="c-footer">
        <img
            :class="{ active: QRstatus }"
            class="c-footer-qrcode"
            src="/img/qrcode.jpg"
        />
        <p class="c-footer-links">
            <a
                v-for="(info, key) in social"
                :href="info.url"
                :title="info.title"
                target="_blank"
                @click="showQRcode(key, $event)"
                :key="key"
            >
                <i :class="'u-icon u-icon-' + key"></i>
            </a>
        </p>
        <p class="c-footer-copyright">
            &copy;{{ copyright.time }}
            <a :href="copyright.url" target="_blank">{{ copyright.site }}</a>
        </p>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    data: function() {
        return {
            social: this.$root.setting.footer.social,
            copyright: this.$root.setting.footer.copyright,
            QRstatus: false
        };
    },
    methods: {
        showQRcode: function(key, e) {
            if (key == "wechat") {
                e.preventDefault();
                this.QRstatus = !this.QRstatus;
            }
        }
    }
};
</script>

<style lang="less">
@import '../assets/css/var.less';
.c-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 25px;
    font-size: 12px;
}
.c-footer-qrcode {
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 180px;
    margin: 0 30px 10px 30px;
    border: 1px solid #eee;
    border-radius: 4px;

    transform: translateX(-150%);
    transition:0.2s ease-in-out;
    &.active {
        transform: translateX(0);
    }
}
.c-footer-copyright {
    a {
        color: @link;
    }
    a:hover {
        color: @pink;
        box-shadow: 0 1px 0 @pink;
    }
}
.c-footer-links {
    a {
        padding: 0 9px;
    }
    .u-icon-email {
        width: 12px;
        height: 12px;
    }
    .u-icon-weibo {
        width: 12px;
        height: 12px;
    }
    .u-icon-wechat {
        width: 12px;
        height: 12px;
    }
    margin-bottom: 8px;
}
</style>
