import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useState } from 'react';

const ZoomControls = ({ onZoomChanged, initialZoom = 1 }) => {
    const [zoom, setZoom] = useState(initialZoom);

    const zoomUpdated = val => {
        setZoom(val);
        onZoomChanged(val);
    };

    return (
        <Flex
            align='center'
            justify='center'
            gap={5}
            style={{ width: '100%', height: '100%', userSelect: 'none' }}
        >
            <Button
                onClick={() => zoomUpdated(prev => Math.max(prev - 0.1, 0.1))}
                icon={<ZoomOutOutlined />}
            />
            <label>Масштаб:&nbsp;{zoom.toFixed(1)}</label>
            <Button
                onClick={() => zoomUpdated(prev => Math.min(prev + 0.1, 8.0))}
                icon={<ZoomInOutlined />}
            />
        </Flex>
    );
};

export default ZoomControls;
