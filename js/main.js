requirejs.config({
    baseUrl: './js/lib',

    paths: {
        jquery: '../../node_modules/jquery/dist/jquery'
    }
});

require(['jquery', 'GamePlayer'], function ($, GamePlayer) {
    var gamePlayer;

    function documentReady() {
        gamePlayer = new GamePlayer($('#strategypy'));

        $.getJSON('example.json')
            .done(gamePlayer.initialize.bind(gamePlayer));
    }

    $(document)
        .ready(documentReady);
});