/* global: jQuery, strategypy */
(function ($, GamePlayer) {

    var gamePlayer;

    function documentReady() {
        gamePlayer = new GamePlayer($('#strategypy'));

        $.getJSON('example.json')
            .done(gamePlayer.initialize.bind(gamePlayer));
    }

    $(document)
        .ready(documentReady);

}(
    jQuery,
    strategypy.GamePlayer
));