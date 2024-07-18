import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

const Products = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooksByCategory = async (category) => {
      try {
        const response = await fetch(`http://localhost:4000/api/books?category=${category.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(`Error fetching books in category ${category}:`, error);
      }
    };

    if (category) {
      fetchBooksByCategory(category);
    } else {
      fetchBooksByCategory('');
    }
  }, [category]);

  return (
    <Container style={{ padding: '20px 0' }}>
      <h2 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Books` : 'All Books'}
      </h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4" style={{ justifyContent: 'center' }}>
        {books.map((book) => (
          <Col key={book._id} style={{ display: 'flex', justifyContent: 'center' }}>
            <ProductCard product={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
