import React, {useState, useEffect} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {getCategory, updateCategory} from "../../../functions/category";
import {toast} from "react-toastify";

const CategoryUpdate = ({history, match}) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useSelector(state => ({...state}));

    useEffect(() => {
        loadCategory();
    }, [])

    const loadCategory = () => {
        getCategory(match.params.slug).then(c => setName(c.data.name));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        updateCategory(match.params.slug, {name}, user.token)
            .then(res => {
                setLoading(false);
                setName('');
                toast.success(`"${res.data.name}" is updated`);
                history.push('/admin/category');
            })
            .catch(err => {
                setLoading(false);
                console.log('err = ', err);
                toast.error(err.message);
                if (err.response.status === 400) toast.error(err.response.data);
            })
    };


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
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Update Category</h4>
                        )}
                    {categoryForm()}
                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;
