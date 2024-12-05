import { useEffect, useState } from 'react';

export const AppClock = () => {
  // get the current date in this format "DD-MM-YYYY"
  const currentDate= new Date().toLocaleDateString();
  const [ctime, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); // Updates every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <section className="app-clock flex column">
      <div className="date"><h2>{currentDate}</h2></div>
      <h1><time>{ctime}</time></h1>
    </section>
  );
};
