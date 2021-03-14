import React, {useState} from 'react';
import AdminNav from "../../components/nav/AdminNav";
import {createProduct} from "../../functions/product";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

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

    const {user} = useSelector(state => ({...state}));

    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand
    } = values;

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
                if (err.response.status === 400) toast.error(err.response.data);
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
                    <h4>Product create</h4>
                    <br/>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type='text'
                                name='title'
                                className='form-control'
                                value={title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type='text'
                                name='description'
                                className='form-control'
                                value={description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type='number'
                                name='price'
                                className='form-control'
                                value={price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Shipping</label>
                            <select
                                name="shipping"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option>Please select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type='number'
                                name='quantity'
                                className='form-control'
                                value={quantity}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Color</label>
                            <select
                                name="color"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option>Please select</option>
                                {colors.map(c => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Brand</label>
                            <select
                                name="brand"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option>Please select</option>
                                {brands.map(b => (
                                    <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <br />

                        <button className="btn btn-outline-info">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
