import React, {useState, useEffect} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {getProduct} from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import {getCategories, getCategorySubs} from "../../../functions/category";
// import {toast} from "react-toastify";
// import {getCategories, getCategorySubs} from "../../../functions/category";
// import FileUpload from "../../../components/forms/FileUpload";
// import {LoadingOutlined} from "@ant-design/icons";

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'White', 'Brown', 'Silver', 'Blue'],
    brands: ['Apple', 'Microsoft', 'Lenovo', 'Samsung', 'ASUS'],
    color: '',
    brand: '',
};

const ProductUpdate = ({match}) => {
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);

    // const {user} = useSelector(state => ({...state}));

    // router
    const {slug} = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                // 1 load single product
                setValues({...values, ...p.data});
                // 2 load single product category subs
                getCategorySubs(p.data.category._id)
                    .then(res => {
                        setSubOptions(res.data);
                    });
                // 3 prepare array of sub ids to show as default sub values
                const arr = [];
                p.data.subs.map(s => {
                    arr.push(s._id);
                });
                console.log('ARR = ', arr);
                setArrayOfSubs((prev) => arr); // required for ant design select to work
            })
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();

        setValues({...values, subs: [], category: e.target.value});

        getCategorySubs(e.target.value)
            .then((res) => {
                console.log('CATEGORY SUBS = ', res.data);
                setSubOptions(res.data);
            });
    };

    const loadCategories = () => {
        getCategories()
            .then(c => {
                // console.log('categories = ', c.data);
                setCategories(c.data);
            })
            .catch(err => {
                console.log('err = ', err);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //
    };

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                    <h4>Product update</h4>
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        setValues={setValues}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        values={values}
                    />
                    <hr/>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
