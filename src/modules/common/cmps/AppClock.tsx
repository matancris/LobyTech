import { useEffect, useState } from 'react';

export const AppClock = () => {
    const [ctime, setTime] = useState(new Date().toLocaleTimeString());
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000); // Updates every second
  
      return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);
  
    return (
      <section className="app-clock">
            <time>{ctime}</time>
      </section>
    );
  };
