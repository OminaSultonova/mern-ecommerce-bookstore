import axios from 'axios';


// Base URL for your API
const API_URL = 'http://localhost:4000/api/books';

// Get all books
export const getBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Get a single book by ID
export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with id ${id}:`, error);
        throw error;
    }
};

// Create a new book
export const createBook = async (book) => {
    try {
        const response = await axios.post(API_URL, book);
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

// Update a book by ID
export const updateBook = async (id, updatedBook) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedBook);
        return response.data;
    } catch (error) {
        console.error(`Error updating book with id ${id}:`, error);
        throw error;
    }
};

// Delete a book by ID
export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting book with id ${id}:`, error);
        throw error;
    }
};

// Get books by category
export const getBooksByCategory = async (category) => {
    try {
      const response = await fetch(`${API_URL}?category=${category}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching books in category ${category}:`, error);
      throw error;
    }
  };