import React, { useState, useEffect } from 'react'
import { useCart } from './CartContext';

const AddToCartButton = ({ item }) => {

    const { addItem , removeItem, updateItemQuantity ,clearCartTriggered, resetClearCartTrigger} = useCart();
    const [quantity, setQuantity] = useState(0); // Initialize quantity state
    
    useEffect(() => {
        if (clearCartTriggered) {
            setQuantity(0); // Reset quantity to 0
            resetClearCartTrigger(); // Reset the trigger so it only applies once
        }
    }, [clearCartTriggered, resetClearCartTrigger]);

    const handleAddToCart = () => {
        addItem(item); // Adds the item to the cart
        setQuantity(quantity + 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        addItem(item);
    };

    const decreaseQuantity = () => {
        if (quantity >= 1) {
            setQuantity(quantity - 1); // Decrease the quantity by 1
            updateItemQuantity(item, quantity - 1); // Update item quantity in cart
        } else if (quantity === 1) {
            setQuantity(0); // If quantity is 1, reset to 0
            removeItem(id); // Remove the item completely from the cart
        }
    };

    return (
        <div className='absolute max-2xl:absolute max-xl:absolute max-lg:absolute max-md:absolute max-sm:absolute max-sm:left-14 max-md:left-44 max-md:bottom-20 max-sm:bottom-20 max-lg:bottom-28 max-lg:left-2 bottom-20 left-20 max-xl:left-3 max-2xl:left-10'>
        {quantity === 0 ? (
            <button
                className="add-to-cart-button lg:w-44 lg:p-5 md:w-32 md:text-sm md:h-8 max-md:w-52 flex gap-2 justify-center items-center border-[#562121] text-[#2E0F0F] border font-[akash] rounded-full py-2 max-md:px-4 cursor-pointer font-semibold bg-rose-50 hover:bg-[#eaeaea]"
                onClick={handleAddToCart}
            >
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                        <g fill="#C73B0F" clipPath="url(#a)">
                            <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                            <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path fill="#fff" d="M.333 0h20v20h-20z" />
                            </clipPath>
                        </defs>
                    </svg>
                    </div>
                <div className=''>Add to Cart</div>
            </button>
            ) : (
                <div className="flex max-2xl:w-44 w-44 max-xl:w-44 max-xl:flex max-sm:w-52 items-center max-md:w-52 max-md:text-sm max-lg:w-32 gap-8 py-2 px-4 justify-between text-[#2E0F0F] font-[akash] rounded-full bg-[#D35400]">
                    <button
                        className="border flex justify-center items-center w-6 h-6 max-2xl:flex max-2xl:justify-center max-2xl:items-center max-xl:flex max-xl:justify-center max-xl:w-6 max-xl:h-6 max-xl:items-center max-2xl:w-6 max-2xl:h-6 max-lg:flex max-lg:justify-center max-lg:items-center max-md:w-6 max-md:h-6  rounded-full p-1"
                        onClick={decreaseQuantity}
                    >
                        <img className='max-xl:w-6 max-lg:w-6 max-2xl:w-6 max-2xl:h-6 max-lg:w-6 max-lg:h-6' src="/assets/images/icon-decrement-quantity.svg" alt="" />
                    </button>
                    <span className="text-lg max-lg:text-base font-[akash] text-white font-semibold">{quantity}</span>
                    <button
                        className="border rounded-full p-1"
                        onClick={increaseQuantity}
                    >
                        <img className='w-4' src="/assets/images/icon-increment-quantity.svg" alt="" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddToCartButton