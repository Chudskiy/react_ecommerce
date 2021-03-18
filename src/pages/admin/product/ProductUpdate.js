import React, {useEffect} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {createProduct} from "../../../functions/product";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import {getCategories, getCategorySubs} from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from "@ant-design/icons";


const ProductUpdate = () => {
    const {user} = useSelector(state => ({...state}));

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                    <h4>Product update</h4>
                    <hr/>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
