/* eslint-disable no-unused-vars, no-undef */

import go1 from '../assets/animation/gopro-1.json';
import go2 from '../assets/animation/gopro-2.json';
import lottie from 'lottie-web/build/player/lottie_light';

export default function () {
    //GOPRO字体动画，两段动画交替播放
    var $container1 = $('#artworks .artwork-1 .svg-animation-1');
    var $container2 = $('#artworks .artwork-1 .svg-animation-2');
    var an1 = lottie.loadAnimation({
        //path: 'assets/animation/gopro-1.json',
        animationData: go1,
        loop: false,
        autoplay: false,
        renderer: 'svg',
        container: $container1[0]
    });
    var an2 = lottie.loadAnimation({
        //path: 'assets/animation/gopro-2.json',
        animationData: go2,
        loop: true,
        autoplay: false,
        renderer: 'svg',
        container: $container2[0]
    });
    var isAn2Stop = true;
    $container2.hide();
    an1.onComplete = function() {
        an1.stop();
        $container2.show();
        $container1.hide();
        isAn2Stop = false;
        an2.play();
    };
    an2.onEnterFrame = function (e) {
        if (e.currentTime < 1 && !isAn2Stop) {
            isAn2Stop = true;
            an2.stop();
            $container1.show();
            $container2.hide();
            an1.play();
        }
    };
    an2.setDirection(-1);
    an1.play();
}