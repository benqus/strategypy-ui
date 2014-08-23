define(function (require) {
    'use strict';

    var $ = require('jquery'),
        Cell = require('Cell');

    function Grid(columns, rows) {
        this.cells = [];

        this.rows = rows;
        this.columns = columns;
    }

    $.extend(Grid.prototype, {

        createCell: function (column, row) {
            var cell = new Cell(column, row);
            this.cells.push(cell);
            return cell;
        },

        render: function (ctx, frame, players) {
            var i = 0,
                l = this.cells.length;

            while (i < l) {
                this.cells[i].render(ctx, frame, players);
                i += 1;
            }
        },

        initialize: function () {
            var row = 0,
                column = 0,
                cell;

            while (row < this.rows) {
                while (column < this.columns) {
                    cell = this.createCell(column, row);
                    column += 1;
                }

                column = 0;
                row += 1;
            }
        }
    });

    return Grid;
});