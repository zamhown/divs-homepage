/* eslint-disable no-unused-vars, no-undef */

//判断浏览器种类
function browser() {
    if (!!window.ActiveXObject || 'ActiveXObject' in window)
        return 'IE';  //判断是否IE浏览器
    var userAgent = navigator.userAgent;  //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf('Opera') > -1;
    if (isOpera) {
        return 'Opera';
    }  //判断是否Opera浏览器
    if (userAgent.indexOf('Edge') > -1) {
        return 'Edge';
    }  //判断是否Edge浏览器
    if (userAgent.indexOf('Firefox') > -1) {
        return 'FF';
    }  //判断是否Firefox浏览器
    if (userAgent.indexOf('Chrome') > -1){
        return 'Chrome';
    }
    if (userAgent.indexOf('Safari') > -1) {
        if(userAgent.indexOf('Windows') > -1) {
            return 'Safari for Win';
        }
        return 'Safari';
    }  //判断是否Safari浏览器
    if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
        return 'IE';
    }  //判断是否IE浏览器
}

//判断是否在微信打开
function isWeChat() {
    var u = navigator.userAgent;
    return u.indexOf('MicroMessenger') > -1;
}

var browserType = browser();

export default {
    root_font_size: 16,
    browserType: browserType,
    weChat: isWeChat(),
    //是否可以播放canvas动画
    canPlayCanvas: function () {
        return Modernizr.canvas;
    },
    //是否可以播放bodymovin动画
    canPlayBodymovin: function () {
        return this.browserType !== 'IE' && this.browserType !== 'Edge';
    },
    //是否可以播放视频
    canPlayVideo: function () {
        return Modernizr.video;
    },
    //彩蛋
    paintedEggshell() {
        /*eslint no-console: ["error", { allow: ["log", "info"] }] */
        if (browserType === 'Chrome' || browserType === 'FF') {
            console.log('%cDEEP%c深度映像工作室%c\n%c  ©2017 by DEEP IMAGING VISION STUDIO  ',
                'color:white;background:#B5916F;padding:10px;font-size:24px;line-height:44px',
                'color:white;background:#231F20;padding:10px;font-size:24px;line-height:44px',
                'padding:0px',
                'color:white;background:#666;padding:2px;font-size:12px;line-height:20px'
            );
        } else {
            console.info('©2017 by DEEP IMAGING VISION STUDIO');
        }
        if(browserType === 'Edge') {
            console.info('Windows 10 is awesome, right? -From the developer');
        }
    },
    //获得滚动条宽度
    getScrollbarWidth() {
        var oP = document.createElement('p'),
            styles = {
                width: '100px',
                height: '100px',
                overflowY: 'scroll'
            }, i, scrollbarWidth;
        for (i in styles) oP.style[i] = styles[i];
        document.body.appendChild(oP);
        scrollbarWidth = oP.offsetWidth - oP.clientWidth;
        if (oP.remove) {
            oP.remove();
        } else {
            document.body.removeChild(oP);
        }
        return scrollbarWidth;
    }
};