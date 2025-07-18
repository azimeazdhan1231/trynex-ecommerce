// Google Analytics setup for TryneX
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-22BF5BGNSX';

export function initGA() {
  // Only initialize in production or when measurement ID is available
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || GA_MEASUREMENT_ID;
  
  if (!measurementId || import.meta.env.DEV) {
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackPageView(page_path: string, page_title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path,
      page_title: page_title || document.title,
    });
  }
}

export function trackPurchase(transaction_id: string, value: number, items: any[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id,
      value,
      currency: 'BDT',
      items,
    });
  }
}

export function trackAddToCart(item_id: string, item_name: string, value: number) {
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