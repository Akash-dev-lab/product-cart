import React, { createContext, useContext, useReducer, useState } from 'react';

// Create a Context for the Cart
const CartContext = createContext();

// Cart reducer to handle actions
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            // Check if the item already exists in the cart
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex >= 0) {
                // Update quantity of the existing item
                const updatedItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return { ...state, items: updatedItems };
            } else {
                // Add new item to the cart
                return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
            }
        case 'REMOVE_ITEM':
            // Remove item from the cart
            const filteredItems = state.items.filter(item => item.id !== action.payload);
            return { ...state, items: filteredItems };
        case 'CLEAR_CART':
            // Clear all items from the cart
            return { ...state, items: [] };
        case 'UPDATE_ITEM':
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

// Initial state for the cart
const initialState = {
    items: [], // Array to hold cart items
};

// CartProvider component to wrap around the app or part of the app that needs access to the cart
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [clearCartTriggered, setClearCartTriggered] = useState(false);

    // Function to add an item to the cart
    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    // Function to remove an item from the cart
    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    // Function to clear the entire cart
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
        setClearCartTriggered(true);
    };

    const updateItemQuantity = (item, newQuantity) => {
        if (newQuantity > 0) {
            // Update the quantity of the item if it's greater than 0
            const updatedItems = state.items.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
            );
            dispatch({ type: 'UPDATE_ITEM', payload: updatedItems });
        } else {
            // If newQuantity is 0 or less, remove the item
            removeItem(item.id);
        }
    }
    
    const resetClearCartTrigger = () => {
        setClearCartTriggered(false);
    };

    // Function to calculate the total price of items in the cart
    const getTotalPrice = () => {
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Function to calculate the total number of items in the cart
    const getTotalItems = () => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ items: state.items, addItem, clearCartTriggered, updateItemQuantity ,resetClearCartTrigger ,removeItem ,clearCart, getTotalPrice, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
