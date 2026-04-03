import { createContext, useEffect, useState} from "react";
import {api} from "../utils/api";  

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  const addBook = async (book) => {
    await api.post("/books", book);
    fetchBooks();
  };

  const updateBook = async (id, updated) => {
    await api.put(`/books/${id}`, updated);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await api.delete(`/books/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook, fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };



