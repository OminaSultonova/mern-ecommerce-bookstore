import  { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import FontAwesome icons


const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`/admin/products/edit/${product._id}`}>
                  <Button className="me-2" variant="secondary"><FaEdit /></Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(product._id)}> <FaTrash /> </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/admin/products/new">
        <Button variant="success">Add New Product</Button>
      </Link>
    </div>
  );
};

export default ProductsAdmin;
