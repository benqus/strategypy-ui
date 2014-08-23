define(function (require) {
    'use strict';

    var $ = require('jquery');

    function GamePlayerControls(gamePlayer) {
        this.gamePlayer = gamePlayer;
    }

    $.extend(GamePlayerControls.prototype, {

        initialize: function () {
            this.render(this.isPlaying);

            $('#game-player').on('click', this.clickListener.bind(this));
        },

        clickListener: function (evt) {
            var $target = $(evt.target),
                fps;

            if ($target.hasClass('selectable')) {
                fps = $target.data('fps');

                $('.selectable').removeClass('selected');
                $target.addClass('selected');

                this.gamePlayer.setFPS(fps);
            }

            if ($target.hasClass('play-pause')) {
                if (this.gamePlayer.isPlaying) {
                    this.gamePlayer.pause();
                } else {
                    this.gamePlayer.start();
                }
            }

            if ($target.hasClass('stop')) {
                this.gamePlayer.stop();
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

        render: function () {
            var isPlaying = this.gamePlayer.isPlaying,
                icon = (isPlaying ? 'pause' : 'play'),
                text = (isPlaying ? 'Pause' : 'Play'),
                html = [
                    [
                        '<button class="btn play-pause">',
                            '<span class="fa fa-' + icon + '"></span>',
                            '&nbsp;' + text,
                        '</button>'
                    ].join(''),
                    [
                        '<button class="btn stop">',
                            '<span class="fa fa-stop"></span>',
                            '&nbsp;Stop',
                        '</button>'
                    ].join(''),
                    '<span class="fps">',
                        '<span>FPS:&nbsp;</span>',
                        this.createButtonMarkup('left', 15),
                        this.createButtonMarkup('right', 30),
                    '</span>'
                ].join('');

            $('#game-player').html(html);
        }
    });

    return GamePlayerControls;
});