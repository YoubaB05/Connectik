import { useEffect, useState } from 'react';
import Logo from './logo';

export default function Loading() {
  const [opacity, setOpacity] = useState('opacity-0');

  useEffect(() => {
    // Fade in immediately
    const fadeIn = setTimeout(() => {
      setOpacity('opacity-100');
    }, 0);

    // Fade out after 1.5 seconds
    const fadeOut = setTimeout(() => {
      setOpacity('opacity-0');
    }, 1500);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-off-white
        transition-opacity duration-700 ease-in-out ${opacity}`}
    >
      <Logo className="h-16 w-auto sm:h-20 md:h-24 lg:h-32" />
    </div>
  );
}