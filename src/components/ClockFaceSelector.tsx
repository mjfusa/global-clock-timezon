import React from 'react';
import { Button } from '@/components/ui/button';
import { CLOCK_FACES, type ClockFaceType } from '@/lib/clockTypes';

interface ClockFaceSelectorProps {
  selectedFace: ClockFaceType;
  onFaceChange: (face: ClockFaceType) => void;
}

const PreviewIcon = ({ face }: { face: ClockFaceType }) => {
  const size = 24;
  const radius = size / 2;
  const centerX = radius;
  const centerY = radius;

  switch (face) {
    case 'classic':
      return (
        <svg width={size} height={size} className="mb-1">
          <circle cx={centerX} cy={centerY} r={radius - 2} fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={1} />
          <text x={centerX} y={centerY - 6} textAnchor="middle" fontSize="6" fill="currentColor">XII</text>
          <text x={centerX + 6} y={centerY + 2} textAnchor="middle" fontSize="6" fill="currentColor">III</text>
          <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - 6} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={centerX} y1={centerY} x2={centerX + 4} y2={centerY} stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
          <circle cx={centerX} cy={centerY} r={1} fill="currentColor" />
        </svg>
      );
    case 'modern':
      return (
        <svg width={size} height={size} className="mb-1">
          <circle cx={centerX} cy={centerY} r={radius - 2} fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={1.5} />
          <text x={centerX} y={centerY - 6} textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">12</text>
          <text x={centerX + 6} y={centerY + 2} textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">3</text>
          <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - 6} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          <line x1={centerX} y1={centerY} x2={centerX + 5} y2={centerY} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          <circle cx={centerX} cy={centerY} r={1.5} fill="currentColor" />
        </svg>
      );
    case 'minimal':
      return (
        <svg width={size} height={size} className="mb-1">
          <circle cx={centerX} cy={centerY} r={radius - 2} fill="none" stroke="currentColor" strokeWidth={0.5} />
          <circle cx={centerX} cy={centerY - 8} r={1} fill="currentColor" />
          <circle cx={centerX + 8} cy={centerY} r={1} fill="currentColor" />
          <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - 5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={centerX} y1={centerY} x2={centerX + 4} y2={centerY} stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
          <circle cx={centerX} cy={centerY} r={1} fill="currentColor" />
        </svg>
      );
    case 'digital':
      return (
        <div className="text-[10px] font-mono font-bold leading-none mb-1">
          12:34
        </div>
      );
    case 'luxury':
      return (
        <svg width={size} height={size} className="mb-1">
          <circle cx={centerX} cy={centerY} r={radius - 1} fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={2} />
          <circle cx={centerX} cy={centerY} r={radius - 4} fill="none" stroke="currentColor" strokeWidth={0.5} />
          <circle cx={centerX} cy={centerY - 6} r={2} fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={0.5} />
          <text x={centerX} y={centerY - 5} textAnchor="middle" fontSize="5" fontWeight="bold" fill="currentColor">12</text>
          <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - 5} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          <line x1={centerX} y1={centerY} x2={centerX + 4} y2={centerY} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          <circle cx={centerX} cy={centerY} r={1.5} fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};

export function ClockFaceSelector({ selectedFace, onFaceChange }: ClockFaceSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Clock Style</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {CLOCK_FACES.map(face => (
          <Button
            key={face.id}
            variant={selectedFace === face.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFaceChange(face.id)}
            className={`flex flex-col h-auto p-4 text-xs transition-all duration-200 ${
              selectedFace === face.id 
                ? 'ring-2 ring-ring ring-offset-2 shadow-md' 
                : 'hover:shadow-sm hover:scale-105'
            }`}
          >
            <div className="flex items-center justify-center h-8 mb-2">
              <PreviewIcon face={face.id} />
            </div>
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