import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

 */
  const [deferredPrompt, setDef
  const [isInstalling, setIsInstalling] = useState
  u
    const checkInstalled = () => 
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      const isInFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
      const isIOSInstalled = (window.navigator as any).standalone === true;
      
      setIsInstalled(isInStandaloneMode || isInFullscreen || isIOSInstalled);
    };

    checkInstalled();

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      toast.success('App installed successfully!', {
        description: 'You can now access TimeZone from your home screen'
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);
    
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        toast.info('Install cancelled', {
          description: 'You can install later from your browser menu'
        });
      }
    } catch (error) {
      console.error('Install prompt failed:', error);
      toast.error('Installation failed', {
        description: 'Please try installing from your browser menu'
      });
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  };

  // Don't show button if already installed or no install prompt available
  if (isInstalled || !deferredPrompt) {
    return null;
  }

      {isI
          <
        </>
        <>
          Install App
      )}
  );














