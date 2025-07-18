import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-[#d4af37] to-[#f4e88a] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-white text-xl font-bold mb-2">TryneX</h2>
        <p className="text-white/80">Loading Premium Experience...</p>
      </div>
    </div>
  );
}
