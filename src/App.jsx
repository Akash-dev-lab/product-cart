import React from 'react'
import { CartProvider } from './components/CartContext';
import CartItems from './components/CartItems';
import ProductList from './components/ProductList';

const App = () => {

  return (
    <>
      <CartProvider>
        <div className='bg-rose-50'>
          <div className="container mx-auto flex max-md:flex-wrap gap-4 p-6">
            <ProductList />
            <CartItems />
          </div>
        </div>
      </CartProvider>
    </>
  )
}

export default App
