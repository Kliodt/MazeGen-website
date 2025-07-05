import { Directions } from "./directions";


export class Maze {
    constructor() {
        this.mazeArray = [[]];
        this.start = {x: 0, y: 0};
        this.finish = {x: 0, y: 0};
        this.path = [];
    }
};


export const MazeUtils = {
    getBordersForMazeCell(maze, x, y) {
        let ret = 0;
        const mazeArray = maze.mazeArray;
        if (mazeArray[y * 2][x]) {ret |= Directions.TOP}
        if (mazeArray[y * 2 + 2][x]) {ret |= Directions.BOTTOM}
        if (mazeArray[y * 2 + 1][x]) {ret |= Directions.LEFT}
        if (mazeArray[y * 2 + 1][x + 1]) {ret |= Directions.RIGHT}
        return ret;
    },


    getMoveDirection(fromCell, toCell) {
        if (fromCell.x > toCell.x) return Directions.LEFT;
        if (fromCell.x < toCell.x) return Directions.RIGHT;
        if (fromCell.y > toCell.y) return Directions.TOP;
        if (fromCell.y < toCell.y) return Directions.BOTTOM;
    },


    isValidMove(maze, fromCell, toCell) {
        const mazeArray = maze.mazeArray;
        if (toCell.x < 0 || toCell.y < 0 || toCell.x >= mazeArray[0].length || toCell.y >= mazeArray.length) {
            return false;
        }
        const border = this.getBordersForMazeCell(maze, fromCell.x, fromCell.y);
        const direction = this.getMoveDirection(fromCell, toCell);
        return !(border & direction);
    },


    getMazeGridSize(maze) {
        const mazeArray = maze.mazeArray;
        return {
            x: mazeArray[0].length - 1,
            y: Math.floor(mazeArray.length / 2)
        }
    },

    isCompleted(maze) {
        if (maze.path.length === 0) return false;
        const last = maze.path[maze.path.length - 1];
        if(last.x === maze.finish.x && last.y === maze.finish.y) {
            // todo: check path
            return true;
        }
        return false;
    }
}


export const MazeFactory = {

    /**
     * Get test maze 
     * @returns {Maze} example maze
     */
    getExampleMaze() {
        const ret = new Maze();
        ret.mazeArray = [
            [1, 1, 1, 1, 1, 1], // horizontal 1
            [1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0], // horizontal 2
            [1, 0, 0, 0, 0, 1],
            [0, 0, 1, 1, 0, 0], // horizontal 3
            [1, 1, 0, 1, 0, 1],
            [0, 0, 1, 1, 0, 0], // horizontal 4
            [1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0], // horizontal 5
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1], // horizontal 6
        ]
        ret.start = {x: 0, y: 0};
        ret.finish = {x: 4, y: 4};
        ret.path = [{x: 0, y: 0}];
        return ret;
    },

    /**
     * Get empty maze 
     * @returns {Maze}
     */
    getEmptyMaze(width, height) {
        const ret = new Maze();

        const arr = Array(height * 2 + 1).fill(null);

        for (let i = 0; i < arr.length; i++) {
            const row = Array(width + 1).fill(0);
            if (i % 2) {
                row[0] = 1;
                row[row.length - 1] = 1;
            }
            if (i === 0 || i === arr.length - 1) row.fill(1);
            arr[i] = row;
        }

        ret.mazeArray = arr;
        ret.start = {x: 0, y: 0};
        ret.finish = {x: width-1, y: height-1};
        ret.path = [{x: 0, y: 0}];
        return ret;
    },


    async generateNewMaze(generatorParameters) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        // todo: generators
        return this.getEmptyMaze(30, 30);
    }
}

