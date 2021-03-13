import React, {useState, useEffect} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {createCategory, getCategories, removeCategory} from "../../../functions/category";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import CategoryForm from "../../../components/nav/CategoryForm";

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
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        createCategory({name}, user.token)
            .then(res => {
                setLoading(false);
                setName('');
                toast.success(`"${res.data.name}" is created`);
                loadCategories();
            })
            .catch(err => {
                console.log('err = ', err);
                setLoading(false);
                toast.error(err.message);
                if (err.response.status === 400) toast.error(err.response.data);
            })
    };

    const handleRemove = async (slug) => {
        if (window.confirm('Delete?')) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then(res => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadCategories();
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.date)
                    }
                })
        }
    };


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

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />

                    {categories.map(c => (
                        <div
                            key={c._id}
                            className='alert alert-secondary'
                        >
                            {c.name}
                            <span
                                className='btn btn-small float-right'
                                onClick={() => handleRemove(c.slug)}
                            >
                                <DeleteOutlined className='text-danger'/>
                            </span>
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className='btn btn-small float-right'>
                                 <EditOutlined className='text-warning'/>
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
