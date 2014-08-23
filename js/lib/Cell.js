define(function (require) {
    'use strict';

    var $ = require('jquery');

    var cellHeight = 0,
        cellWidth = 0,
        c = 0;

    function Cell(xId, yId, x, y) {
        this.cid = 'c' + c;

        this.xId = xId;
        this.yId = yId;

        this.x = x;
        this.y = y;

        c += 1;
    }

    Cell.setDimensions = function (width, height) {
        cellWidth = width;
        cellHeight = height;
    };

    Cell.getWidth = function () {
        return cellWidth;
    };

    Cell.getHeight = function () {
        return cellHeight;
    };

    $.extend(Cell.prototype, {

        getID: function () {
            return this.cid;
        },

        render: function (ctx, frame, players) {
            var fillStyle = ctx.fillStyle,
                i;

            for (i in players) {
                if (players[i].hasBotInPositionAtFrame(frame, this.xId, this.yId)) {
                    ctx.fillStyle = players[i].color;
                    break;
                }
            }

            ctx.fillRect(this.x, this.y, cellWidth, cellHeight);
            ctx.fillStyle = fillStyle;
        }
    });

    return Cell;
});