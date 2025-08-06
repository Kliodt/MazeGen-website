import { Api } from "../api/api";
import { Directions } from "./directions";


// export class Maze {
//     constructor() {
//         this.id = null;
//         this.algorithm = null;
//         this.author = {
//             nickname: null,
//             profilePictureUrl: null,
//         }
//         this.startX = null;
//         this.startY = null;
//         this.finishX = null;
//         this.finishY = null;
//         this.genDate = null;
//         this.genDurationMs = null;
//         this.grid = null;
//     }

//     setMetaInformation = (id, author, genDate, genDurationMs) => {
//         this.metaInformation = {
//             id, author, genDate, genDurationMs
//         }
//     }
// };




export const MazeFactory = {


    // /**
    //  * Get empty maze 
    //  * @returns {Maze}
    //  */
    // getEmptyMaze(width, height) {
    //     const arr = Array(height * 2 + 1).fill(null);

    //     for (let i = 0; i < arr.length; i++) {
    //         const row = Array(width + 1).fill(0);
    //         if (i % 2) {
    //             row[0] = 1;
    //             row[row.length - 1] = 1;
    //         }
    //         if (i === 0 || i === arr.length - 1) {
    //             for (let j = 0; j < row.length - 1; j++) row[j] = 1;
    //         }
    //         arr[i] = row;
    //     }

    //     return new Maze(arr, {x: 0, y: 0}, {x: width-1, y: height-1}, [{x: 0, y: 0}]);
    // },


}

