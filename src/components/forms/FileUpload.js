import React from 'react';
import {useSelector} from "react-redux";
import Resizer from 'react-image-file-resizer';


const FileUpload = () => {
    const {user} = useSelector(state => ({...state}));

    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        // resize
        const files = e.target.files;

        if (files) {
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        console.log('URI = ', uri);
                    },
                    'base64',
                )
            }
        }

        // send back to server to upload to cloudinary
        // set url to images[] in the parent component - ProductCreate
    }

    return (
        <div className='row'>
            <label className='btn btn-primary'>
                Choose File
                <input
                    type="file"
                    multiple
                    hidden
                    accept='images/*'
                    onChange={fileUploadAndResize}
                />
            </label>
        </div>
    );
};

export default FileUpload;
