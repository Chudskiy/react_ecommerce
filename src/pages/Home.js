import React, {useState, useEffect} from 'react';
import {getProductsByCount} from "../functions/product";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(2)
            .then(res => {
                setProducts(res.data);
            })
    };

    return (
        <div>
            <p>Home</p>
            {JSON.stringify(products)}
        </div>
    );
};

export default Home;
