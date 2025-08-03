import React from 'react';
import { Database, Cookie, CheckCircle } from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { areCookiesEnabled } from '@/lib/cookies';

interface PersistenceStatusProps {
  className?: string;
}

export function PersistenceStatus({ className }: PersistenceStatusProps) {
  const cookiesSupported = areCookiesEnabled();
  
  return (
    <Card className={className}>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-primary" />
            <span className="text-muted-foreground">KV Storage</span>
            <CheckCircle size={14} className="text-green-500" />
          </div>
          
          <div className="w-px h-4 bg-border"></div>
          
          <div className="flex items-center gap-2">
            <Cookie size={16} className={cookiesSupported ? "text-primary" : "text-muted-foreground"} />
            <span className="text-muted-foreground">Cookie Backup</span>
            {cookiesSupported ? (
              <CheckCircle size={14} className="text-green-500" />
            ) : (
              <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded">
                Disabled
              </span>
            )}
          </div>
        </div>
        
        <p className="text-xs text-center text-muted-foreground mt-2">
          Your preferences are saved with {cookiesSupported ? 'dual' : 'single'} persistence
        </p>
      </CardContent>
    </Card>
  );
}