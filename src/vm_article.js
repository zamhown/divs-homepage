/* eslint-disable no-unused-vars, no-undef */

import frame from './frame';
import about_us_resize from './about_us_resize';

var vm_article = new Vue({
    el: 'article',
    data: {
        //带有滚动条的窗口宽度
        ww: 0,
        //窗口高度
        wh: 0,
        //不带滚动条的窗口宽度
        inner_ww: 0,
        scrollTop: 0,
        browserType: frame.browserType,
        //是否是移动设备
        isMobile: device.mobile(),
        //是否是平板设备
        isTablet: device.tablet(),
        //背景视频的总长度
        bg_video_duration: 0,
        //背景视频的加载进度
        bg_video_progress: 0,
        //作品预览视频的总长度
        artwork_video_duration: [0,0],
        //作品预览视频的加载进度
        artwork_video_progress: [0,0],
        //鼠标是否在screen1右侧区域上
        screen1_right_hover: false,
        //“关于我们”文字介绍是否折叠
        about_us_text_fold: true,
        //“关于我们”文字介绍最后一段是否显示
        about_us_last_p_shown: false,
        //鼠标是否在“关于我们”的照片上
        about_us_photo_active: false,
        //“关于我们”是否已经显示过一次
        about_us_active_flag: false,
        //“团队”成员介绍随机显示的id
        member_highlight_index: -1,
        //“团队”成员介绍随机显示的timer
        member_highlight_timer: null,
        //鼠标是否在“团队”成员介绍上
        member_hover: false,
        //留言字段
        comment: {
            name: '',
            email: '',
            tel: '',
            text: ''
        },
        //留言反馈信息状态
        comment_submit_info_state: 0
    },
    computed: {
        //是否是移动版视图
        isMobileView: function () {
            return this.ww <= 500;
        },
        //是否可以播放canvas动画
        canPlayCanvas: function () {
            return frame.canPlayCanvas();
        },
        //是否可以播放bodymovin动画
        canPlayBodymovin: function () {
            return frame.canPlayBodymovin();
        },
        //是否可以播放视频
        canPlayVideo: function () {
            return frame.canPlayVideo();
        },
        whStyle: function () {
            return {height: this.wh + 'px'};
        },
        bgVideoStyle: function () {
            //IE下背景视频的缩放
            if (this.browserType === 'IE' || this.browserType === 'Edge') {
                if (this.ww / this.wh >= 16 / 9) {
                    return {
                        width: '100%',
                        height: 'auto',
                        left: '0px',
                        top: (this.wh - this.ww / 16 * 9) / 2 + 'px'
                    };
                } else {
                    return {
                        width: 'auto',
                        height: '100%',
                        left:(this.ww - this.wh / 9 * 16) / 2 + 'px',
                        top: '0px'
                    };
                }
            }
        },
        screen1Style: function () {
            var style = {};
            if (this.scrollTop < this.wh) {
                var o = 0.35 + 0.75 * this.scrollTop / this.wh;
                style.backgroundColor = 'rgba(0,0,0,' + o + ')';
            }
            return style;
        },
        aboutUsTextLastPStyle: function () {
            var style = {};
            if (this.isMobileView) {
                if (this.about_us_text_fold) {
                    style.position = 'absolute';
                    style.marginTop = '0';
                } else {
                    style.position = 'relative';
                }

                if (this.about_us_last_p_shown) {
                    style.opacity = '1';
                } else {
                    style.opacity = '0';
                }
            }
            return style;
        },
        aboutUsTextLastButOnePStyle: function () {
            var style = {};
            if (this.isMobileView) {
                if (this.about_us_text_fold) {
                    style.paddingBottom = '50px';
                }
            }
            return style;
        },
        aboutUsArrowStyle: function () {
            var style = {};
            if (this.isMobileView) {
                if (this.about_us_text_fold) {
                    style.bottom = '25px';
                } else {
                    style.bottom = '5px';
                }
            }
            return style;
        },
        aboutUsArrowImgStyle: function () {
            var style = {};
            if (this.isMobileView) {
                if (this.about_us_text_fold) {
                    style.marginTop = '30px';
                } else {
                    style.marginTop = '10px';
                    style.transform = 'rotate(180deg)';
                }
            }
            return style;
        },
        aboutUsActiveFirstTime: function () {
            if (this.about_us_active_flag) return false;
            const photo = $('#about-us .photo');
            const top = photo.offset().top;
            const re = this.scrollTop > top - this.wh / 2 && this.scrollTop < top + photo.height();
            if (re) this.about_us_active_flag = true;
            return re;
        },
        memberClass: function () {
            var result = [];
            for(var i = 0; i < $('#team .member').length; i++) {
                result.push({'hover': !this.isMobileView && !this.member_hover && this.member_highlight_index === i});
            }
            return result;
        },
        teamBlockStyle: function () {
            return {
                top: -60 - ($('#team .member').eq(0).offset().top - this.wh / 2 - this.scrollTop) / 20 + 'px'
            };
        }
    },
    watch: {
        comment: {
            deep: true,
            handler: function () {
                this.comment_submit_info_state = 0;
            }
        }
    },
    methods: {
        bgVideoInit: function (e) {
            this.bg_video_duration = e.target.duration;
        },
        bgVideoLoadProgress: function (e) {
            var bg_video = e.target;
            if (this.bg_video_duration > 0) {
                var buffered = 0;
                for(var i = 0; i < bg_video.buffered.length; i++) {
                    buffered += (bg_video.buffered.end(i) - bg_video.buffered.start(i));
                }
                if (buffered) {
                    var progress = Math.floor(buffered / this.bg_video_duration * 100);
                    if (progress>this.bg_video_progress) {
                        this.bg_video_progress = progress;
                    }
                    if (this.bg_video_progress === 100) {
                        $('#bg-video-progress').fadeOut();
                        // bg_video.play();
                    }
                }
            }
        },
        artworkVideoInit: function (index, e) {
            this.artwork_video_duration[index] = e.target.duration;
        },
        artworkVideoLoadProgress: function (index, e) {
            var artwork_video = e.target;
            if (this.artwork_video_duration[index] > 0) {
                var buffered = 0;
                for(var i = 0; i < artwork_video.buffered.length; i++) {
                    buffered += (artwork_video.buffered.end(i) - artwork_video.buffered.start(i));
                }
                if (buffered) {
                    var progress = Math.floor(buffered / this.artwork_video_duration[index] * 100);
                    if (progress > this.artwork_video_progress[index]) {
                        this.artwork_video_progress[index] = progress;
                    }
                    if (this.artwork_video_progress[index] === 100) {
                        $('.artwork-' + (index + 1) + ' .video-progress').fadeOut();
                        // artwork_video.play();
                    }
                }
            }
        },
        navTo: function (id) {
            $('html,body').animate({scrollTop: $('section').eq(id + 1).offset().top - 40 + 'px'}, 500);
        },
        members_mouse_enter: function () {
            this.member_hover = true;
            clearInterval(this.member_highlight_timer);
        },
        members_mouse_leave: function () {
            this.member_hover = false;
            this.member_highlight_timer = set_member_highlight_timer();
        },
        member_mouse_enter: function (index) {
            this.member_highlight_index = index;
        },
        member_click: function (index) {
            clearInterval(this.member_highlight_timer);
            this.member_highlight_index = index;
            this.member_highlight_timer = set_member_highlight_timer(5000);
        },
        aboutUsTextArrowClick: function () {
            this.about_us_text_fold = !this.about_us_text_fold;
            var show_state = this.about_us_last_p_shown;
            if (show_state) {
                this.about_us_last_p_shown = false;
            }
            //const self = this;
            //setTimeout里的函数，如果是lambda表达式则this可用，如果是function()匿名函数则this不可用！
            setTimeout(() => {
                if (!show_state) {
                    this.about_us_last_p_shown = true;
                }
                about_us_resize(this.ww);
            },200);
        },
        addComment: function () {
            if (!this.comment.text) {
                this.comment_submit_info_state = 1;
            }
            if (this.comment_submit_info_state === 0 || this.comment_submit_info_state === 3) {
                if (confirm('【此为测试功能】\n'
                + 'name: ' + this.comment.name + '\n'
                + 'email: ' + this.comment.email + '\n'
                + 'tel: ' + this.comment.tel + '\n'
                + 'text: ' + this.comment.text + '\n'
                + '确定返回提交成功状态吗？')) {
                    this.comment_submit_info_state = 2;
                } else {
                    this.comment_submit_info_state = 3;
                }
            }
        }
    },
    created: function () {
        this.member_highlight_timer = set_member_highlight_timer();
    }
});

function set_member_highlight_timer (timeSpan) {
    return setInterval(function () {
        var newIndex = Math.floor(Math.random() * 6);
        while (newIndex === vm_article.member_highlight_index) {
            newIndex = Math.floor(Math.random() * 6);
        }
        vm_article.member_highlight_index = newIndex;
    }, timeSpan ? timeSpan : 2000);
}

export default vm_article;