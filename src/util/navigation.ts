
import { NavigateFunction } from 'react-router-dom';

// Instead of directly using useNavigate, we'll create a function that accepts a navigate function
export const navigateTo = (navigate: NavigateFunction, path: string) => {
  navigate(path);
};
