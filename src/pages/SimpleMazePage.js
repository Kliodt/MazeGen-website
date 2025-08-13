import { Badge, Button, Card, Flex, message } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../api/api';
import MazeLayoutSkeleton from '../components/maze-board/MazeLayoutSkeleton';
import SolveMaze from '../components/maze-board/SolveMaze';
import { MazeUtils } from '../components/maze-board/utils';

const MazePage = () => {
    const params = useParams();

    const [maze, setMaze] = useState(null);
    const [mazePath, setMazePath] = useState(null);

    const [isMazeLoading, setMazeLoading] = useState(true);
    const [isSaveLoading, setSaveLoading] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    // load the maze
    useEffect(() => {
        if (!params.mazeId) return;
        Api.getMazeById(params.mazeId)
            .then(maze => {
                if (!maze) {
                    setMaze(null);
                } else {
                    setMaze(maze);
                    setMazePath(maze?.userPath?.points || [[maze.startX, maze.startY]]);
                }
            })
            .catch(() => {
                setMaze(null);
            })
            .finally(() => {
                setMazeLoading(false);
            });
    }, [params.mazeId]);

    const onMazePathChanged = newPath => {
        setMazePath(newPath);
        setHasUnsavedChanges(true);

        // check completed
        if (maze && MazeUtils.isCompleted(maze.finishX, maze.finishY, newPath)) {
            Api.submitMazeCompletion(maze.id, newPath)
                .then(resp => {
                    if (resp.isMazeCompleted) {
                        messageApi.open({
                            type: 'success',
                            content: 'Лабиринт пройден',
                            className: 'add-header-padding'
                        });
                    }
                    setHasUnsavedChanges(false);
                })
                .catch(err => console.log('submit completion error, ', err));
        }
    };

    const onSaveButton = () => {
        if (isSaveLoading) return;

        setHasUnsavedChanges(false);
        setSaveLoading(true);

        Api.savePath(maze.id, mazePath)
            .then(res => {
                if (res) {
                    messageApi.open({
                        type: 'success',
                        content: 'Изменения сохранены',
                        className: 'add-header-padding'
                    });
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'Ошибка сохранения',
                        className: 'add-header-padding'
                    });
                }
            })
            .catch(err => console.log(err))
            .finally(() => setSaveLoading(false));
    };

    let content = null;

    if (isMazeLoading) {
        content = (
            <MazeLayoutSkeleton
                canvasMaxHeight={500}
                canvasMaxWidth={500}
                widthToHeightRatio={1}
                active
            />
        );
    } else {
        if (maze) {
            content = (
                <>
                    <div style={{ marginBottom: 8 }}>
                        <Badge
                            dot={hasUnsavedChanges}
                            size='default'
                            offset={[-1, 1]}
                            style={{ scale: 1.3 }}
                        >
                            <Button
                                loading={isSaveLoading}
                                onClick={onSaveButton}
                                type={hasUnsavedChanges ? 'primary' : 'default'}
                            >
                                Сохранить
                            </Button>
                        </Badge>
                    </div>
                    <SolveMaze maze={maze} path={mazePath} setPath={onMazePathChanged} />
                </>
            );
        } else {
            content = (
                <MazeLayoutSkeleton
                    canvasMaxHeight={500}
                    canvasMaxWidth={500}
                    widthToHeightRatio={1}
                >
                    Ошибка: Не найден
                </MazeLayoutSkeleton>
            );
        }
    }

    return (
        <>
            {contextHolder}
            <Flex justify='center' style={{ margin: 16 }}>
                <Card>{content}</Card>
            </Flex>
        </>
    );
};

export default MazePage;
