
import React from 'react';
import { CartItem } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (bookId: string) => void;
  onUpdateQuantity: (bookId: string, quantity: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30" aria-modal="true" role="dialog">
      <div className="fixed inset-y-0 right-0 max-w-full w-full sm:w-96 bg-white shadow-xl flex flex-col">
        <div className="p-6 flex items-center justify-between border-b">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600" aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-start space-x-4">
                  <img src={item.coverImageUrl} alt={item.title} className="w-20 h-28 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.author}</p>
                    <p className="text-md font-bold text-indigo-600 mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <input 
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                        className="w-16 text-center border rounded-md"
                      />
                       <button onClick={() => onRemoveItem(item.id)} className="ml-4 text-red-500 hover:text-red-700 text-sm font-semibold">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">Subtotal:</span>
              <span className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
