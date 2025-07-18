import React, { useState, useEffect } from 'react';
import { Flame, Clock } from 'lucide-react';
import { FLASH_SALE_END_TIME } from '../utils/constants';

const FlashSaleBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = FLASH_SALE_END_TIME.getTime() - now;

      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flash-sale-banner">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Flame className="w-6 h-6 text-red-500 animate-pulse" />
          <span className="font-bold text-lg">Flash Sale!</span>
          <span className="text-sm">Up to 50% Off - Limited Time Only!</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Ends in:</span>
          </div>
          <div className="flex space-x-1">
            <div className="bg-black text-white px-2 py-1 rounded text-sm font-bold min-w-[30px] text-center">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <span className="text-sm">:</span>
            <div className="bg-black text-white px-2 py-1 rounded text-sm font-bold min-w-[30px] text-center">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <span className="text-sm">:</span>
            <div className="bg-black text-white px-2 py-1 rounded text-sm font-bold min-w-[30px] text-center">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleBanner;
