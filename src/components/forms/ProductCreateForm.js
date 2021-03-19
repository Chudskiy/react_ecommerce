import React from 'react';
import {Select} from "antd";

const {Option} = Select;

const ProductCreateForm = ({
                               handleSubmit,
                               handleChange,
                               handleCategoryChange,
                               subOptions,
                               showSub,
                               setValues,
                               values
                           }) => {
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

    return (
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
                <Select
                    name="shipping"
                    className="form-control"
                    onChange={handleChange}
                >
                    <Option>Please select</Option>
                    <Option value="No">No</Option>
                    <Option value="Yes">Yes</Option>
                </Select>
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
                <Select
                    name="color"
                    className="form-control"
                    onChange={handleChange}
                >
                    <Option>Please select</Option>
                    {colors.map(c => (
                        <Option key={c} value={c}>
                            {c}
                        </Option>
                    ))}
                </Select>
            </div>

            <div className="form-group">
                <label>Brand</label>
                <Select
                    name="brand"
                    className="form-control"
                    onChange={handleChange}
                >
                    <Option>Please select</Option>
                    {brands.map(b => (
                        <Option key={b} value={b}>
                            {b}
                        </Option>
                    ))}
                </Select>
            </div>
            <br/>
            <div className="form-group">
                <label>Category</label>
                <Select
                    name='category'
                    className='form-control'
                    onChange={handleCategoryChange}
                >
                    <Option>Please select</Option>

                    {categories.length > 0 && categories.map(c => (
                        <Option key={c._id} value={c._id}>
                            {c.name}
                        </Option>
                    ))}
                </Select>
            </div>

            {showSub && (
                <div>
                    <label>Sub Categories</label>
                    <Select
                        mode='multiple'
                        style={{width: '100%'}}
                        placeholder='Please select'
                        value={subs}
                        name='subs'
                        onChange={value => setValues({...values, subs: value})}
                    >
                        {subOptions.length && subOptions.map(s => (
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>
                        ))}
                    </Select>
                </div>
            )}
            <br />
            <button className="btn btn-outline-info">Save</button>
        </form>
    );
};

export default ProductCreateForm;
