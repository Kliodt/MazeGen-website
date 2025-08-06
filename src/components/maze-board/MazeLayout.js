import { useEffect, useRef } from 'react';
import { MazeUtils } from './utils';


const drawMazeOnCanvas = (canvasContext, mazeGrid, lineWidth, step) => {
    const ctx = canvasContext;
    const stepOverlap = lineWidth / 2;

    ctx.lineWidth = lineWidth;
    let x = 0, y = 0;
    for (let i = 0; i < mazeGrid.length; i++) {
        const row = mazeGrid[i];
        const isVertical = i % 2;
        x = 0;
        for (const element of row) {
            if (element) {
                ctx.beginPath();
                if (isVertical) {
                    ctx.moveTo(x, y - stepOverlap);
                    ctx.lineTo(x, y + step + stepOverlap);
                } else {
                    ctx.moveTo(x - stepOverlap, y);
                    ctx.lineTo(x + step + stepOverlap, y);
                }
                ctx.stroke();
            }
            x += step;
        }
        if (isVertical) y += step;
    }
}

const drawPathOnCanvas = (canvasContext, mazePath, startX, startY, finishX, finishY, lineWidth, step) => {
    const ctx = canvasContext;
    const stepOverlap = lineWidth / 2;

    ctx.lineWidth = lineWidth;
    ctx.fillStyle = "rgb(255 0 0)";
    ctx.strokeStyle = "rgb(255 0 0)";

    const drawPathSegment = (a, b) => {
        ctx.beginPath();
        const signX = Math.sign(b[0] - a[0]);
        const signY = Math.sign(b[1] - a[1]);
        ctx.moveTo((a[0] + 0.5) * step - stepOverlap * signX, (a[1] + 0.5) * step - stepOverlap * signY);
        ctx.lineTo((b[0] + 0.5) * step + stepOverlap * signX, (b[1] + 0.5) * step + stepOverlap * signY);
        ctx.stroke();
    }

    for (let i = 0; i < mazePath.length - 1; i++) {
        drawPathSegment(mazePath[i], mazePath[i+1]);
    }

    const drawStart = (x, y) => {
        const sz = lineWidth * 2;
        ctx.fillRect((x + 0.5) * step - sz / 2, (y + 0.5) * step - sz / 2, sz, sz);
    }

    drawStart(startX, startY);
    drawStart(finishX, finishY);
}


/**
 * Component that is responsible for rendering maze and path
 */
const MazeLayout = ({maze: {grid, startX, startY, finishX, finishY}, path, canvasMaxWidth, canvasMaxHeight}) => {

    const mazeCanvas = useRef(null);
    const pathCanvas = useRef(null);
    
    const [mazeWidth, mazeHeight] = MazeUtils.getMazeGridSize(grid);

    const step = Math.min(canvasMaxWidth / mazeWidth, canvasMaxHeight / mazeHeight);
    const lineWidth = Math.max(6 / 50 * step, 2);

    const canvasWidth = step * mazeWidth;
    const canvasHeight = step * mazeHeight;
    

    // draw maze walls
    useEffect(() => {
        const ctx = mazeCanvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawMazeOnCanvas(ctx, grid, lineWidth, step);
    }, [grid, step, canvasHeight, lineWidth, canvasWidth]);


    // draw maze path
    useEffect(() => {
        if (!path) return;
        const ctx = pathCanvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawPathOnCanvas(ctx, path, startX, startY, finishX, finishY, lineWidth, step);
    }, [grid, path, startX, startY, finishX, finishY, lineWidth, step, canvasWidth, canvasHeight]);

    const canvasStyle = {border: '3px solid black', position: 'absolute', top: 0, left: 0};

    return <div style={{width: canvasWidth, height: canvasHeight, position: 'relative'}}>
        <canvas ref={mazeCanvas} width={canvasWidth} height={canvasHeight} style={canvasStyle}></canvas>
        <canvas ref={pathCanvas} width={canvasWidth} height={canvasHeight} style={canvasStyle}></canvas>
    </div>
}


export default MazeLayout;