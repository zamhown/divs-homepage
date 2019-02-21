
import scrawl from './scrawlCanvas';

export default {
    init () {
        scrawl.init();
    },
    
    radialGradient: null,
    gradient1: null,
    gradient2: null,
    spotlight: null,
    light1: null,
    light2: null,
    animation: null,

    draw (ww, wh) {
        if (this.radialGradient) {
            // 清空
            this.animation.kill();
            this.radialGradient.remove();
            this.gradient1.remove();
            this.gradient2.remove();
            scrawl.deleteEntity([
                'spotlightBlock',
                'lightBlock1',
                'lightBlock2'
            ]);
            this.radialGradient = null;
        }

        var here = { x: 0, y: 0 };
        var r = 100;
        var animationState = 0;
        var animationDirection = true;
    
        this.radialGradient = scrawl.makeRadialGradient({
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
    
        this.gradient1 = scrawl.makeGradient({
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
    
        this.gradient2 = this.gradient1.clone({
            name: 'light2'
        });
    
        this.spotlight = scrawl.makeBlock({
            name: 'spotlightBlock',
            fillStyle: 'spotlight',
            method: 'fill',
            width: ww,
            height: wh,
            order: 1
        });
    
        this.light1 = this.spotlight.clone({
            name: 'lightBlock1',
            fillStyle: 'light1'
        });
    
        this.light2 = this.spotlight.clone({
            name: 'lightBlock2',
            fillStyle: 'light2'
        });
    
        const self = this;
        this.animation = scrawl.makeAnimation({
            fn: function() {
                changeParam();
    
                self.spotlight.set({ width: ww, height: wh });
                self.light1.set({ width: ww, height: wh });
                self.light2.set({ width: ww, height: wh });
    
                self.radialGradient.set({
                    startX: here.x,
                    startY: here.y,
                    endX: here.x,
                    endY: here.y,
                    endRadius: r
                });
    
                var v1 = getPerpendicularVector(here.x, here.y);
                self.gradient1.set({
                    startX: v1[0] * r,
                    startY: v1[1] * r,
                    endX: -v1[0] * r,
                    endY: -v1[1] * r
                });
    
                var v2 = getPerpendicularVector(here.x - ww, here.y);
                self.gradient2.set({
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
    }
};