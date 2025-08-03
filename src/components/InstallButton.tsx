import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

  const [deferredPrompt, setDef

  useEffect(() => {
    const checkInstalled = () => {
      const isInFullscreen = window.matchMedia('(display
      

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
    window.addEventListener
    };

    const handleAppInstalled = () => {
  }, []);
      setDeferredPrompt(null);
    if (!deferredPrompt) return;
        description: 'You can now access TimeZone from your home screen'
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      variant="outline"
      
      {is

        </>
        <>

      )}
  );
















































