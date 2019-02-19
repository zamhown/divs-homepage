/* eslint-disable no-unused-vars, no-undef */

import frame from './frame';

export default new Vue({
    el: 'footer',
    data: {
        //带有滚动条的窗口宽度
        ww: 0,
        //是否是移动设备
        isMobile: device.mobile(),
        //是否是平板设备
        isTablet: device.tablet(),
        //是否是微信环境
        isWeChat: frame.weChat,
        //鼠标是否在qq链接上
        qq_img_active: false,
        //鼠标是否在微信链接上
        wechat_img_active: false,
        //鼠标是否在微博链接上
        weibo_img_active: false
    },
    computed: {
        showQRCodeContainer: function () {
            return this.ww > 680 && !this.isTablet;
        },
        qq_link: function () {
            var qq = '244120998';  //此处写联系人的QQ号
            if (this.isWeChat) {
                return '#wechat-failed';
            }
            if(this.isMobile || this.isTablet) {
                return 'mqqwpa://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web&web_src=zamhown.github.io';
            } else {
                return 'tencent://message/?uin=' + qq + '&Site=zamhown.github.io&Menu=yes';
            }
        }
    }
});