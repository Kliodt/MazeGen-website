import { HomeOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { Api } from '../api/api';
import useGotoPage from '../hooks/useGotoPage';
import styles from './header-and-body-layout.module.css';

const wtfPopupContent = (
    <div>
        <div style={{ maxWidth: 400 }}>
            <img
                src='/images/meme.jpg'
                alt=''
                style={{ maxHeight: 200, margin: '10px auto', display: 'block' }}
            />
            <p>
                Данный сайт сделан качестве проектной работы ради демонстрации моих
                навыков во frontend, backend разработке, алгоритмах и др. А также для
                моего личного удовольствия.
            </p>
            Подробнее на Гитхабе проекта:
            <ul style={{ margin: 3, paddingLeft: 20 }}>
                <li>
                    <a href='https://github.com/Kliodt/MazeGen-website'>frontend</a>
                </li>
                <li>
                    <a href='https://github.com/Kliodt/MazeGen-backend'>backend</a>
                </li>
            </ul>
        </div>
    </div>
);

/**
 * Simple layout that adds header
 */
const HeaderAndBodyLayout = ({ children }) => {
    const menuBtnStyle = { height: 30, width: 30 };
    const svgStyle = { color: 'white', fontSize: 20 };

    const gotoPage = useGotoPage();
    const [user, setUser] = useState(null);

    useEffect(() => {
        Api.getCurrentUserInfo()
            .then(user => setUser(user))
            .catch(err => console.log('Error while trying to get user info: ', err));
    }, []);

    const onProfileClick = () => gotoPage('/profile');

    const header = (
        <>
            {/* Left menu */}
            <Flex className={styles['header-menu']} align='center'>
                <Button type='link' style={{ padding: 0 }} onClick={() => gotoPage('/')}>
                    <img src='/images/mazegen-logo.png' alt='MazeGen' height='24px' />
                </Button>
            </Flex>

            <div style={{ flexGrow: 1 }}></div>

            {/* Right menu */}
            <Flex align='center' gap={8} className={styles['header-menu']}>
                <Button type='text' style={menuBtnStyle} onClick={() => gotoPage('/')}>
                    <HomeOutlined style={svgStyle} />
                </Button>
                <Popover
                    title='MazeGen'
                    trigger='click'
                    content={wtfPopupContent}
                    zIndex={5005}
                    placement='bottomLeft'
                >
                    <Button type='text' style={menuBtnStyle}>
                        <QuestionCircleOutlined style={svgStyle} />
                    </Button>
                </Popover>
                {user ? (
                    <Button type='link' style={{ padding: 0 }}>
                        {user.profilePictureUrl ? (
                            <Avatar
                                src={user.profilePictureUrl}
                                size={30}
                                onClick={onProfileClick}
                            />
                        ) : (
                            <Avatar style={svgStyle} onClick={onProfileClick}>
                                {user.nickname[0]}
                            </Avatar>
                        )}
                    </Button>
                ) : (
                    <Button type='text' style={menuBtnStyle} onClick={onProfileClick}>
                        <UserOutlined style={svgStyle} />
                    </Button>
                )}
            </Flex>
        </>
    );

    // todo: telegram, email, github ссылка, добавить действия для кнопок, иконки с fontawesome

    return (
        <>
            <header className={styles['header']}>{header}</header>
            <div className={styles['main-content']}>{children}</div>
        </>
    );
};

export default HeaderAndBodyLayout;
