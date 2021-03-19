import React, {useState, useEffect} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {getProduct, updateProduct} from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import {getCategories, getCategorySubs} from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
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

const ProductUpdate = ({history, match}) => {
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useSelector(state => ({...state}));

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

        setValues({...values, subs: []});
        setSelectedCategory(e.target.value);

        getCategorySubs(e.target.value)
            .then((res) => {
                console.log('CATEGORY SUBS = ', res.data);
                setSubOptions(res.data);
            });
        console.log('EXISTING CATEGORY values.category = ', values.category);

        // if user clicks back to the original category
        // show its sub categories in default
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        //clear old sub categories ids
        setArrayOfSubs([]);
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
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then(res => {
                setLoading(false);
                console.log('PRODUCT UPDATE RESPONSE = ', res);
                toast.success(`"${res.data.title}" is updated`);

                history.push('/admin/products');

            })
            .catch(err => {
                setLoading(false);
                console.log('PRODUCT UPDATE ERROR = ', err);
                toast.error(err.response.data.err);
            })
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
                    {loading ? (
                        <LoadingOutlined className='text-danger h1' />
                    ) : (
                        <h4>Product update</h4>
                    )}

                    {/*{JSON.stringify(values)}*/}

                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    <br />
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        setValues={setValues}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                        values={values}
                    />
                    <hr/>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
