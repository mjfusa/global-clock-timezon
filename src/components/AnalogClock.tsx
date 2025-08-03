import React from 'react';
import { ClockFaceType } from '@/lib/clockTypes';

interface AnalogClockProps {
  time: Date;
  timezone: string;
  clockFace: ClockFaceType;
  size?: number;
}

export function AnalogClock({ time, timezone, clockFace, size = 200 }: AnalogClockProps) {
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours * 30) + (minutes * 0.5) - 90;
  const minuteAngle = (minutes * 6) - 90;
  const secondAngle = (seconds * 6) - 90;

  const radius = size / 2;
  const centerX = radius;
  const centerY = radius;

  const getHourMarkLength = (hour: number) => {
    if (clockFace === 'minimal') return 8;
    return hour % 3 === 0 ? 15 : 10;
  };

  const renderRomanNumeral = (num: number) => {
    const romans = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    return romans[num];
  };

  const renderHourMarkers = () => {
    const markers = [];
    
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30) - 90;
      const radian = (angle * Math.PI) / 180;
      
      if (clockFace === 'classic') {
        const x = centerX + Math.cos(radian) * (radius - 25);
        const y = centerY + Math.sin(radian) * (radius - 25);
        markers.push(
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-sm font-medium"
            style={{ fontSize: '14px' }}
          >
            {renderRomanNumeral(i)}
          </text>
        );
      } else if (clockFace === 'digital') {
        // No markers for digital
        return null;
      } else if (clockFace === 'minimal') {
        const x1 = centerX + Math.cos(radian) * (radius - 15);
        const y1 = centerY + Math.sin(radian) * (radius - 15);
        const x2 = centerX + Math.cos(radian) * (radius - 5);
        const y2 = centerY + Math.sin(radian) * (radius - 5);
        
        if (i % 3 === 0) {
          markers.push(
            <circle
              key={i}
              cx={x1}
              cy={y1}
              r="2"
              className="fill-current"
            />
          );
        }
      } else {
        const markLength = getHourMarkLength(i);
        const x1 = centerX + Math.cos(radian) * (radius - markLength);
        const y1 = centerY + Math.sin(radian) * (radius - markLength);
        const x2 = centerX + Math.cos(radian) * (radius - 5);
        const y2 = centerY + Math.sin(radian) * (radius - 5);
        
        markers.push(
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={`stroke-current ${i % 3 === 0 ? 'stroke-2' : 'stroke-1'}`}
            strokeLinecap="round"
          />
        );

        if (clockFace === 'modern' && i % 3 === 0) {
          const x = centerX + Math.cos(radian) * (radius - 30);
          const y = centerY + Math.sin(radian) * (radius - 30);
          markers.push(
            <text
              key={`num-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current text-xs font-semibold"
            >
              {i === 0 ? 12 : i}
            </text>
          );
        }

        if (clockFace === 'luxury' && i % 3 === 0) {
          const x = centerX + Math.cos(radian) * (radius - 25);
          const y = centerY + Math.sin(radian) * (radius - 25);
          markers.push(
            <text
              key={`num-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current text-sm font-bold"
            >
              {i === 0 ? 12 : i}
            </text>
          );
        }
      }
    }
    
    return markers;
  };

  const getHandStyles = () => {
    switch (clockFace) {
      case 'luxury':
        return {
          hour: 'stroke-2 stroke-current drop-shadow-sm',
          minute: 'stroke-2 stroke-current drop-shadow-sm',
          second: 'stroke-1 stroke-accent'
        };
      case 'modern':
        return {
          hour: 'stroke-3 stroke-current',
          minute: 'stroke-2 stroke-current',
          second: 'stroke-1 stroke-accent'
        };
      case 'minimal':
        return {
          hour: 'stroke-2 stroke-current opacity-80',
          minute: 'stroke-1 stroke-current opacity-80',
          second: 'stroke-1 stroke-accent opacity-60'
        };
      default:
        return {
          hour: 'stroke-2 stroke-current',
          minute: 'stroke-2 stroke-current',
          second: 'stroke-1 stroke-accent'
        };
    }
  };

  if (clockFace === 'digital') {
    return (
      <div 
        className="flex items-center justify-center bg-card border rounded-lg shadow-sm"
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-foreground tabular-nums">
            {time.toLocaleTimeString('en-US', {
              timeZone: timezone,
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {time.toLocaleDateString('en-US', {
              timeZone: timezone,
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    );
  }

  const handStyles = getHandStyles();
  const hourHandLength = radius * 0.5;
  const minuteHandLength = radius * 0.7;
  const secondHandLength = radius * 0.8;

  const hourX = centerX + Math.cos((hourAngle * Math.PI) / 180) * hourHandLength;
  const hourY = centerY + Math.sin((hourAngle * Math.PI) / 180) * hourHandLength;

  const minuteX = centerX + Math.cos((minuteAngle * Math.PI) / 180) * minuteHandLength;
  const minuteY = centerY + Math.sin((minuteAngle * Math.PI) / 180) * minuteHandLength;

  const secondX = centerX + Math.cos((secondAngle * Math.PI) / 180) * secondHandLength;
  const secondY = centerY + Math.sin((secondAngle * Math.PI) / 180) * secondHandLength;

  return (
    <div className="relative">
      <svg width={size} height={size} className="text-foreground">
        {/* Clock face background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius - 5}
          className={`fill-card stroke-border stroke-2 ${
            clockFace === 'luxury' ? 'drop-shadow-lg' : 'drop-shadow-sm'
          }`}
        />
        
        {/* Hour markers */}
        {renderHourMarkers()}
        
        {/* Clock hands */}
        <line
          x1={centerX}
          y1={centerY}
          x2={hourX}
          y2={hourY}
          className={handStyles.hour}
          strokeLinecap="round"
        />
        
        <line
          x1={centerX}
          y1={centerY}
          x2={minuteX}
          y2={minuteY}
          className={handStyles.minute}
          strokeLinecap="round"
        />
        
        <line
          x1={centerX}
          y1={centerY}
          x2={secondX}
          y2={secondY}
          className={handStyles.second}
          strokeLinecap="round"
          style={{
            transition: seconds === 0 ? 'none' : 'transform 0.1s ease-out',
          }}
        />
        
        {/* Center dot */}
        <circle
          cx={centerX}
          cy={centerY}
          r={clockFace === 'luxury' ? 4 : 3}
          className={`fill-current ${clockFace === 'luxury' ? 'drop-shadow-sm' : ''}`}
        />
      </svg>
    </div>
  );
}