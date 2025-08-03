import { useState, useEffect } from 'react';
import { Check, Monitor } from '@phosphor-icons/react';

/**
 * Shows current PWA installation status
 */
export function InstallStatus() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstalled = () => {
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      const isInFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
      const isIOSInstalled = (window.navigator as any).standalone === true;
      
      setIsInstalled(isInStandaloneMode || isInFullscreen || isIOSInstalled);
    };

    checkInstalled();

    const handleAppInstalled = () => {
      setIsInstalled(true);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isInstalled) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded-full px-3 py-1.5">
      <Check size={14} className="text-green-600" />
      <span>App Installed</span>
    </div>
  );
}