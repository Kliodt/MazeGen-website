import { Button, Flex, Image, Layout, Popover } from 'antd';
import styles from './basic-layout.module.css'
import { GithubOutlined, HomeOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useGotoPage from '../hooks/useGotoPage';


/**
 * Simple layout that adds header
 */
const BasicLayout = ({children}) => {
    const menuBtnStyle = {height: 30, width: 30};
    const svgStyle = {color: 'white', fontSize: 20};

    const gotoPage = useGotoPage();

    const wtfPopupContent = <div>
        <p style={{maxWidth: 400}}>
            <img src='/images/meme.jpg' alt='' style={{maxHeight: 200, margin: '10px auto', display: 'block'}}/>
            Данный сайт сделан исключительно в качестве проектной работы ради
            демонстрации моих навыков во frontend, backend разработке, алгоритмах и др.
            В некоторой степени для моего личного удовольствия.
            <br/>
            Подробнее: <a>github проекта</a>
        </p>
    </div>;

    // todo: telegram, email, github ссылка, добавить действия для кнопок, иконки с fontawesome
    // todo: header button hitbox

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: 'transparent'}}>
            <Layout.Header className={styles['header']}>
                {/* Left menu */}
                <Flex>
                    <Button type='link' style={{height: 30, padding: 0}}>
                        <img src='/images/mazegen-logo.png' alt='MazeGen' height='90%'/>
                    </Button>
                </Flex>

                <div style={{flexGrow: 1}}></div>

                {/* Right menu */}
                <Flex align='center' gap={8}>
                    <Button type='text' style={menuBtnStyle}>
                        <UserOutlined style={svgStyle} />
                    </Button>
                    <Button type='text' style={menuBtnStyle}>
                        <HomeOutlined style={svgStyle} onClick={() => gotoPage('/')} />
                    </Button>
                    <Popover placement='bottomLeft' title='MazeGen' trigger='click' content={wtfPopupContent} zIndex={60500}>
                        <Button type='text' style={menuBtnStyle}>
                            <QuestionCircleOutlined style={svgStyle} />
                        </Button>
                    </Popover>

                </Flex>
            </Layout.Header>

            {children}

        </Layout>
    )
}


export default BasicLayout;