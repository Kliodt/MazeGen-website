import { Card, Col, Flex, Row } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import MazeLayout from './MazeLayout';
import MazeLayoutPlaceholder from './MazeLayoutPlaceholder';
import styles from './maze-card.module.css';
import Text from 'antd/es/typography/Text';
import { MazeUtils } from './utils';

/**
 * Small card with maze layout
 */
const MazeCard = ({ maze, path, size = 200, isMazeCompleted }) => {
    const navigate = useNavigate();

    console.log('rendered card: ', maze.id);

    if (!maze) {
        return (
            <Card>
                <MazeLayoutPlaceholder
                    canvasMaxHeight={size}
                    canvasMaxWidth={size}
                    widthToHeightRatio={1}
                />
            </Card>
        );
    }

    return (
        <Card className={isMazeCompleted ? styles['maze-card-green'] : styles['maze-card']}>
            <div style={{ maxWidth: size + 24 }}>
                <Row gutter={8}>
                    <Col span={20}>
                        <Text ellipsis>От: {maze?.author?.nickname || '-'}</Text>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <span>#{maze.id}</span>
                    </Col>
                </Row>
                {/* <Row gutter={8}>
                    <Col span={12}>
                        <Text ellipsis type='secondary' style={{fontSize: '0.8em'}}>{maze.algorithm || '-'}</Text>
                    </Col>
                </Row> */}
                <Row>
                    <Col span={12}>
                        <Text ellipsis type='secondary' style={{ fontSize: '0.8em' }}>
                            {maze.algorithm || '-'}
                        </Text>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Text ellipsis type='secondary' style={{ fontSize: '0.8em' }}>
                            {MazeUtils.formatMazeGenDate(maze.genDate)}
                        </Text>
                    </Col>
                </Row>
            </div>

            <div
                style={{
                    width: size + 24,
                    height: size + 24,
                    marginTop: 8
                }}
                className={styles['layout-wrapper']}
                onClick={() => navigate(`/maze/${maze.id}`)}
            >
                <MazeLayout
                    canvasMaxHeight={size}
                    canvasMaxWidth={size}
                    maze={maze}
                    path={path}
                />
            </div>
        </Card>
    );
};

export default memo(MazeCard);
