import React from 'react';
import { Button } from '@/components/ui/button';
import { CLOCK_FACES, type ClockFaceType } from '@/lib/clockTypes';

interface ClockFaceSelectorProps {
  selectedFace: ClockFaceType;
  onFaceChange: (face: ClockFaceType) => void;
}

export function ClockFaceSelector({ selectedFace, onFaceChange }: ClockFaceSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Clock Style</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {CLOCK_FACES.map(face => (
          <Button
            key={face.id}
            variant={selectedFace === face.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFaceChange(face.id)}
            className="flex flex-col h-auto p-3 text-xs"
          >
            <span className="font-medium">{face.name}</span>
            <span className="text-xs text-muted-foreground mt-1 text-center leading-tight">
              {face.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}