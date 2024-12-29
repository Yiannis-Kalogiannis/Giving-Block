import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/UseAuthStore'; // Import Zustand store

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);  // use Zustand store to check if user is authenticated

  return isAuthenticated ? children : <Navigate to="/login" />; // Redirect to login page if user is not authenticated
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
