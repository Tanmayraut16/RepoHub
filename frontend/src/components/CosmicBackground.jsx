import React, { useState, useEffect } from 'react';

const CosmicBackground = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 transition-transform duration-[1500ms] ease-out"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(88, 28, 135, 0.8), rgba(55, 48, 163, 0.9), 
            rgba(15, 23, 42, 1), rgb(2, 6, 23))`,
          backgroundSize: '200% 200%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default CosmicBackground;
