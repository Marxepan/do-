
import React from 'react';
import { Book } from '../types';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default BookList;
