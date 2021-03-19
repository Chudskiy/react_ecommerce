import React from 'react';
import {useSelector} from "react-redux";
import Resizer from 'react-image-file-resizer';
import axios from "axios";
import {Avatar, Badge} from "antd";


const FileUpload = ({values, setValues, setLoading}) => {
    const {user} = useSelector(state => ({...state}));

    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        // resize
        const files = e.target.files;
        const allUploadedFiles = values.images;


        if (files) {
            setLoading(true);

            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        // console.log('URI = ', uri);
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri}, {
                                headers: {
                                    authtoken: user ? user.token : '',
                                }
                            }
                        )
                            .then(res => {
                                console.log('IMAGE UPLOAD RES DATA = ', res);
                                setLoading(false);
                                allUploadedFiles.push(res.data);

                                setValues({...values, images: allUploadedFiles});
                            })
                            .catch(err => {
                                setLoading(false);
                                console.log('CLOUDINARY UPLOAD ERROR = ', err)
                            })
                    },
                    'base64',
                )
            }
        }

        // send back to server to upload to cloudinary
        // set url to images[] in the parent component - ProductCreate
    };

    const handleImageRemove = (public_id) => {
        setLoading(true);

        //console.log('image to remove = ', public_id);
        axios.post(`${process.env.REACT_APP_API}/removeimage`,
            {public_id},
            {
            headers: {
                authtoken: user ? user.token : '',
            }
        })
            .then(res => {
                setLoading(false);

                console.log('RESPONSE = ', res);

                const {images} = values;
                console.log('images = ', images);
                const filteredImages = images.filter(item => {
                    return item.public_id !== public_id;
                });

                setValues({...values, images: filteredImages});
            })
            .catch(err => {
                setLoading(false);
                console.log('err = ', err);
            })
    };

    return (
        <>
            <div className="row">
                {values.images && values.images.map(image => (
                    <Badge
                        count={'X'}
                        key={image.public_id}
                        onClick={() => handleImageRemove(image.public_id)}
                        style={{cursor: 'pointer'}}
                    >
                        <Avatar
                            src={image.url}
                            size={100}
                            shape='square'
                            className='ml-3'
                        />
                    </Badge>
                ))}
            </div>
            <div className='row'>
                <label className='btn btn-primary btn-raised mt-3'>
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
        </>
    );
};

export default FileUpload;
