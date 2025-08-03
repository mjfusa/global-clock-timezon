import { useState, useEffect } from 'react';
import { WifiX, WifiHigh } from '@phosphor-icons/react';
import { toast } from 'sonner';

/**
 * Component that displays network status and shows notifications
 * when the app goes online/offline
 */
export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back online!', {
        icon: <WifiHigh size={16} />,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('You\'re offline. The app will continue to work with cached data.', {
        icon: <WifiX size={16} />,
        duration: 5000,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-muted border border-border rounded-lg px-3 py-2 shadow-lg flex items-center gap-2 text-sm">
      <WifiX size={16} className="text-muted-foreground" />
      <span className="text-muted-foreground">Offline mode</span>
    </div>
  );
}