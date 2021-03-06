import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Menu} from 'antd';
import {
    AppstoreOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Link, useHistory} from "react-router-dom";
import firebase from 'firebase';


const {SubMenu, Item} = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home');

    const dispatch = useDispatch();
    const {user} = useSelector(state => ({...state}));
    const history = useHistory();

    const handleClick = (e) => {
        // console.log('e.key = ', e.key);
        setCurrent(e.key);
    }

    const handleLogout = () => {
        firebase.auth().signOut();

        dispatch({
            type: 'LOGOUT',
            payload: null,
        })
        history.push('/login');
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined/>}>
                <Link to='/'>Home</Link>
            </Item>

            {user && (
                <SubMenu
                    key="SubMenu" icon={<SettingOutlined/>}
                    title={user.email && user.email.split('@')[0]}
                    className='float-right'
                >

                    {user && user.role === 'subscriber' && (
                        <Item>
                            <Link to='/user/history'>Dashboard</Link>
                        </Item>
                    )}

                    {user && user.role === 'admin' && (
                        <Item>
                            <Link to='/admin/dashboard'>Dashboard</Link>
                        </Item>
                    )}

                    <Item
                        icon={<LogoutOutlined/>}
                        onClick={handleLogout}
                    >Logout</Item>
                </SubMenu>
            )}

            {!user && (
                <Item
                    key="register"
                    icon={<UserAddOutlined/>}
                    className='float-right'
                >
                    <Link to='/register'>Register</Link>
                </Item>
            )}

            {!user && (
                <Item
                    key="login"
                    icon={<UserOutlined/>}
                    className='float-right'
                >
                    <Link to='/login'>Login</Link>
                </Item>
            )}

        </Menu>
    );
};

export default Header;
