// using with vue-i18n in CDN
/*eslint-disable */
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;

export default function (lang) {
    if (!isServer) {
        if (typeof window.bcvvui !== 'undefined') {
            if (!('langs' in bcvvui)) {
                bcvvui.langs = {};
            }
            bcvvui.langs[lang.i.locale] = lang;
        }
    }
};
/*eslint-enable */
