import React from 'react';
import { useState } from 'react';
import { useCart } from './CartContext';
import OrderConfirmed from './OrderConfirmed'

const CartItems = () => {
    const { items, removeItem, getTotalPrice, getTotalItems, clearCart } = useCart();
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    const handleConfirmOrder = () => {
        setIsOrderConfirmed(true);
    };

    const handleCloseConfirmation = () => {
        setIsOrderConfirmed(false); // Hide the OrderConfirmed component
        clearCart(); // Clears the cart after confirmation
    };

    return (

        <div className="cart-container h-2/4 p-4 font-[akash] bg-white border rounded-lg w-full md:w-2/5">
            <h2 className='font-[akash] text-xl font-bold text-[#e74c3c]'>Your Cart ({getTotalItems()})</h2>

            {/* Conditional rendering for empty cart */}
            {items.length === 0 ? (
                <div className="empty-cart my-6 flex justify-center items-center flex-col">
                    <img className='w-2/4' src="/assets/images/illustration-empty-cart.svg" alt="Empty Cart" />
                    <p className='my-3'>Your added items will appear here</p>
                </div>
            ) : (
                <>
                    <div className="cart-items flex flex-wrap w-full flex-col justify-between  py-2 ">
                        {items.map((item) => (
                            <div key={item.id} className="cart-item flex  justify-between items-center py-2 border-b border-gray-300">
                                <div className="item-details flex flex-col">
                                    <h3>{item.name}</h3>
                                    <p className='m-0 text-[#777]'>{item.quantity}x @ ${item.price.toFixed(2)}</p>
                                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button
                                    className="remove-item-button bg-none border-none text-[#e74c3c] text-xl cursor-pointer"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <img className='border p-1 w-6 rounded-full border-gray-400 ' src="/assets/images/icon-remove-item.svg" alt="" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary pt-4 flex flex-col">
                        <div className='flex justify-between'>
                            <h3>Order Total: </h3>
                            <span className='font-bold text-xl'> ${getTotalPrice()}</span>
                        </div>
                        <div className='flex justify-center gap-2 items-center my-5 bg-rose-50 p-4 rounded-lg'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z" /><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z" /></svg>
                            </span>
                            <p>This is a <span className="carbon-neutral text-[#000] font-bold">carbon-neutral</span> delivery</p>
                        </div>

                       
                        <button onClick={handleConfirmOrder} className="confirm-order-button bg-[#d35400] text-[#fff] border-none rounded-full py-3 px-5 cursor-pointer text-base">
                            Confirm Order
                        </button>
                        
                    </div>
                </>
            )}

            {/* Display OrderConfirmed overlay if order is confirmed */}
            {isOrderConfirmed && <OrderConfirmed onClose={handleCloseConfirmation} />}
        </div>
    );
};

export default CartItems;
