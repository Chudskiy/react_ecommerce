import React from 'react';

const ProductCard = ({product}) => {
    console.log('product = ', product);
    return (
        <div>
            {product.title}
        </div>
    );
};

export default ProductCard;
