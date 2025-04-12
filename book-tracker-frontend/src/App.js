import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
         .then(res => setBooks(res.data));
  }, []);

  const addBook = () => {
    axios.post('http://localhost:8080/api/books', { title, author, read: false })
         .then(res => setBooks([...books, res.data]));
  };

  const toggleRead = (id, read) => {
    axios.put(`http://localhost:8080/api/books/${id}`, { read: !read })
         .then(() => {
           setBooks(books.map(book =>
             book.id === id ? { ...book, read: !read } : book
           ));
         });
  };

  const deleteBook = id => {
    axios.delete(`http://localhost:8080/api/books/${id}`)
         .then(() => setBooks(books.filter(book => book.id !== id)));
  };

  return (
    <div>
      <h1>Book Tracker</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <button onClick={addBook}>Add Book</button>

      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} [{book.read ? "Read" : "Unread"}]
            <button onClick={() => toggleRead(book.id, book.read)}>Toggle</button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
