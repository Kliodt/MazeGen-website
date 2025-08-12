import { useEffect, useRef } from 'react';
import { MazeUtils } from './utils';

const drawMazeOnCanvas = (canvasContext, mazeGrid, lineWidth, step) => {
    const ctx = canvasContext;
    const stepOverlap = lineWidth / 2;

    const offset = lineWidth % 2 === 0 ? 0 : 0.5;

    const align = coord => {
        return Math.round(coord + offset) - offset;
    }

    ctx.lineWidth = lineWidth;
    let x = 0,
        y = 0;
    for (let i = 0; i < mazeGrid.length; i++) {
        const row = mazeGrid[i];
        const isVertical = i % 2;
        x = 0;
        for (const element of row) {
            if (element) {
                ctx.beginPath();
                if (isVertical) {
                    ctx.moveTo(align(x), align(y - stepOverlap));
                    ctx.lineTo(align(x), align(y + step + stepOverlap));
                } else {
                    ctx.moveTo(align(x - stepOverlap), align(y));
                    ctx.lineTo(align(x + step + stepOverlap), align(y));
                }
                ctx.stroke();
            }
            x += step;
        }
        if (isVertical) y += step;
    }
};

const drawPathOnCanvas = (
    canvasContext,
    mazePath,
    startX,
    startY,
    finishX,
    finishY,
    lineWidth,
    step
) => {
    const ctx = canvasContext;
    const stepOverlap = lineWidth / 2;

    ctx.lineWidth = lineWidth;
    ctx.fillStyle = 'rgb(255 0 0)';
    ctx.strokeStyle = 'rgb(255 0 0)';

    const offset = lineWidth % 2 === 0 ? 0 : 0.5;
    
    const align = coord => {
        return Math.round(coord + offset) - offset;
    }

    const drawPathSegment = (a, b) => {
        ctx.beginPath();
        const signX = Math.sign(b[0] - a[0]);
        const signY = Math.sign(b[1] - a[1]);
        ctx.moveTo(
            align((a[0] + 0.5) * step - stepOverlap * signX),
            align((a[1] + 0.5) * step - stepOverlap * signY)
        );
        ctx.lineTo(
            align((b[0] + 0.5) * step + stepOverlap * signX),
            align((b[1] + 0.5) * step + stepOverlap * signY)
        );
        ctx.stroke();
    };

    if (mazePath) {
        for (let i = 0; i < mazePath.length - 1; i++) {
            drawPathSegment(mazePath[i], mazePath[i + 1]);
        }
    }

    const drawStart = (x, y) => {
        const sz = lineWidth * 2;
        ctx.fillRect((x + 0.5) * step - sz / 2, (y + 0.5) * step - sz / 2, sz, sz);
    };

    if (startX !== null && startY !== null && finishX !== null && finishY !== null) {
        drawStart(startX, startY);
        drawStart(finishX, finishY);
    }
};

/**
 * Component that is responsible for rendering maze and path
 */
const MazeLayout = ({
    maze: { grid, startX, startY, finishX, finishY },
    path,
    canvasMaxWidth,
    canvasMaxHeight
}) => {
    const mazeCanvas = useRef(null);
    const pathCanvas = useRef(null);

    const [mazeWidth, mazeHeight] = MazeUtils.getMazeGridSize(grid);

    const step = Math.min(canvasMaxWidth / mazeWidth, canvasMaxHeight / mazeHeight);
    const lineWidth = Math.max((6 / 50) * step, 1);

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
        const ctx = pathCanvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawPathOnCanvas(ctx, path, startX, startY, finishX, finishY, lineWidth, step);
    }, [
        path,
        startX,
        startY,
        finishX,
        finishY,
        lineWidth,
        step,
        canvasWidth,
        canvasHeight
    ]);

    const canvasStyle = {
        // border: '3px solid black',
        outline: '3px solid black',
        position: 'absolute',
        borderRadius: 3,
        top: 0,
        left: 0
    };

    const wrapperStyle = {
        width: canvasWidth,
        height: canvasHeight,
        position: 'relative'
    };

    return (
        <div style={wrapperStyle}>
            <canvas
                ref={mazeCanvas}
                width={canvasWidth}
                height={canvasHeight}
                style={canvasStyle}
            ></canvas>
            <canvas
                ref={pathCanvas}
                width={canvasWidth}
                height={canvasHeight}
                style={canvasStyle}
            ></canvas>
        </div>
    );
};

export default MazeLayout;
