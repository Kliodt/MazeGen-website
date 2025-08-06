import { useEffect, useRef, useState } from "react";
import MazeLayout from "./MazeLayout";
import { Directions } from "../../model/directions";
import { MazeUtils } from "./utils";
import { Button, Col, Flex, Popover, Row, Skeleton, Space, Spin } from "antd";
import { ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined, DownloadOutlined, InfoCircleOutlined, LoadingOutlined, RedoOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';




/**
 * Component that is responsible for all interactions with the maze.
 * It provides interface to change the path of the maze
 * @param {Maze} maze maze to control
 * @param {Function} setMaze maze setter
 * @param {Boolean} blocked if true, all interactions with the maze are blocked
 */
const MazeUI = ({maze, path, placeholder}) => {

    // MazeUI is responsible for modifying the maze/path
    // MazeLayout is responsible only for showing the maze

    

    const [undoList, setUndoList] = useState([]);
    const [redoList, setRedoList] = useState([]);

    // clear undo-redo lists when the new maze is coming
    useEffect(() => {
        setUndoList([]);
        setRedoList([]);
    }, [maze]);


    const extendPath = (direction) => {
        // if (blocked) return;

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

        // createUndoObject();
        // setMaze({...maze, path: newPath});
    }

    // const createUndoObject = () => {
    //     maze.undoList.push(maze);
    //     maze.redoList.length = 0;
    // }

    // const undoLastAction = () => {
    //     if (maze.undoList.length) {
    //         // setMaze(maze.undoList.pop());
    //         maze.redoList.push(maze);
            
    //     }
    // }

    // const redoLastAction = () => {
    //     if (maze.redoList.length) {
    //         // setMaze(maze.redoList.pop());
    //         maze.undoList.push(maze);
    //     }
    // }


    const mazeExtraInfo = <div>
        {/* <p>Создатель: {maze?.author?.nickname ? maze.author.nickname : 'N/A'} </p> */}
        <p>Создан: {maze?.genDate ? new Date(Date.parse(maze.genDate)).toLocaleString() : 'N/A'}</p>
        <p>Алгоритм: {maze?.algorithm ? `"${maze.algorithm}"` : 'N/A'}</p>
        <p>Время генерации: {maze?.genDurationMs !== undefined ? maze.genDurationMs + 'ms': 'N/A'}</p>
    </div>;

    

    return (
        <Flex vertical gap={16}>

            <Row gutter={[16,0]} align='center' justify='center'>
                <Col flex='90px'>
                    <Flex vertical gap={8} align="flex-start">
                        <Button size="small" icon={<UndoOutlined />} style={{width: '100%'}} >Undo</Button>
                        <Button size="small" icon={<RedoOutlined />} style={{width: '100%'}} >Redo</Button>
                    </Flex>
                </Col>
                
                <Col flex='90px'>
                    <Flex gap={8} wrap>
                        <Button icon={<DownloadOutlined />} onClick={() => alert('todo')} />
                        <Popover content={mazeExtraInfo} title="Информация" trigger="click">
                            <Button icon={<InfoCircleOutlined />} />
                        </Popover>
                    </Flex>
                    
                </Col>
            </Row>

            <Flex justify="center">
                <MazeLayout maze={maze} path={path} canvasMaxWidth={500} canvasMaxHeight={500} />
            </Flex>

            <Flex justify="center">
                <Space>
                    <Button icon={<ArrowLeftOutlined />} />
                    <Button icon={<ArrowUpOutlined />} />
                    <Button icon={<ArrowDownOutlined />} />
                    <Button icon={<ArrowRightOutlined />} />
                </Space>
            </Flex>
        </Flex>
    )
}

export default MazeUI;


