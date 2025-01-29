import { useEffect, useState } from 'react';

interface AppClockProps {
  showSeconds?: boolean;
}

export const AppClock = ({ showSeconds = true }: AppClockProps) => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  );
  
  const [ctime, setTime] = useState(
    new Date().toLocaleTimeString([], { 
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined
    })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString('he-IL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      );
      setTime(
        now.toLocaleTimeString([], { 
          hourCycle: 'h23',
          hour: '2-digit',
          minute: '2-digit',
          second: showSeconds ? '2-digit' : undefined
        })
      )
    }, showSeconds ? 1000 : 60000); // Update every second if showing seconds, otherwise every minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [showSeconds]);

  return (
    <section className="app-clock flex column">
      <div className="date"><h2>{currentDate}</h2></div>
      <h1><time>{ctime}</time></h1>
    </section>
  );
};
