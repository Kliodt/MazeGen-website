import {
    ArrowDownOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    RedoOutlined,
    UndoOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect } from 'react';

import { useDraggable } from 'use-draggable';

export const KeyboardWidgetAction = {
    UP: 1,
    DOWN: 2,
    RIGHT: 3,
    LEFT: 4,
    UNDO: 5,
    REDO: 6
};

const DraggableDiv = ({ children }) => {
    const { targetRef } = useDraggable({ controlStyle: true });
    return (
        <div
            ref={targetRef}
            style={{
                position: 'fixed',
                bottom: 60,
                left: 60,
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: 16,
                borderRadius: 10,
                zIndex: 1000
            }}
        >
            {children}
        </div>
    );
};

const Keyboard = ({ onAction }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <Button
                            icon={<UndoOutlined />}
                            onClick={() => onAction(KeyboardWidgetAction.UNDO)}
                        >
                            Undo
                        </Button>
                    </td>
                    <td></td>
                    <td>
                        <Button
                            icon={<ArrowUpOutlined />}
                            onClick={() => onAction(KeyboardWidgetAction.UP)}
                        />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <Button
                            icon={<RedoOutlined />}
                            onClick={() => onAction(KeyboardWidgetAction.REDO)}
                        >
                            Redo
                        </Button>
                    </td>

                    <td>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => onAction(KeyboardWidgetAction.LEFT)}
                        />
                    </td>
                    <td></td>
                    <td>
                        <Button
                            icon={<ArrowRightOutlined />}
                            onClick={() => onAction(KeyboardWidgetAction.RIGHT)}
                        />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <Button
                            icon={<ArrowDownOutlined />}
                            onClick={() => onAction(KeyboardWidgetAction.DOWN)}
                        />
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
};

const KeyboardWidget = ({ onAction, floating }) => {
    useEffect(() => {
        const handleKeyDown = event => {
            if (
                event.target.tagName === 'INPUT' ||
                event.target.tagName === 'TEXTAREA' ||
                event.target.tagName === 'BUTTON'
            ) {
                return; // some input is focused
            }

            if (!event.ctrlKey && !event.shiftKey && !event.altKey) {
                switch (event.code) {
                    case 'ArrowUp':
                    case 'KeyW':
                        event.preventDefault();
                        onAction(KeyboardWidgetAction.UP);
                        break;
                    case 'ArrowDown':
                    case 'KeyS':
                        event.preventDefault();
                        onAction(KeyboardWidgetAction.DOWN);
                        break;
                    case 'ArrowLeft':
                    case 'KeyA':
                        event.preventDefault();
                        onAction(KeyboardWidgetAction.LEFT);
                        break;
                    case 'ArrowRight':
                    case 'KeyD':
                        event.preventDefault();
                        onAction(KeyboardWidgetAction.RIGHT);
                        break;
                    default:
                        break;
                }
            }

            if (event.ctrlKey && !event.shiftKey && !event.altKey) {
                switch (event.code) {
                    case 'KeyZ':
                        event.preventDefault();
                        onAction(KeyboardWidgetAction.UNDO);
                        break;
                    case 'KeyY':
                        event.preventDefault();
                        onAction(KeyboardWidgetAction.REDO);
                        break;
                    default:
                        break;
                }
            }

            if (event.ctrlKey && event.shiftKey && !event.altKey) {
                if (event.code === 'KeyZ') {
                    event.preventDefault();
                    onAction(KeyboardWidgetAction.REDO);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onAction]);

    return floating ? (
        <DraggableDiv>
            <Keyboard onAction={onAction} />
        </DraggableDiv>
    ) : (
        <div
            style={{
                border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: 10,
                padding: 8
            }}
        >
            <Keyboard onAction={onAction} />
        </div>
    );
};

export default KeyboardWidget;
