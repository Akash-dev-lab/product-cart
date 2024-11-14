import React from 'react';
import { useCart } from './CartContext';
import GetImageSource from './GetImageSource';

const OrderConfirmed = ({ onClose }) => {

    const { items, getTotalPrice } = useCart();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white flex flex-col justify-evenly space-y-4 p-8 rounded-lg shadow-lg w-auto">
                <div className='w-full '>
                    <img className='w-10 h-10' src="/assets/images/icon-order-confirmed.svg" alt="" />
                </div>
                <div className='w-full'>
                    <h2 className="text-2xl font-bold ">Order Confirmed!</h2>
                    <p className=" text-sm text-gray-700">We hope you enjoy your food!</p>
                </div>

                <div className="cart-items flex bg-rose-50 rounded-lg p-4 flex-wrap w-full flex-col justify-between my-3 ">
                    {items.map((item) => {
                        const imageSrc = GetImageSource(item.image)
                        return (
                            <div key={item.id} className="cart-item flex justify-between items-center py-2 border-b border-gray-300">
                                <div className="item-details p- flex flex-col ">
                                    <div className='flex items-center justify-between w-96'>
                                        <div className='flex items-center'>
                                            <img className="w-11 h-11 mr-4 rounded-md" src={imageSrc} alt="image here" />
                                            <div>
                                                <h3 className='font-semibold'>{item.name}</h3>
                                                <p className='m-0 text-[#777]'><span className='text-red-700 font-semibold mr-5'>{item.quantity}x</span> @ ${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className='flex items-center py-4 justify-between'>
                    <h3 className='font-semibold'>Order Total: </h3>
                    <span className='font-bold text-xl'> ${getTotalPrice()}</span>
                </div>
                </div>

                

                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-[#d35400] text-white rounded-full"
                >
                    Start New Order
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmed;
