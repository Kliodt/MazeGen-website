import ContentCard from "../components/content-card/ContentCard";
import GeneratorSettings from "../components/maze-generator/GeneratorSettings";
import Header from "../components/header/Header";
import MazeUI from "../components/maze-board/MazeUI";
import { Maze, MazeFactory } from "../model/maze";
import MazeLayout from "../components/maze-board/MazeLayout";
import { useRef, useState } from "react";


const HomePage = () => {

    const [maze, setMaze] = useState(() => MazeFactory.getEmptyMaze(7, 7));
    const [isDummyMaze, setIsDummyMaze] = useState(true);
    const [mazeVersion, setMazeVersion] = useState(1);
    
    const onMazeGenerated = (maze, err) => {
        if (maze) {
            setMaze(maze);
            setIsDummyMaze(false);
            setMazeVersion(v => v + 1);
        }
    }

    const onGenerateMazePressed = (templateMaze) => {
        setMaze(templateMaze);
        setIsDummyMaze(true);
    }

    
    return <>
        <Header/>
        <br/>
        
        {/* <ContentCard>
            <h1>HOME PAGE</h1>
        </ContentCard> */}

        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap-reverse', alignItems: 'flex-end'}}>

            <ContentCard style={{display: 'inline-block', verticalAlign: 'top'}}>
                <GeneratorSettings 
                    onMazeGenerated={onMazeGenerated} 
                    onGenerateMazePressed={onGenerateMazePressed}
                    shouldGenerateNewMaze={false}/>
            </ContentCard>

            <ContentCard style={{display: 'inline-block', verticalAlign: 'top'}}>
                <MazeUI key={mazeVersion} maze={maze} setMaze={setMaze} blocked={isDummyMaze}/>
            </ContentCard>

        </div>
        {/* todo: положить это во flexbox */}

    </>
}


export default HomePage;