import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  children: React.ReactNode;
};

export default function ProvateRoute({ children }: Props) {
  const { user } = useAuth();
  return user ? children : <Navigate to='/login' />;
}
