import { Container, Card } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Welcome to the Admin Dashboard</Card.Title>
          <Card.Text>
            Use the sidebar to navigate through the admin panel.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
