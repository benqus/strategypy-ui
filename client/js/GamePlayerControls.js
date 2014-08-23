/* global: jQuery, strategypy */
(function ($) {

    function GamePlayerControls(gamePlayer) {
        this.gamePlayer = gamePlayer;
    }

    $.extend(GamePlayerControls.prototype, {

        initialize: function () {
            this.render(this.isPlaying);

            $('#game-player').on('click', this.clickListener.bind(this));
        },

        clickListener: function (evt) {
            var fps = $(evt.target).data('fps');

            this.gamePlayer.reset(fps);
            this.gamePlayer.play();
        },

        render: function () {
            var isPlaying = this.gamePlayer .isPlaying,
                icon = (isPlaying ? 'pause' : 'play'),
                text = (isPlaying ? 'Pause' : 'Play'),
                html = [
                    [
                        '<button class="btn">',
                            '<span class="fa fa-' + icon + '"></span>',
                            '&nbsp;' + text,
                        '</button>'
                    ].join(''),
                    '<button class="btn left" data-fps="15">15 FPS</button>',
                    '<button class="btn right" data-fps="30">30 FPS</button>'
                ].join('');

            $('#game-player').html(html);
        }
    });

    strategypy.GamePlayerControls = GamePlayerControls;

}(
    jQuery
));