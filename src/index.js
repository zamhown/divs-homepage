/* eslint-disable no-unused-vars, no-undef */

import './styles/public.css';
import './styles/layout.css';
import './styles/remodal.css';
import './styles/remodal-theme.css';
import './styles/font.css';
import './styles/index.css';

import frame from './frame';
import vm_header from './vm_header';
import vm_footer from './vm_footer';
import vm_article from './vm_article';
import vm_remodal from './vm_remodal';
import about_us_resize from './about_us_resize';
import lottie_animate from './lottie_animate';

var resizeHooks = [];

function resize(first) {
    resizeHook($(window).width() + frame.getScrollbarWidth(), $(window).height(), first);
    setTimeout(function() {
        resizeHook($(window).width() + frame.getScrollbarWidth(), $(window).height(), first);
    }, 500);

    function resizeHook(ww, wh, first) {
        resizeHooks.forEach(function(e) {
            e(ww, wh, first);
        });
    }
}

function updateScrollTop() {
    vm_header.scrollTop = $(window).scrollTop();
}

resizeHooks.push(function(ww, wh) {
    vm_header.ww = ww;
    vm_header.wh = wh;
    vm_header.screen_wh = window.screen.availHeight;

    vm_footer.ww = ww;
});

resizeHooks.push(function(ww, wh) {
    vm_article.ww = ww;
    vm_article.wh = wh;
    vm_article.inner_ww = $(window).width();

    //调整“作品”布局
    var $a1 = $('#artworks .artwork-1');
    var bigHeight = $a1.width();
    var normalHeight = bigHeight / 2;
    $a1.css('height', bigHeight + 'px');
    var $a2 = $('#artworks .artwork-2');
    $a2.css('height', normalHeight + 'px');
    var $a3 = $('#artworks .artwork-3');
    $a3.css('height', normalHeight + 'px');
    var $a4 = $('#artworks .artwork-4');
    $a4.css('height', normalHeight + 'px');

    //调整“关于我们”布局
    about_us_resize(ww);

    //调整“团队”照片宽高
    var $member = $('#team .member');
    var member_width = $member.width();
    $member.css('height', member_width + 'px');
    $('#team .member img').css('width', member_width + 'px');

    //调整“团队”成员介绍字体的大小
    var $member_detail = $('#team .detail p');
    var text_font_size = Math.min((member_width - 60) / 16, frame.root_font_size);
    $member_detail.css({
        fontSize:text_font_size + 'px',
        lineHeight:text_font_size * 1.6 + 'px'
    });

    //调整“团队”成员姓名字体的大小
    var name_font_size = Math.min(member_width / 3 / 3, frame.root_font_size * 2);
    $('#team .detail h2').css({
        fontSize:name_font_size + 'px'
    });
    $('#team .detail .line').css({
        width:name_font_size + 'px',
        height:name_font_size + 'px',
        top:name_font_size/2 + 'px'
    });

    //调整“联系”布局
    var $contact_left_content = $('#contact .left .content');
    $contact_left_content.css({'top': ($contact_left_content.parent().height() - $contact_left_content.height()) / 2});
});

$(function() {
    frame.paintedEggshell();

    resize(true);
    $(window).resize(function() {
        resize(false);
    });

    updateScrollTop();
    $(window).scroll(function() {
        updateScrollTop();
    });
    $(window).load(function() {
        updateScrollTop();
    });

    $('img').attr({
        'ondragstart': 'return false;',
        'border': 0
    });
});

$(function() {
    $(window).scroll(function() {
        vm_article.scrollTop = $(this).scrollTop();
    });
    //GOPRO字体动画
    lottie_animate();
    //移动端canvas聚光灯动画（懒加载）
    if (device.mobile()) {
        import(
            /* webpackChunkName: "scrawl_canvas_animate" */
            './scrawl_canvas_animate')
            .then(scrawl_canvas_animate => scrawl_canvas_animate.default(vm_article.ww, vm_article.wh));
    }
});