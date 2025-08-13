import { Card } from 'antd';

const Error404Page = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <Card>
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <label
                        style={{
                            fontSize: '50px',
                            color: 'rgb(255, 50, 50)',
                            fontWeight: '600'
                        }}
                    >
                        404
                    </label>
                    <h1>Not Found</h1>
                </div>
            </Card>
        </div>
    );
};

export default Error404Page;
