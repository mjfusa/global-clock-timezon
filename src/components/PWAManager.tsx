import { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * PWA Service Worker registration component
 * Handles service worker updates and background sync
 */
export function PWAManager() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
            
            // Handle updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    toast.info('New version available!', {
                      description: 'Refresh to get the latest features',
                      action: {
                        label: 'Refresh',
                        onClick: () => window.location.reload(),
                      },
                      duration: 8000,
                    });
                  }
                });
              }
            });
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return null;
}