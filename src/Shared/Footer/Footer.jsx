import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <footer className="bg-black text-gray-400 py-4 text-center border-t border-gray-800">
      <div className="container mx-auto px-6">
        <p className="text-sm">
          © {currentYear} Ibrahim Khalil Tushar | Local Time: {formatTime(currentTime)}
        </p>
        <p className="text-xs mt-1">
          MERN Stack Developer
        </p>
      </div>
    </footer>
  );
};

export default Footer;