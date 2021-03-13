import React, {useState, useEffect} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {createCategory, getCategories} from "../../../functions/category";
import {toast} from "react-toastify";

const CategoryCreate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState('');
    const [categories, setCategories] = useState([]);

    const {user} = useSelector(state => ({...state}));

    useEffect(() => {
        loadCategories();

    }, [])

    const loadCategories = () => {
        getCategories().then(c => setCategories(c.data));
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        createCategory({name}, user.token)
            .then(res => {
                setLoading(false);
                setName('');
                toast.success(`"${res.data.name}" is created`);
            })
            .catch(err => {
                console.log('err = ', err);
                setLoading(false);
                toast.error(err.message);
                if (err.response.status === 400) toast.error(err.response.data);
            })
    }

    const categoryForm = () => (
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
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className='text-danger'>Loading...</h4>
                    ) : (
                        <h4>Create Category</h4>
                    )}
                    {categoryForm()}
                    {JSON.stringify(categories)}
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
