import { useNavigate } from 'react-router';

export default function useNavigation() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const replace = (path) => {
    navigate(path, { replace: true });
  };

  return { goTo, goBack, goForward, replace };
}
