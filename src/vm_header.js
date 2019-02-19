/* eslint-disable no-unused-vars, no-undef */

export default new Vue({
    el: 'header',
    data: {
        //带有滚动条的窗口宽度
        ww: 0,
        //窗口高度
        wh: 0,
        //屏幕高度
        screen_wh: 0,
        scrollTop: 0,
        //是否展开菜单
        expandNav: false,
        //板块位置定位时的偏差
        stOffset: 100
    },
    computed: {
        isMobileViewOrPadView: function () {
            return this.ww <= 800;
        },
        navStyle: function () {
            var style = {};
            if (this.ww <= 800) {
                style.height = this.screen_wh + 'px';
                if (this.ww <= 500) {
                    style.width = this.ww + 'px';
                }
            }
            return style;
        },
        navLiClass1: function () {
            return {'active': this.scrollTop <= this.navScrollTop1()};
        },
        navLiClass2: function () {
            return {'active': this.scrollTop > this.navScrollTop1() && this.scrollTop <= this.navScrollTop2()};
        },
        navLiClass3: function () {
            return {'active': this.scrollTop > this.navScrollTop2() && this.scrollTop <= this.navScrollTop3()};
        },
        navLiClass4: function () {
            return {'active': this.scrollTop > this.navScrollTop3()};
        }
    },
    methods: {
        iconMenuClick: function () {
            this.expandNav = !this.expandNav;
            if (this.expandNav) {
                $('header nav').stop().slideDown(300);
            } else {
                $('header nav').stop().slideUp(300);
            }
        },
        navTo: function(id) {
            $('html,body').animate({scrollTop: $('section').eq(id + 1).offset().top - 40 + 'px'}, 500);
            if (this.isMobileViewOrPadView) {
                this.expandNav = false;
                $('header nav').stop().slideUp(300);
            }
        },
        navScrollTop1: function () {
            return Math.max($('#artworks').offset().top - this.stOffset, this.wh - this.stOffset);
        },
        navScrollTop2: function () {
            return $('#about-us').offset().top - this.stOffset;
        },
        navScrollTop3: function () {
            return $('#contact').offset().top - this.stOffset - 100;
        }
    }
});