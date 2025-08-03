import { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * PWA Service Worker registration component
 * Handles installation prompts and service worker updates
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
                    toast.info('New version available! Refresh to update.');
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

    // Handle install prompt
    let deferredPrompt: any;
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show custom install toast after a delay
      setTimeout(() => {
        toast.info('Install this app for quick access!', {
          action: {
            label: 'Install',
            onClick: () => {
              if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult: any) => {
                  if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                  }
                  deferredPrompt = null;
                });
              }
            },
          },
          duration: 10000,
        });
      }, 3000);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      toast.success('App installed successfully!');
      deferredPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return null;
}