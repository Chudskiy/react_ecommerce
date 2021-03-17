import React, {useState, useEffect} from 'react';
import AdminNav from "../../components/nav/AdminNav";
import {createProduct} from "../../functions/product";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import ProductCreateForm from "../../components/forms/ProductCreateForm";
import {getCategories, getCategorySubs} from "../../functions/category";
import axios from "axios";

const initialState = {
    title: 'Macbook PRO 2020',
    description: 'This is the best Apple product',
    price: '45000',
    categories: [],
    category: '',
    subs: [],
    shipping: 'Yes',
    quantity: '50',
    images: [],
    colors: ['Black', 'White', 'Brown', 'Silver', 'Blue'],
    brands: ['Apple', 'Microsoft', 'Lenovo', 'Samsung', 'ASUS'],
    color: 'White',
    brand: 'Apple',
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);

    const {user} = useSelector(state => ({...state}));

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        getCategories()
            .then((c) => setValues({...values, categories: c.data}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createProduct(values, user.token)
            .then(res => {
                console.log('res = ', res);
                window.alert(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch(err => {
                console.log('err = ', err);
                // if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err);
            })
    };

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();

        console.log('CLICKED CATEGORY = ', e.target.value);
        setValues({...values, category: e.target.value});

        getCategorySubs(e.target.value)
            .then((res) => {
                console.log('res.data = ', res.data);
                setSubOptions(res.data);
            })
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                    <h4>Product create</h4>
                    <br/>

                    {JSON.stringify(values.subs)}

                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}
                        showSub={showSub}
                        setValues={setValues}
                        values={values}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
