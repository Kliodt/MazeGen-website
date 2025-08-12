import { ControlOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, Flex } from 'antd';
import { useRef, useState } from 'react';
import MazeLayout from '../components/maze-board/MazeLayout';
import MazeLayoutPlaceholder from '../components/maze-board/MazeLayoutPlaceholder';
import GeneratorSettings from '../components/maze-generator/GeneratorSettings';
import useGotoPage from '../hooks/useGotoPage';
import BasicLayoutOptions from '../components/maze-board/BasicLayoutOptions';

const GeneratorPage = () => {
    const [maze, setMaze] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [zoom, setZoom] = useState(1);

    const gotoPage = useGotoPage();
    const mazeWidthToHeightRatio = useRef(1);

    const toggleDrawer = () => setDrawerOpened(v => !v);

    const onGenerationBegan = (width, height) => {
        setMaze(null);
        setDrawerOpened(false);
        setIsGenerating(true);
        mazeWidthToHeightRatio.current = width / height;
    };

    const onGenerationEnded = maze => {
        setMaze(maze);
        setDrawerOpened(false);
        setIsGenerating(false);
    };

    const onSolveMaze = () => {
        if (!maze) return;
        gotoPage(`/maze/${maze.id}`);
    };

    return (
        <div style={{ position: 'relative', flexGrow: 1 }}>
            <Drawer
                title='Настройки генерации'
                open={drawerOpened}
                onClose={toggleDrawer}
                placement='left'
                width={250}
                className='add-header-padding'
                // mask={false}
            >
                <GeneratorSettings
                    genBeganCallback={onGenerationBegan}
                    genEndedCallback={onGenerationEnded}
                />
            </Drawer>

            <Flex align='center' justify='center' style={{ margin: 16 }}>
                <Card>
                    {maze ? (
                        <Flex vertical gap={16}>
                            <Flex gap={8}>
                                <Button onClick={toggleDrawer}>Генерировать новый</Button>
                                <div style={{ flexGrow: 1 }}></div>
                                <Button type='primary' onClick={onSolveMaze}>
                                    Пройти
                                </Button>
                            </Flex>

                            <BasicLayoutOptions
                                zoom={zoom}
                                setZoom={setZoom}
                                maze={maze}
                            />

                            <Flex justify='center'>
                                <MazeLayout
                                    maze={maze}
                                    canvasMaxWidth={500 * zoom}
                                    canvasMaxHeight={500 * zoom}
                                />
                            </Flex>
                        </Flex>
                    ) : isGenerating ? (
                        <MazeLayoutPlaceholder
                            canvasMaxWidth={500 * zoom}
                            canvasMaxHeight={500 * zoom}
                            widthToHeightRatio={mazeWidthToHeightRatio.current}
                            active
                        />
                    ) : (
                        <MazeLayoutPlaceholder
                            canvasMaxWidth={500 * zoom}
                            canvasMaxHeight={500 * zoom}
                        >
                            <Button
                                type='primary'
                                size='large'
                                icon={<ControlOutlined />}
                                onClick={toggleDrawer}
                                className='simple-shadow'
                                style={{padding: '30px 15px'}}
                            >
                                <span>Настройки<br/>генерации</span>
                            </Button>
                        </MazeLayoutPlaceholder>
                    )}
                </Card>
            </Flex>
        </div>
    );
};

export default GeneratorPage;
