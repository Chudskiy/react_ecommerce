import React, {useState, useEffect} from 'react';
import {getProduct, productStar} from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import {useSelector} from "react-redux";

const Product = ({match}) => {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);

    const {user} = useSelector(state => ({...state}));
    const {slug} = match.params;

    useEffect(() => {
        loadSingleProduct();
    }, [slug])

    const loadSingleProduct = () =>
        getProduct(slug)
            .then(res => setProduct(res.data));

    const onStarClick = (newRating, name) => {
        setStar(newRating);

        // console.log('newRating, name = ', newRating, name);
        // console.log('user.token = ', user.token);

        productStar(name, newRating, user.token)
            .then(res => {
                console.log('rating clicked! = ', res.data);
                loadSingleProduct();
            })
            .catch(err => {
                console.log('err = ', err);
            })
    };

    return (
        <div className='container-fluid'>
            <div className="row pt-4">
                <SingleProduct
                    product={product}
                    onStarClick={onStarClick}
                    star={star}
                />
            </div>

            <div className="row">
                <div className='col text-center pt-5 pb-5'>
                    <hr/>
                    <h4>Related Products</h4>
                    <hr/>
                </div>
            </div>
        </div>
    );
};

export default Product;
