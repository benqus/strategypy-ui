/* global: strategypy */
(function ($, Cell) {

    function Grid(columns, rows) {
        this.cells = {};

        this.rows = rows;
        this.columns = columns;

        this.currentX = 0;
        this.currentY = 0;
    }

    $.extend(Grid.prototype, {

        createCell: function (column, row) {
            var cell = new Cell(column, row, this.currentX, this.currentY);
            this.cells[cell.getID()] = cell;
            return cell;
        },

        render: function (ctx, frame, players) {
            for (var i in this.cells) {
                this.cells[i].render(ctx, frame, players);
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

                    // new column
                    this.currentX += Cell.getWidth();
                }

                column = 0;
                row += 1;

                // new row
                this.currentX = 0;
                this.currentY += Cell.getHeight();
            }
        }
    });

    strategypy.Grid = Grid;

}(
    jQuery,
    strategypy.Cell
));