import React from 'react'; // Import useState
import GetImageSource from './GetImageSource';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({ item }) => {
    const imageSrc = GetImageSource(item.image);

    return (
            <div className="product-card relative sm:relative md:relative font-[akash]">
                <img src={imageSrc} alt={item.name} className="w-screen object-cover rounded-md mb-4" />
                <div className='pt-4'>
                <p className='text-[#785E57] text-base'>{item.category}</p>
                <h3>{item.name}</h3>
                <p className='text-[#D35400] font-semibold'>${item.price.toFixed(2)}</p>
                <AddToCartButton item={item} />
                </div>
            </div>
    );
};

export default ProductCard;
