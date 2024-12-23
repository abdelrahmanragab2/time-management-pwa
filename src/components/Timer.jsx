import { useEffect, useState } from 'react';

export function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-4">
      <h2 className="text-lg">Current Time</h2>
      <p className="text-2xl font-mono">{time.toLocaleTimeString()}</p>
    </div>
  );
}
