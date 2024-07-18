import { Navbar, Container, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/admin/login'); // Redirect to login page after successful logout
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        {/* Left side with admin avatar */}
        <div className="d-flex align-items-center">
          <Image
            src="https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg"
            roundedCircle
            width="30"
            height="30"
            className="me-2"
            alt="Admin Avatar"
          />
          <Navbar.Brand className='text-dark' href="#">InsideOut admin dashboard</Navbar.Brand>
        </div>

        {/* Right side with sign-out button */}
        <Button
          className='admin-btn'
          variant="dark"
          size='sm'
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
