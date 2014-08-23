define(function (require) {
    'use strict';

    var $ = require('jquery');

    var cellHeight = 0,
        cellWidth = 0;

    function Cell(x, y) {
        this.x = x;
        this.y = y;
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

        render: function (ctx, frame, players) {
            var fillStyle = ctx.fillStyle,
                i;

            for (i in players) {
                if (players[i].hasBotInPositionAtFrame(frame, this.x, this.y)) {
                    ctx.fillStyle = players[i].color;
                    break;
                }
            }

            ctx.fillRect(
                this.x * cellWidth,
                this.y * cellHeight,
                cellWidth,
                cellHeight
            );

            ctx.fillStyle = fillStyle;
        }
    });

    return Cell;
});