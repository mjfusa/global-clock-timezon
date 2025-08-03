import React from 'react';
import { Clock, Globe } from '@phosphor-icons/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MAJOR_TIMEZONES, type TimezoneInfo } from '@/lib/timezone';

interface TimezoneSelectProps {
  value: string;
  onValueChange: (timezone: string) => void;
  placeholder?: string;
}

export function TimezoneSelect({ value, onValueChange, placeholder = "Select timezone..." }: TimezoneSelectProps) {
  const groupedTimezones = MAJOR_TIMEZONES.reduce((acc, timezone) => {
    if (!acc[timezone.group]) {
      acc[timezone.group] = [];
    }
    acc[timezone.group].push(timezone);
    return acc;
  }, {} as Record<string, TimezoneInfo[]>);

  const groupOrder = ['UTC', 'North America', 'Europe', 'Asia Pacific', 'South America', 'Africa'];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-muted-foreground" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {groupOrder.map(groupName => {
          const timezones = groupedTimezones[groupName];
          if (!timezones) return null;
          
          return (
            <div key={groupName}>
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground border-b border-border">
                {groupName}
              </div>
              {timezones.map(timezone => (
                <SelectItem key={timezone.value} value={timezone.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{timezone.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">{timezone.offset}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          );
        })}
      </SelectContent>
    </Select>
  );
}