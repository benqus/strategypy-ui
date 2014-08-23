/* global: jQuery, strategypy */
(function ($, Player, Cell, Grid) {

    function Game() {
        this.grid = undefined;
        this.players = {};
    }

    $.extend(Game.prototype, {
        createPlayers: function (allPlayers) {
            for (var i in allPlayers) {
                this.players[i] = new Player(i, allPlayers[i]);
            }
        },

        parseFrame: function (frame, index) {
            for (var i in frame) {
                this.players[i].setBotsForFrame(index, frame[i]);
            }
        },

        renderFrame: function (context, frame) {
            this.grid.render(context, frame, this.players);
        },

        initialize: function (data, width, height) {
                // assuming that the first number in the grid_size represents the number of columns
            var columns = data.grid_size[0],
                // assuming that the second number in the grid_size represents the number of rows
                rows = data.grid_size[1];

            this.createPlayers(data.all_players);

            data.frames
                .forEach(this.parseFrame.bind(this));

            Cell.setDimensions(
                width / columns,
                height / rows
            );

            this.grid = new Grid(columns, rows);
            this.grid.initialize();
        }
    });

    strategypy.Game = Game;

}(
    jQuery,
    strategypy.Player,
    strategypy.Cell,
    strategypy.Grid
));