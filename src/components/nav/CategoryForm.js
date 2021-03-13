import React from 'react';

const CategoryForm = ({handleSubmit, name, setName}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type='text'
                    value={name}
                    placeholder='Enter category'
                    onChange={e => setName(e.target.value)}
                    className='form-control'
                    autoFocus
                    required
                />
            </div>
            <br/>
            <button className='btn btn-outline-primary'>
                Save
            </button>
        </form>
    );
};

export default CategoryForm;
