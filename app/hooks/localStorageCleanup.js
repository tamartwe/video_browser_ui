import { useEffect } from 'react';

const useLocalStorageCleanup = () => {
  useEffect(() => {
    const handleCleanup = () => {
      localStorage.clear(); // Clear all items in localStorage
    };

    window.addEventListener('beforeunload', handleCleanup);

    return () => {
      window.removeEventListener('beforeunload', handleCleanup);
    };
  }, []);
};

export default useLocalStorageCleanup;