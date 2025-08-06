
/**
 * Enum of bit flags representing directions
 */
export const Directions = {
    TOP: 1,
    BOTTOM: 2,
    LEFT: 4,
    RIGHT: 8
}



export const MazeUtils = {
    // getBordersForMazeCell(maze, x, y) {
    //     let ret = 0;
    //     const mazeArray = maze.mazeArray;
    //     if (mazeArray[y * 2][x]) {ret |= Directions.TOP}
    //     if (mazeArray[y * 2 + 2][x]) {ret |= Directions.BOTTOM}
    //     if (mazeArray[y * 2 + 1][x]) {ret |= Directions.LEFT}
    //     if (mazeArray[y * 2 + 1][x + 1]) {ret |= Directions.RIGHT}
    //     return ret;
    // },


    // getMoveDirection(fromCell, toCell) {
    //     if (fromCell.x > toCell.x) return Directions.LEFT;
    //     if (fromCell.x < toCell.x) return Directions.RIGHT;
    //     if (fromCell.y > toCell.y) return Directions.TOP;
    //     if (fromCell.y < toCell.y) return Directions.BOTTOM;
    // },


    // isValidMove(maze, fromCell, toCell) {
    //     const mazeArray = maze.mazeArray;
    //     if (toCell.x < 0 || toCell.y < 0 || toCell.x >= mazeArray[0].length || toCell.y >= mazeArray.length) {
    //         return false;
    //     }
    //     const border = this.getBordersForMazeCell(maze, fromCell.x, fromCell.y);
    //     const direction = this.getMoveDirection(fromCell, toCell);
    //     return !(border & direction);
    // },


    getMazeGridSize(grid) {
        return [grid[0].length - 1, Math.floor(grid.length / 2)]
    },


    // isCompleted(maze) {
    //     if (maze.path.length === 0) return false;
    //     const last = maze.path[maze.path.length - 1];
    //     if(last.x === maze.finish.x && last.y === maze.finish.y) {
    //         // todo: check path
    //         return true;
    //     }
    //     return false;
    // }
}