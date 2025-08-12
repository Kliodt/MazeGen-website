import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton, Spin } from 'antd';

const MazeLayoutPlaceholder = ({
    canvasMaxWidth,
    canvasMaxHeight,
    widthToHeightRatio = 1,
    active = false,
    children
}) => {
    let [width, height] = [canvasMaxWidth, canvasMaxHeight];

    if (widthToHeightRatio > 1) {
        // w > h
        height /= widthToHeightRatio;
    } else {
        // w < h
        width *= widthToHeightRatio;
    }

    return (
        <Skeleton.Node style={{ width, height }} active={active}>
            {active ? (
                <Spin indicator={<LoadingOutlined spin style={{ fontSize: 100 }} />} />
            ) : (
                ''
            )}
            {children}
        </Skeleton.Node>
    );
};

export default MazeLayoutPlaceholder;
