import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Forțează derularea în vârful paginii la fiecare schimbare de rută sau hash
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null; // Componenta nu randează nimic vizual
}
