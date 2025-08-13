import { GoogleOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { Api } from '../api/api';
import MazeList from '../components/maze-list/MazeList';

const formatDate = dateStr => {
    return new Date(Date.parse(dateStr)).toLocaleString();
    // const date = new Date(Date.parse(dateStr));

    // const dd = String(date.getDate()).padStart(2, '0');
    // const mm = String(date.getMonth() + 1).padStart(2, '0');
    // const yy = String(date.getFullYear()).slice(-2);
    // const hh = String(date.getHours()).padStart(2, '0');
    // const min = String(date.getMinutes()).padStart(2, '0');

    // return `${dd}.${mm}.${yy} ${hh}:${min}`;
};

const UserCard = ({ user }) => {
    const onLogout = () => {
        Api.logoutUser()
            .then(() => (window.location.href = '/')) // reset any state
            .catch(err => console.log("Can't logout: ", err));
    };

    return (
        <Card>
            <Flex gap={16}>
                {user.profilePictureUrl ? (
                    <Avatar size={100} src={user.profilePictureUrl} />
                ) : (
                    <Avatar size={100}>{user.nickname[0]}</Avatar>
                )}
                <div>
                    <div style={{ fontSize: 40 }}>{user.nickname}</div>
                    <div>
                        {user.registrationDate
                            ? `Зарегистрирован: ${formatDate(user.registrationDate)}`
                            : ''}
                    </div>
                    <div>
                        <Button onClick={onLogout}>Выйти</Button>
                    </div>
                </div>
            </Flex>
        </Card>
    );
};

const UnregisteredUserCard = () => {
    const onLoginGoogle = () => {
        window.location.href = '/oauth2/authorization/google';
    };
    return (
        <Card>
            Пользователь не зарегистрирован
            <br />
            <Button onClick={onLoginGoogle} icon={<GoogleOutlined />}>
                Войти с Google
            </Button>
        </Card>
    );
};

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Api.getCurrentUserInfo()
            .then(user => setUser(user))
            .catch(err => console.log('Error while trying to get user info: ', err))
            .finally(() => setLoaded(true));
    }, []);

    if (!loaded) return null;

    return (
        <Flex vertical style={{ margin: '16px 40px' }}>
            {user ? <UserCard user={user} /> : <UnregisteredUserCard />}

            {user ? <MazeList userId={Api.getCurrentUserId()} /> : null}

            {/* <a href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectURI}&response_type=code&client_id=${clientId}&scope=${scope}`}>войти с гугл</a> */}
            {/* <a href={``}>войти с GOOGLE 2.0</a> */}
        </Flex>
    );
};

export default ProfilePage;
