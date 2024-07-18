import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/orders/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/admin/orders/order/${id}`);
  };


  return (
     <div>
      <h2>Orders</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} onClick={() => handleRowClick(order._id)}>
                <td>{order._id}</td>
                <td>{order.userDetails ? order.userDetails.googleId : 'N/A'}</td>
                <td>{order.userDetails ? order.userDetails.name : 'N/A'}</td>
                <td>{order.status}</td>
                <td>{new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(order.totalAmount / 100)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  
                  <Button variant="danger" onClick={() => handleDelete(order._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  
  );
};

export default Orders;
