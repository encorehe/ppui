// using with vue-i18n in CDN
/*eslint-disable */
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;

export default function (lang) {
    if (!isServer) {
        if (typeof window.bcui !== 'undefined') {
            if (!('langs' in bcui)) {
                bcui.langs = {};
            }
            bcui.langs[lang.i.locale] = lang;
        }
    }
};
/*eslint-enable */
