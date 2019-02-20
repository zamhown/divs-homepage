
import scrawl from './scrawlCanvas';

export default function (ww, wh) {
    window.addEventListener('load', function() {
        scrawl.init();
        init_canvas();
    }, false);
    
    var init_canvas = function() {
        var here = { x: 0, y: 0 };
        var r = 100;
        var animationState = 0;
        var animationDirection = true;
    
        var radialGradient = scrawl.makeRadialGradient({
            name: 'spotlight',
            startRadius: 0,
            endRadius: r,
            color: [{
                color: 'rgba(0,0,0,0)',
                stop: 0
            }, {
                color: 'rgba(0,0,0,0)',
                stop: 0.8
            }, {
                color: 'rgba(0,0,0,0.2)',
                stop: 1
            }]
        });
    
        var gradient1 = scrawl.makeGradient({
            name: 'light1',
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            color: [{
                color: 'rgba(0,0,0,0.3)',
                stop: 0
            }, {
                color: 'rgba(0,0,0,0)',
                stop: 0.2
            }, {
                color: 'rgba(0,0,0,0)',
                stop: 0.8
            }, {
                color: 'rgba(0,0,0,0.3)',
                stop: 1
            }]
        });
    
        var gradient2 = gradient1.clone({
            name: 'light2'
        });
    
        var spotlight = scrawl.makeBlock({
            fillStyle: 'spotlight',
            method: 'fill',
            width: ww,
            height: wh,
            order: 1
        });
    
        var light1 = spotlight.clone({
            fillStyle: 'light1'
        });
    
        var light2 = spotlight.clone({
            fillStyle: 'light2'
        });
    
        scrawl.makeAnimation({
            fn: function() {
                changeParam();
    
                spotlight.set({ width: ww, height: wh });
                light1.set({ width: ww, height: wh });
                light2.set({ width: ww, height: wh });
    
                radialGradient.set({
                    startX: here.x,
                    startY: here.y,
                    endX: here.x,
                    endY: here.y,
                    endRadius: r
                });
    
                var v1 = getPerpendicularVector(here.x, here.y);
                gradient1.set({
                    startX: v1[0] * r,
                    startY: v1[1] * r,
                    endX: -v1[0] * r,
                    endY: -v1[1] * r
                });
    
                var v2 = getPerpendicularVector(here.x - ww, here.y);
                gradient2.set({
                    startX: v2[0] * r + ww,
                    startY: v2[1] * r,
                    endX: -v2[0] * r + ww,
                    endY: -v2[1] * r
                });
                scrawl.render();
            }
        });
    
        function changeParam() {
            var limit = 0;
            if (ww / wh >= 16 / 9) {
                limit = 0.3;
                r = ww / 10;
            } else {
                limit = (wh * 0.15) / (ww / 2);
                r = wh / 10;
            }
    
            here = { x: ww / 2 * (1 + animationState), y: wh / 5 * 3 };
            if (animationDirection) {
                animationState  += 0.02 * (0.1 + Math.abs(limit - Math.abs(animationState)));
            } else {
                animationState -= 0.02 * (0.1 + Math.abs(limit - Math.abs(animationState)));
            }
            if (Math.abs(animationState) > limit) {
                animationDirection = !animationDirection;
            }
        }
    
        function getPerpendicularVector(x, y) {
            var num = Math.sqrt(x * x + y * y);
            var v = [x / num, y / num];
            return [-v[1], v[0]];
        }
    };
}