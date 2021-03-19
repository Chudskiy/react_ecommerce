import React, {useState, useEffect} from 'react';
import {getProductsByCount} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import {LoadingOutlined} from "@ant-design/icons";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(3)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
    };

    return (
        <>
            <div className='jumbotron'>
                {loading ? (
                    <LoadingOutlined/>
                ) : (
                    <h4>All Products</h4>
                )}
                <div className="container">
                    <div className="row">
                        {products.length && products.map(product => (
                            <div key={product._id} className="col-md-4">
                                <ProductCard product={product}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
