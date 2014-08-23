requirejs.config({
    baseUrl: './js/lib',

    paths: {
        jquery: '../../pages/jquery/jquery'
    }
});

require(['jquery', 'GamePlayer'], function ($, GamePlayer) {
    var gamePlayer;

    function documentReady() {
        gamePlayer = new GamePlayer($('#strategypy'), $('#legend'));

        $.getJSON('example.json')
            .done(gamePlayer.initialize.bind(gamePlayer));
    }

    $(document)
        .ready(documentReady);
});