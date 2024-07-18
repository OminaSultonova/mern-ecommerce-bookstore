import { Container, Row, Col, Card } from 'react-bootstrap';

const stores = [
  {
    id: 1,
    name: 'CAUSEWAY POINT',
    description: '1 Woodlands Square #03-29/30 Causeway Point S(738099)',
  },
  {
    id: 2,
    name: 'HEARTLAND MALL',
    description: 'Blk 205 Hougang Street 21 Heartland Mall-Kovan #03-30 S(530205)',
  },
  {
    id: 3,
    name: 'JUNCTION 8',
    description: '9 Bishan Place #04-02A Junction 8 Shopping Centre S(579837)',
  },
  
];

const StorePage = () => {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="text-center">Store Listings</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        {stores.map((store) => (
          <Col xs={12} sm={6} md={4} className="mb-4" key={store.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={store.image} />
              <Card.Body>
                <Card.Title>{store.name}</Card.Title>
                <Card.Text>{store.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StorePage;

