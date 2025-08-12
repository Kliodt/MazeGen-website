/**
 * Enum of bit flags representing directions
 */
export const Directions = {
    TOP: 1,
    BOTTOM: 2,
    LEFT: 4,
    RIGHT: 8
};

export const MazeUtils = {
    getBordersForMazeCell(grid, x, y) {
        let ret = 0;
        if (grid[y * 2][x]) ret |= Directions.TOP;
        if (grid[y * 2 + 2][x]) ret |= Directions.BOTTOM;
        if (grid[y * 2 + 1][x]) ret |= Directions.LEFT;
        if (grid[y * 2 + 1][x + 1]) ret |= Directions.RIGHT;
        return ret;
    },

    getMoveDirection(fromCell, toCell) {
        if (fromCell[0] > toCell[0]) return Directions.LEFT;
        if (fromCell[0] < toCell[0]) return Directions.RIGHT;
        if (fromCell[1] > toCell[1]) return Directions.TOP;
        if (fromCell[1] < toCell[1]) return Directions.BOTTOM;
    },

    isValidMove(grid, fromCell, toCell) {
        const sz = this.getMazeGridSize(grid);
        if (toCell[0] < 0 || toCell[1] < 0 || toCell[0] >= sz[0] || toCell[1] >= sz[1]) {
            return false;
        }
        const border = this.getBordersForMazeCell(grid, fromCell[0], fromCell[1]);
        const direction = this.getMoveDirection(fromCell, toCell);
        return !(border & direction);
    },

    getMazeGridSize(grid) {
        return [grid[0].length - 1, Math.floor(grid.length / 2)];
    },

    formatMazeGenDateTime(genDate) {
        const ret = new Date(Date.parse(genDate)).toLocaleString();
        return ret === 'Invalid Date' ? null : ret;
    },

    formatMazeGenDate(genDate) {
        const ret = new Date(Date.parse(genDate)).toLocaleDateString();
        return ret === 'Invalid Date' ? null : ret;
    },

    isCompleted(finishX, finishY, path) {
        if (path.length === 0) return false;
        const last = path[path.length - 1];
        return last[0] === finishX && last[1] === finishY;
    }
};
