// src/Signin/SignIn.jsx
import { Button } from 'react-bootstrap';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message');

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Info:', user);

      // Store user data in MongoDB
      const response = await fetch('http://localhost:4000/api/users/storeUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleId: user.uid,
          email: user.email,
          name: user.displayName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to store user data in MongoDB');
      }

      // Redirect to home page after sign-in
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      {message && <h3>{message === 'profile' ? 'Please sign in to access your profile.' : 'Please sign in.'}</h3>}
      <Button
        variant="outline-dark"
        size="md"
        className="mt-3 custom-button"
        onClick={handleGoogleSignIn}
        style={{ transition: 'background-color 0.3s ease, color 0.3s ease' }}
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignIn;
