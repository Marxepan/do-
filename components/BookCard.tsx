
import React from 'react';
import { Book } from '../types';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img className="w-full h-64 object-cover" src={book.coverImageUrl} alt={`Cover for ${book.title}`} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-4">by {book.author}</p>
        <p className="text-gray-700 text-sm mb-4 flex-grow">{book.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-2xl font-bold text-indigo-600">${book.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(book)}
            className="flex items-center bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            aria-label={`Add ${book.title} to cart`}
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
