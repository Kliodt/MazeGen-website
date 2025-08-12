import { Flex, Switch } from 'antd';
import { useEffect, useState } from 'react';
import BasicLayoutOptions from './BasicLayoutOptions';
import KeyboardWidget, { KeyboardWidgetAction } from './KeyboardWidget';
import MazeLayout from './MazeLayout';
import { Directions, MazeUtils } from './utils';
import useSavedValue from '../../hooks/useSavedValue';

/**
 * Component that is responsible for all interactions with the maze.
 * It provides interface to change the path of the maze
 * @param {Maze} maze maze to control
 * @param {Function} setMaze maze setter
 * @param {Boolean} blocked if true, all interactions with the maze are blocked
 */
const SolveMaze = ({ maze, path, setPath }) => {
    const [zoom, setZoom] = useState(1);
    const [isFloatingKB, setFloatingKB] = useSavedValue('is-keyboard-floating', true);
    const [isKeyboardEnabled, setKeyboardEnabled] = useSavedValue(
        'is-keyboard-enabled',
        true
    );

    const [undoList, setUndoList] = useState([]);
    const [redoList, setRedoList] = useState([]);

    // clear undo-redo lists when the maze is changed
    useEffect(() => {
        setUndoList([]);
        setRedoList([]);
    }, [maze]);

    const extendPath = direction => {
        const lastPoint = path[path.length - 1];
        const newPoint = [ ...lastPoint ];
        if (direction === Directions.TOP) newPoint[1]--;
        if (direction === Directions.BOTTOM) newPoint[1]++;
        if (direction === Directions.LEFT) newPoint[0]--;
        if (direction === Directions.RIGHT) newPoint[0]++;

        if (!MazeUtils.isValidMove(maze.grid, lastPoint, newPoint)) return;

        // if we made a loop in the path, remove it
        const newPath = [];
        for (let point of path) {
            if (point[0] === newPoint[0] && point[1] === newPoint[1]) break;
            newPath.push(point);
        }
        newPath.push(newPoint);

        createUndoObject();

        setPath(newPath);
    };

    const createUndoObject = () => {
        undoList.push(path);
        redoList.length = 0;
    };

    const undoLastAction = () => {
        if (undoList.length) {
            redoList.push(path);
            setPath(undoList.pop());
        }
    };

    const redoLastAction = () => {
        if (redoList.length) {
            undoList.push(path);
            setPath(redoList.pop());
        }
    };

    const onKeyboardAction = action => {
        if (action === KeyboardWidgetAction.UP) {
            extendPath(Directions.TOP);
        } else if (action === KeyboardWidgetAction.DOWN) {
            extendPath(Directions.BOTTOM);
        } else if (action === KeyboardWidgetAction.RIGHT) {
            extendPath(Directions.RIGHT);
        } else if (action === KeyboardWidgetAction.LEFT) {
            extendPath(Directions.LEFT);
        } else if (action === KeyboardWidgetAction.UNDO) {
            undoLastAction();
        } else if (action === KeyboardWidgetAction.REDO) {
            redoLastAction();
        }
    };

    return (
        <>
            <Flex vertical gap={16}>
                {/* Buttons above maze */}
                <BasicLayoutOptions zoom={zoom} setZoom={setZoom} maze={maze} />

                {/* Maze */}
                <Flex justify='center'>
                    <MazeLayout
                        maze={maze}
                        path={path}
                        canvasMaxWidth={500 * zoom}
                        canvasMaxHeight={500 * zoom}
                    />
                </Flex>

                {/* Buttons below maze */}
                <Flex justify='flex-end' gap={8} align='flex-end' vertical>
                    <div>
                        <label>Клавиатура </label>

                        <Switch
                            checked={isKeyboardEnabled}
                            onChange={checked => setKeyboardEnabled(checked)}
                            size='small'
                        />
                    </div>
                    <div>
                        <label>Плавающая клавиатура </label>
                        <Switch
                            checked={isFloatingKB}
                            onChange={checked => setFloatingKB(checked)}
                            size='small'
                            disabled={!isKeyboardEnabled}
                        />
                    </div>
                </Flex>
                <div style={isKeyboardEnabled ? {} : { display: 'none' }}>
                    <Flex justify='center' align='flex-start' gap={16}>
                        <KeyboardWidget
                            onAction={onKeyboardAction}
                            floating={isFloatingKB}
                        />
                    </Flex>
                </div>
            </Flex>
        </>
    );
};

export default SolveMaze;
