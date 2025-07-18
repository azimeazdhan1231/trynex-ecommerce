import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/lib/analytics';

// Hook to track page views automatically when routes change
export function useAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location);
  }, [location]);

  return null;
}

// Hook for tracking custom events
export function useTrackEvent() {
  return {
    trackEvent: (action: string, category: string, label?: string, value?: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }
    },
    trackPurchase: (transaction_id: string, value: number, items: any[]) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase', {
          transaction_id,
          value,
          currency: 'BDT',
          items,
        });
      }
    },
    trackAddToCart: (item_id: string, item_name: string, value: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'add_to_cart', {
          currency: 'BDT',
          value,
          items: [{
            item_id,
            item_name,
            quantity: 1,
          }],
        });
      }
    }
  };
}