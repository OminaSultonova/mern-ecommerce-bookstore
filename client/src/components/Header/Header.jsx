import { Carousel, Container } from 'react-bootstrap';
import './Header.css'; // Import the custom CSS for additional styling

const Header = () => {
  return (
    <header>
      <Container>
        <Carousel fade interval={4000} controls={false} className="carousel-wrapper">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/img3.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="img/img2.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="img/img1.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    </header>
  );
};

export default Header;
