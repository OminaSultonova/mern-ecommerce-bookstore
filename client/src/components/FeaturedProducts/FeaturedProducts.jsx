import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { getBooks } from '../../api/book.js';
import { useState, useEffect } from 'react';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBooks();
        setProducts(books);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="featured-products my-4">
      <Container>
        <h3 className="text-center mb-4">All Books</h3>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

FeaturedProducts.propTypes = {
  addToCart: PropTypes.func,
};

export default FeaturedProducts;
