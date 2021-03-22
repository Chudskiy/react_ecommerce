import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {StarOutlined} from "@ant-design/icons";
import {Modal} from "antd";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const RatingModal = ({children}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const {user} = useSelector(state => ({...state}));
    const history = useHistory();

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true);
        } else {
            history.push('/login');
        }
    }

    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className='text-danger' />
                <br />
                {user ? 'Leave rating' : 'Login to leave rating'}
            </div>

            <Modal
                title='Leave yor rating'
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    toast.success('Thanks for your review. It will appear soon.')
                }}
                onCancel={() => setModalVisible(false)}
            >{children}</Modal>
        </>
    );
};

export default RatingModal;
