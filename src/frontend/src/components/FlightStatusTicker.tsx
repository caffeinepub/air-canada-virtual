import { useEffect, useState } from 'react';

const statusUpdates = [
  'AC851 • Gate Assignment: A12 • Boarding',
  'AC204 • Pushback Time: 14:35 UTC • On Schedule',
  'AC777 • Load Factor: 87% • Final Call',
  'AC102 • Gate Assignment: B24 • Departed',
  'AC455 • Pushback Time: 16:20 UTC • Delayed 15min',
  'AC639 • Load Factor: 92% • Boarding Complete',
];

export default function FlightStatusTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statusUpdates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-dark border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-airCanadaRed uppercase tracking-wider flex-shrink-0">
            Live Status
          </span>
          <div className="flex-1 overflow-hidden">
            <div
              className="text-sm text-white/80 font-medium whitespace-nowrap transition-transform duration-500"
              style={{ transform: `translateX(${currentIndex * -100}%)` }}
            >
              {statusUpdates.map((update, idx) => (
                <span key={idx} className="inline-block w-full">
                  {update}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
