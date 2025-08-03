import { useState, useEffect } from 'react';
import { Download, Check } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

/**
 * PWA Install Button Component
 * Handles browser install prompts with elegant UI
 */
export function InstallButton() {
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

  return (
    <Button
      onClick={handleInstallClick}
      disabled={isInstalling}
      variant="outline"
      size="sm"
      className="gap-2 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
    >
      {isInstalling ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Installing...
        </>
      ) : (
        <>
          <Download size={16} />
          Install App
        </>
      )}
    </Button>
  );
}