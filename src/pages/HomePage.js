import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import MazeList from '../components/maze-list/MazeList';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='header-sticky' style={{ zIndex: 1000, display: 'inline-block' }}>
                <div style={{paddingTop: 16, paddingLeft: 16}}>
                    <Button
                        type='primary'
                        onClick={() => navigate('/generate')}
                        icon={<PlusCircleOutlined />}
                        size='large'
                    >
                        Генератор
                    </Button>
                </div>
            </div>

            <MazeList pageSize={10} />
        </>
    );
};

export default HomePage;
