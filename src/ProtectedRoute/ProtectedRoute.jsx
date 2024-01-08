
import { Navigate } from "react-router-dom";
import {useStateValue} from '../context/StateContext'
const ProtectedRoute = ({ Component }) => {
  const { user } = useStateValue();
  
  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
