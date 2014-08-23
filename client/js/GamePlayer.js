/* global: jQuery, strategypy */
(function ($, Game, GamePlayerControls) {

    function GamePlayer($canvas, game) {
        this.fps = 30;
        this.isPlaying = false;
        this.frameCount = 0;
        this.currentFrame = 0;
        this.game = new Game();
        this.$canvas = $canvas;
        this.controls = new GamePlayerControls(this);
        this.controls.initialize();
    }

    $.extend(GamePlayer.prototype, {

        initialize: function (data) {
            var width = this.$canvas.width(),
                height = this.$canvas.height();

            this.frameCount = data.frames.length;

            this.controls.render();

            this.game.initialize(data, width, height);
            this.game.renderFrame(this.getGameContext(), 0);
        },

        getGameContext: function () {
            return this.$canvas[0].getContext('2d');
        },

        setFPS: function (fps) {
            this.fps = fps;
        },

        renderFrame: function (context) {
            this.game.renderFrame(context, this.currentFrame);
        },

        resume: function () {
            // TODO
        },

        pause: function () {
            // TODO
        },

        reset: function (fps) {
            if (fps) {
                this.setFPS(fps);
            }

            this.currentFrame = 0;
        },

        play: function () {
            var context = this.getGameContext();

            if (!this.isPlaying) {
                this.isPlaying = true;

                // TODO: change to setTimeout for pause/resume and frame switching
                this.interval = setInterval(function () {
                    this.renderFrame(context);

                    if (this.currentFrame === this.frameCount) {
                        // end replay
                        clearInterval(this.interval);

                        this.isPlaying = false;
                        this.currentFrame = 0;

                        this.controls.render();
                    } else {
                        // go to next frame
                        this.currentFrame += 1;
                    }
                }.bind(this), 1000 / this.fps);

                this.controls.render();
            }
        }

    });

    strategypy.GamePlayer = GamePlayer;

}(
    jQuery,
    strategypy.Game,
    strategypy.GamePlayerControls
));