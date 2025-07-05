import { Directions } from '../../model/directions';
import { MazeUtils } from '../../model/maze';
import styles from './maze.module.css'


const MazeCell = ({borders, pathDirection, isStart=false, isFinish=false}) => {
    const children = [];
    
    // borders
    if (borders) {
        if (borders & Directions.TOP) 
            children.push(<div key={0} className={[styles['maze-cell-border'], styles['maze-cell-top-border']].join(' ')}></div>);
        if (borders & Directions.BOTTOM) 
            children.push(<div key={1} className={[styles['maze-cell-border'], styles['maze-cell-bottom-border']].join(' ')}></div>);
        if (borders & Directions.LEFT) 
            children.push(<div key={2} className={[styles['maze-cell-border'], styles['maze-cell-left-border']].join(' ')}></div>);
        if (borders & Directions.RIGHT) 
            children.push(<div key={3} className={[styles['maze-cell-border'], styles['maze-cell-right-border']].join(' ')}></div>);
    }

    // path elements
    if (pathDirection) {
        if (pathDirection & Directions.TOP) 
            children.push(<div key={10} className={[styles['maze-path-part'], styles['maze-path-part-top']].join(' ')}></div>);
        if (pathDirection & Directions.BOTTOM) 
            children.push(<div key={11} className={[styles['maze-path-part'], styles['maze-path-part-bottom']].join(' ')}></div>);
        if (pathDirection & Directions.LEFT) 
            children.push(<div key={12} className={[styles['maze-path-part'], styles['maze-path-part-left']].join(' ')}></div>);
        if (pathDirection & Directions.RIGHT) 
            children.push(<div key={13} className={[styles['maze-path-part'], styles['maze-path-part-right']].join(' ')}></div>);
    }

    if (isStart) {
        children.push(
            <div key={20} className={[styles['maze-path-part'], styles['maze-path-part-start']].join(' ')}>A</div>
        );
    }
    if (isFinish) {
        children.push(
            <div key={21} className={[styles['maze-path-part'], styles['maze-path-part-finish']].join(' ')}>B</div>
        );
    }

    return <div className={styles['maze-cell']}>{children}</div>
}

/**
 * Component that is responsible for rendering maze and path
 * @param {Maze} maze maze to draw
 */
const MazeLayout = ({maze}) => {

    const mazePath = maze.path;

    // optimization to search path segments faster
    const mazePathDirectionsMap = new Map();
    for (let i = 0; i < mazePath.length - 1; i++) {
        const el = mazePath[i];
        const direction = MazeUtils.getMoveDirection(el, mazePath[i + 1]);
        mazePathDirectionsMap.set(JSON.stringify([el.x, el.y]), direction);
    }

    // draw the maze
    const mazeSize = MazeUtils.getMazeGridSize(maze);
    
    let rows = [];
    for (let y = 0; y < mazeSize.y; y++) {
        let cells = [];
        for (let x = 0; x < mazeSize.x; x++) {
            const borders = MazeUtils.getBordersForMazeCell(maze, x, y);
            const pathDirection = mazePathDirectionsMap.get(JSON.stringify([x, y]));
            const isStart = maze.start.x === x && maze.start.y === y;
            const isFin = maze.finish.x === x && maze.finish.y === y;
            
            cells.push(<MazeCell 
                key={x} 
                borders={borders}
                pathDirection={pathDirection}
                isStart={isStart}
                isFinish={isFin}/>
            );
        }
        rows.push(<div key={y} className={styles['maze-cells-container']}>{cells}</div>);
    }

    return <div className={styles['maze-rows-container']}>{rows}</div>
}


export default MazeLayout;