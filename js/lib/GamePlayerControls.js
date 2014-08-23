define(function (require) {
    'use strict';

    var $ = require('jquery');

    function GamePlayerControls(gamePlayer) {
        this.gamePlayer = gamePlayer;
        this.renderLoading();
    }

    $.extend(GamePlayerControls.prototype, {

        initialize: function () {
            this.render();

            $('#game-player').on('click', this.clickListener.bind(this));
        },

        clickListener: function (evt) {
            var $button = $(evt.target),
                fps;

            // set parent to be the button from events
            // bubbling from font awesome icons
            if ($button.hasClass('fa')) {
                $button = $button.parent('button');
            }

            if ($button.hasClass('selectable')) {
                fps = $button.data('fps');

                $('.selectable').removeClass('selected');
                $button.addClass('selected');

                this.gamePlayer.setFPS(fps);
                return;
            }

            if ($button.hasClass('play-pause')) {
                if (this.gamePlayer.isPlaying) {
                    this.gamePlayer.pause();
                } else {
                    this.gamePlayer.start();
                }
                return;
            }

            if ($button.hasClass('stop')) {
                this.gamePlayer.stop();
                return;
            }

            if ($button.hasClass('forward')) {
                this.gamePlayer.forward();
                return;
            }

            if ($button.hasClass('backward')) {
                this.gamePlayer.backward();
            }
        },

        createButtonMarkup: function (side, fps) {
            var classes = ['btn', '{{side}}', 'selectable'];

            if (fps === this.gamePlayer.fps) {
                classes.push('selected');
            }

            return [
                    '<button class="' + classes.join(' ') + '" data-fps="{{fps}}">',
                        '{{fps}}',
                    '</button>'
                ].join('')
                .replace(/\{\{side\}\}/g, side)
                .replace(/\{\{fps\}\}/g, fps);
        },

        renderLoading: function () {
            $('#game-player').html('Loading');
        },

        render: function () {
            var isPlaying = this.gamePlayer.isPlaying,
                icon = (isPlaying ? 'pause' : 'play'),
                text = (isPlaying ? 'Pause' : 'Play');

            $('#game-player').html(
                '<button class="btn backward">' +
                    '<span class="fa fa-backward"></span>' +
                '</button>' +
                '<button class="btn play-pause">' +
                    '<span class="fa fa-' + icon + '"></span>' +
                    '&nbsp;' + text +
                '</button>' +
                '<button class="btn forward">' +
                    '<span class="fa fa-forward"></span>' +
                '</button>' +
                '<button class="btn stop">' +
                    '<span class="fa fa-stop"></span>' +
                    '&nbsp;Stop' +
                '</button>' +
                '<div class="fps">' +
                    '<span>FPS:&nbsp;</span>' +
                    this.createButtonMarkup('left', 15) +
                    this.createButtonMarkup('right', 30) +
                '</div>'
            );
        }
    });

    return GamePlayerControls;
});