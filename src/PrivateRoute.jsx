import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../src/redax/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
 
  const isAuth = !isLoggedIn;

  return isAuth ? <Navigate to={redirectTo} /> : component;
}