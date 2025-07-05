import { useRef, useState } from "react";
import MazeLayout from "./MazeLayout";
import { Directions } from "../../model/directions";
import { MazeUtils } from "../../model/maze";
import styles from './maze.module.css'



/**
 * Component that is responsible for all interactions with the maze.
 * It provides interface to change the path of the maze
 * @param {Maze} maze maze to control
 * @param {Function} setMaze maze setter
 * @param {Boolean} blocked if true, all interactions with the maze are blocked
 */
const MazeUI = ({maze, setMaze, blocked=false, overlays}) => {

    const [scale, setScale] = useState(1);
    
    if (!maze.undoList) maze.undoList = [];
    if (!maze.redoList) maze.redoList = [];

    // const [path, setPath] = useState(initialPath || []);
    // const [isLoading, setLoading] = useState(false);

    // const mazeLayout = maze ? (
    //     <MazeLayout maze={maze} mazePath={[]}/>
    // ) : (
    //     <div style={{filter: "blur(6px)"}}>
    //         <MazeLayout maze={getDefaultMaze()} mazePath={[]}/>
    //     </div>
    // );

    // // todo: check path completed
    // let overlay = null;
    // if (maze) {

    // } else {
    //     const onGenerate = () => {
    //         setLoading(true);
    //         requestNewMazeGen();
    //     }
    //     if (isLoading) {
    //         overlay = <div className="maze-overlay">
    //             <div style={{textAlign: 'center', userSelect: 'none'}}>
    //                 <span className="common-big-text"><h2>Генерация</h2></span><br/>
    //                 <img src="images/icons/loadingCircle.gif" alt="" style={{height: '1.5em'}}/>
    //             </div>
    //         </div>
    //     } else {
    //         // overlay = <div className="maze-overlay">
    //         //     <button onClick={onGenerate} className="common-button">Генерировать</button>
    //         // </div>
    //     }
    // }



    const extendPath = (direction) => {
        if (blocked) return;

        const last = maze.path[maze.path.length - 1];
        const next = {...last};
        if (direction === Directions.TOP) next.y--;
        if (direction === Directions.BOTTOM) next.y++;
        if (direction === Directions.LEFT) next.x--;
        if (direction === Directions.RIGHT) next.x++;

        if (!MazeUtils.isValidMove(maze, last, next)) return maze;

        // if we made a loop in the path, remove it
        const newPath = [];
        for (let i = 0; i < maze.path.length; i++) {
            const el = maze.path[i];
            if (el.x === next.x && el.y === next.y) break;
            newPath.push(el);
        }
        newPath.push(next);

        createUndoObject(maze);
        setMaze({...maze, path: newPath});
    }

    const createUndoObject = (maze) => {
        maze.undoList.push(maze);
        maze.redoList = [];
    }

    const undoLastAction = () => {
        if (maze.undoList.length) {
            setMaze(maze.undoList.pop());
            maze.redoList.push(maze);
        }
    }

    const redoLastAction = () => {
        if (maze.redoList.length) {
            setMaze(maze.redoList.pop());
            maze.undoList.push(maze);
        }
    }

    const uiElements = <div>
        <button disabled={blocked} onClick={() => {extendPath(Directions.TOP)}}>top</button>
        <button disabled={blocked} onClick={() => {extendPath(Directions.BOTTOM)}}>bottom</button>
        <button disabled={blocked} onClick={() => {extendPath(Directions.RIGHT)}}>right</button>
        <button disabled={blocked} onClick={() => {extendPath(Directions.LEFT)}}>left</button>
        <button disabled={blocked} onClick={undoLastAction}>undo</button>
        <button disabled={blocked} onClick={redoLastAction}>redo</button>
        <button disabled={blocked} onClick={() => setScale(s => s + 0.1)}>+</button>
        <button disabled={blocked} onClick={() => setScale(s => s - 0.1)}>-</button>
    </div>

    

    return (
        <>
            <div className={styles['maze-base']}>
                <MazeLayout maze={maze}/>
            </div>
            {uiElements}    
        </>
    )
}

export default MazeUI;


