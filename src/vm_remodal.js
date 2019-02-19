/* eslint-disable no-unused-vars, no-undef */

import frame from './frame';

export default new Vue({
    el: '.remodal',
    data: {
        //是否是微信环境
        isWeChat: frame.weChat
    }
});