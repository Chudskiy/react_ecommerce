import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {StarOutlined} from "@ant-design/icons";
import {Modal} from "antd";
import {toast} from "react-toastify";

const RatingModal = ({children}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const {user} = useSelector(state => ({...state}));
    return (
        <>
            <div onClick={() => setModalVisible(true)}>
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
