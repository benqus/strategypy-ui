/* global: jQuery, strategypy */
(function ($, Game, GamePlayerControls) {

    function GamePlayer($canvas) {
        this.fps = 30;

        this.timeout = undefined;
        this.isPlaying = false;
        this.frameCount = 0;
        this.currentFrame = 0;

        this.game = new Game();
        this.$canvas = $canvas;
        this.context = $canvas[0].getContext('2d');

        this.frameRenderer = function () {
            this.renderCurrentFrame();

            if (this.currentFrame === this.frameCount) {
                this.stop();
            } else {
                // go to next frame and render it
                this.currentFrame += 1;
                this.play();
            }
        }.bind(this);

        this.controls = new GamePlayerControls(this);
    }

    $.extend(GamePlayer.prototype, {

        initialize: function (data) {
            var width = this.$canvas.width(),
                height = this.$canvas.height();

            this.frameCount = data.frames.length;

            this.controls.initialize();
            this.controls.render();

            this.game.initialize(data, width, height);
            this.renderCurrentFrame();
        },

        setFPS: function (fps) {
            this.fps = fps;
        },

        renderCurrentFrame: function () {
            this.game.renderFrame(this.context, this.currentFrame);
        },

        pause: function () {
            clearTimeout(this.timeout);
            this.isPlaying = false;
            this.controls.render();
        },

        stop: function () {
            clearTimeout(this.timeout);
            this.isPlaying = false;
            this.currentFrame = 0;
            this.renderCurrentFrame();
            this.controls.render();
        },

        start: function () {
            this.play();
            this.controls.render();
        },

        play: function () {
            this.isPlaying = true;
            this.timeout = setTimeout(this.frameRenderer, 1000 / this.fps);
        }
    });

    strategypy.GamePlayer = GamePlayer;

}(
    jQuery,
    strategypy.Game,
    strategypy.GamePlayerControls
));