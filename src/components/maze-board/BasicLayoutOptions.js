import { DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Popover, Row } from 'antd';
import ZoomControls from './ZoomControls';
import { MazeUtils } from './utils';

const BasicLayoutOptions = ({
    zoom,
    setZoom,
    onDownloadClick,
    maze: { id, genDate, author, algorithm, genDurationMs }
}) => {
    const mazeExtraInfo = (
        <div>
            <p>ID: {id || 'N/A'}</p>
            <p>Автор: {author?.nickname || 'N/A'}</p>
            <p>
                Создан: {MazeUtils.formatMazeGenDateTime(genDate) || 'N/A'}
            </p>
            <p>Алгоритм: {algorithm || 'N/A'}</p>
            <p>
                Время генерации:{' '}
                {genDurationMs !== undefined ? genDurationMs + 'ms' : 'N/A'}
            </p>
        </div>
    );

    return (
        <Row gutter={[16, 0]} align='center' justify='center'>
            <Col span={4}>
                <Flex vertical gap={8} align='flex-start'>
                    <Popover content={mazeExtraInfo} title='Информация' trigger='click'>
                        <Button icon={<InfoCircleOutlined />} />
                    </Popover>
                </Flex>
            </Col>

            <Col span={16}>
                <ZoomControls onZoomChanged={setZoom} initialZoom={zoom} />
            </Col>

            <Col span={4}>
                {onDownloadClick ? (
                    <Flex gap={8} justify='flex-end'>
                        <Button icon={<DownloadOutlined />} onClick={onDownloadClick} />
                    </Flex>
                ) : (
                    null
                )}
            </Col>
        </Row>
    );
};

export default BasicLayoutOptions;
