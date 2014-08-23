define(function (require) {
    'use strict';

    var $ = require('jquery'),
        Game = require('Game'),
        GamePlayerControls = require('GamePlayerControls');

    function frameRenderer() {
        this.renderCurrentFrame();

        if (this.currentFrame === this.frameCount) {
            this.stop();
        } else {
            // go to next frame and render it
            this.currentFrame += 1;
            this.play();
        }
    }

    function GamePlayer($canvas, $legend) {
        this.fps = 30;

        this.timeout = undefined;
        this.isPlaying = false;
        this.frameCount = 0;
        this.currentFrame = 0;

        this.game = new Game();
        this.$legend = $legend;
        this.$canvas = $canvas;
        this.context = $canvas[0].getContext('2d');

        this.frameRenderer = frameRenderer.bind(this);

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

            this.renderLegend();
            this.renderCurrentFrame();
        },

        setFPS: function (fps) {
            this.fps = fps;
        },

        renderLegend: function () {
            var players = this.game.getPlayers(),
                items = [],
                player,
                i;

            for (i in players) {
                player = players[i];
                items.push(
                    '<div class="item">',
                        '<span style="background-color:' + player.getColor() + ';"></span>',
                        player.getName(),
                    '</div>'
                );
            }

            this.$legend.html(
                items.join('')
            );
        },

        renderCurrentFrame: function () {
            this.game.renderFrame(this.context, this.currentFrame);
        },

        jumpFrameBy: function (count) {
            var nextFrame = this.currentFrame + count;

            this.pause();

            if (nextFrame < 0) {
                nextFrame = 0;
            } else if (nextFrame > (this.frameCount - 1)) {
                nextFrame = this.frameCount - 1;
            }
            this.currentFrame = nextFrame;

            this.renderCurrentFrame();
        },

        forward: function () {
            this.jumpFrameBy(1);
        },

        backward: function () {
            this.jumpFrameBy(-1);
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

    return GamePlayer;
});