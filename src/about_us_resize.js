/* eslint-disable no-unused-vars, no-undef */

export default function(ww) {
    var $photo = $('#about-us img.photo');
    var $about_us = $('#about-us');
    var $about_us_border = $about_us.find('.border');
    var $about_us_text = $about_us.find('.text');
    var $about_us_title = $about_us.find('.title');
    var photo_height = $photo.width() / 789 * 591;
    if (ww <= 700) {
        $photo.css('bottom', -photo_height * 0.4 + 'px');
        $about_us.css('padding-bottom', '0px');
        var text_top = photo_height * 1.4 + 60;
        $about_us_text.css({
            top:text_top + 'px',
            width: ''
        });
        $about_us_border.css({
            'height': photo_height + 40 + 'px',
            'padding-right': ''
        });
        $about_us.css('height', text_top + $about_us_text.height() + 40 + 'px');
        $about_us_title.css('top', '');
    } else if (ww > 700 && ww <= 1150) {
        var eleSpan = ($about_us.height() - photo_height - $about_us_title.height()) / 3;

        $photo.css('bottom', eleSpan + 'px');
        $about_us.css('padding-bottom', '80px');
        $about_us_text.css({
            top: 'auto',
            width: ww > 900?
                $about_us_border.width() - 100 - $photo.width() - 50 + 'px'
                : $about_us_border.width() - 50 - $photo.width() - 50 + 'px'
        });
        $about_us_border.css({
            'height': 'auto',
            'padding-right' : ww > 900 ? '100px' : ''
        });
        $about_us.css('height', 'auto');
        $about_us_title.css('top', eleSpan + 'px');
    }else{
        $photo.css('bottom', -photo_height / 2 + 'px');
        $about_us.css('padding-bottom', photo_height / 2 + 50 + 'px');
        $about_us_text.css({
            top: 'auto',
            width: $about_us_border.innerWidth() * 0.85 - 150 - $photo.width() - 50 * 2 + 'px'
        });
        $about_us_border.css({
            'height': 'auto',
            'padding-right': ($about_us_border.innerWidth() * 0.85 - 150 - $photo.width() - $about_us_text.width()) / 2 + 'px'
        });
        $about_us.css('height', 'auto');
        $about_us_title.css('top', ($about_us.height() - 8 - photo_height / 2 - $about_us_title.height()) / 2 + 'px');
    }
}