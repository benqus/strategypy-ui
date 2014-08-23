define(function (require) {
    'use strict';

    var $ = require('jquery');

    var playerColors = [
        'red',
        'green',
        'blue',
        'yellow',
        'torqoise',
        'magenta'
    ];

    function Player(id, data) {
        this.data = data;
        this.color = playerColors[id];
        this.botsPerFrame = {};
    }

    $.extend(Player.prototype, {

        hasBotInPositionAtFrame: function (frame, x, y) {
            var frameBots = this.getBotsForFrame(frame);
            return (frameBots && frameBots[x] && frameBots[x][y]);
        },

        getBotsForFrame: function (frame) {
            return this.botsPerFrame[frame];
        },

        // bots per frame
        setBotsForFrame: function (frame, bots) {
            var frameBots = (this.botsPerFrame[frame] || {}),
                x,
                y,
                i;

            for (i in bots) {
                x = bots[i][0];
                y = bots[i][1];

                frameBots[x] = (frameBots[x] || {});
                frameBots[x][y] = (frameBots[x][y] = bots[i]);
            }

            this.botsPerFrame[frame] = frameBots;
        }
    });

    return Player;
});