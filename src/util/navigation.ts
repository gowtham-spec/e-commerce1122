
import { useNavigate } from 'react-router-dom';

// Export the navigation function to be used across components
export const navigate = (path: string) => {
  const navigate = useNavigate();
  navigate(path);
};
