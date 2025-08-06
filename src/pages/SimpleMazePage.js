import { Card, Flex } from "antd";
import { useRef } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { Api } from "../api/api";
import MazeLayout from "../components/maze-board/MazeLayout";

const SimpleMazePage = () => {

    const params = useParams();
    const location = useLocation();

    console.log(params);
    console.log(location);

    const mazeRef = useRef(null);

    if (location?.state?.maze) {
        mazeRef.current = location.state.maze;
    } else if (params.mazeId) {
        // todo: get maze from server
    }

    if (mazeRef.current == null) {
        return "not found"; // todo
    }

    return (
        <Flex justify="center" style={{margin: 16}}>
            <Card>
                <MazeLayout maze={mazeRef.current} canvasMaxHeight={500} canvasMaxWidth={500}/>
            </Card>

        </Flex>
    );
}

export default SimpleMazePage;