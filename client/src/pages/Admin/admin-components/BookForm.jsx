// src/components/admin/BookForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../Admin.css';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/books/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch book');
          }
          const data = await response.json();
          setBook(data);
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };

      fetchBook();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: name === 'category' ? value.toLowerCase() : value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = book.image;

      if (selectedFile) {
        const imageRef = ref(storage, `books/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const method = id ? 'PUT' : 'POST';
      const url = id ? `http://localhost:4000/api/books/${id}` : 'http://localhost:4000/api/books';

      const requestBody = {
        ...book,
        category: book.category.toLowerCase(),
        image: imageUrl,
      };

      console.log('Submitting book data:', requestBody);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error('Failed to save book');
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <Container className="my-4">
      <h1>{id ? 'Update Book' : 'Add New Book'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={book.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={book.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={book.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select category</option>
            <option value="malay">Malay</option>
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button className='mt-3 book' variant="success" type="submit">
          {id ? 'Update Book' : 'Add Book'}
        </Button>
      </Form>
    </Container>
  );
};

export default BookForm;
