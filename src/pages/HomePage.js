import { SettingOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Flex } from "antd";
import { useRef, useState } from "react";
import { Api } from "../api/api";
import MazeLayout from "../components/maze-board/MazeLayout";
import MazeLayoutPlaceholder from "../components/maze-board/MazeLayoutPlaceHolder";
import ZoomControls from "../components/maze-board/ZoomControls";
import GeneratorSettings from "../components/maze-generator/GeneratorSettings";
import useGotoPage from "../hooks/useGotoPage";


const HomePage = () => {

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
    }

    const onGenerationEnded = (maze) => {
        setMaze(maze);
        setDrawerOpened(false);
        setIsGenerating(false);
    }

    const onSolveMaze = () => {
        if (!maze) return;
        gotoPage("/maze/0", {state: {maze}})
    }

    const drawerContainerNode = useRef(null)

    return <div ref={drawerContainerNode} style={{position: 'relative', flexGrow: 1}}>

        <div style={{position: 'fixed', top: 65, left: 15, zIndex: 50}}>
            <Button type="primary" icon={<SettingOutlined />} onClick={toggleDrawer} className="simple-shadow">
                Генерация
            </Button>
        </div>

        <Drawer 
            title='Настройки генерации' 
            open={drawerOpened} 
            onClose={toggleDrawer} 
            getContainer={() => drawerContainerNode.current} 
            rootStyle={{position: 'absolute'}}
            placement="left"
            width={250}
            // mask={false}
        >
            <GeneratorSettings genBeganCallback={onGenerationBegan} genEndedCallback={onGenerationEnded}/>
        </Drawer>

        <Flex align="center" justify="center" style={{margin: 16}}>
            <Card>
                {
                    maze ? (
                        <>
                            <ZoomControls onZoomChanged={setZoom}/>
                            <MazeLayout 
                                maze={maze} 
                                canvasMaxWidth={500 * zoom} 
                                canvasMaxHeight={500 * zoom}
                            />
                            <Button onClick={onSolveMaze}>Пройти</Button>
                        </>
                    ) : (
                        isGenerating ? (
                            <MazeLayoutPlaceholder 
                                canvasMaxWidth={500 * zoom} 
                                canvasMaxHeight={500 * zoom} 
                                widthToHeightRatio={mazeWidthToHeightRatio.current}
                                active
                            />
                        ) : (
                            <>
                                <MazeLayoutPlaceholder 
                                    canvasMaxWidth={500 * zoom} 
                                    canvasMaxHeight={500 * zoom} 
                                >
                                    <Button type="primary" icon={<SettingOutlined />} onClick={toggleDrawer} className="simple-shadow">
                                        Генерация
                                    </Button>
                                </MazeLayoutPlaceholder>
                            </>
                        )
                    )
                }
            </Card>
        </Flex>
        

    </div>


}


export default HomePage;