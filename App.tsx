
import React, { useState, useEffect, useCallback } from 'react';
import { Book, CartItem } from './types';
import { generateBookData } from './services/geminiService';
import Header from './components/Header';
import BookList from './components/BookList';
import ShoppingCart from './components/ShoppingCart';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedBooks = await generateBookData();
      // Add a unique ID to each book for cart management
      const booksWithIds = generatedBooks.map((book, index) => ({...book, id: `book-${Date.now()}-${index}`}));
      setBooks(booksWithIds);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = (bookToAdd: Book) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === bookToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === bookToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...bookToAdd, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = async (bookId: string) => {
    setUpdatingItemId(bookId);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async operation
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
    setUpdatingItemId(null);
  };

  const handleUpdateQuantity = async (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      await handleRemoveFromCart(bookId);
    } else {
      setUpdatingItemId(bookId);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async operation
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === bookId ? { ...item, quantity } : item
        )
      );
      setUpdatingItemId(null);
    }
  };


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={toggleCart} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Featured Books</h1>
        {isLoading && (
           <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
           </div>
        )}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}
        {!isLoading && !error && <BookList books={books} onAddToCart={handleAddToCart} />}
      </main>
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        updatingItemId={updatingItemId}
      />
      <Footer />
    </div>
  );
};

export default App;
