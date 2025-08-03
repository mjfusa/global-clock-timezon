import React from 'react';
import { ClockFaceType } from '@/lib/clockTypes';

interface AnalogClockProps {
  time: Date;
  timezone: string;
  clockFace: ClockFaceType;
  size?: number;
}

export function AnalogClock({ time, timezone, clockFace, size = 200 }: AnalogClockProps) {
  // Get timezone-adjusted time
  const timeInZone = new Date(time.toLocaleString("en-US", { timeZone: timezone }));
  const hours = timeInZone.getHours() % 12;
  const minutes = timeInZone.getMinutes();
  const seconds = timeInZone.getSeconds();

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
        const x = centerX + Math.cos(radian) * (radius - 28);
        const y = centerY + Math.sin(radian) * (radius - 28);
        markers.push(
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-sm font-bold tracking-wide"
            style={{ 
              fontSize: '16px', 
              fontFamily: 'serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {renderRomanNumeral(i)}
          </text>
        );
      } else if (clockFace === 'digital') {
        // No markers for digital
        return null;
      } else if (clockFace === 'minimal') {
        const x1 = centerX + Math.cos(radian) * (radius - 18);
        const y1 = centerY + Math.sin(radian) * (radius - 18);
        
        if (i % 3 === 0) {
          markers.push(
            <circle
              key={i}
              cx={x1}
              cy={y1}
              r="3"
              className="fill-accent/80"
              style={{
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
              }}
            />
          );
        } else {
          const x2 = centerX + Math.cos(radian) * (radius - 12);
          const y2 = centerY + Math.sin(radian) * (radius - 12);
          markers.push(
            <circle
              key={i}
              cx={x2}
              cy={y2}
              r="1.5"
              className="fill-muted-foreground/60"
            />
          );
        }
      } else {
        const markLength = getHourMarkLength(i);
        const x1 = centerX + Math.cos(radian) * (radius - markLength);
        const y1 = centerY + Math.sin(radian) * (radius - markLength);
        const x2 = centerX + Math.cos(radian) * (radius - 8);
        const y2 = centerY + Math.sin(radian) * (radius - 8);
        
        markers.push(
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={`stroke-foreground ${i % 3 === 0 ? 'stroke-[3px]' : 'stroke-[1.5px]'}`}
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))'
            }}
          />
        );

        if (clockFace === 'modern' && i % 3 === 0) {
          const x = centerX + Math.cos(radian) * (radius - 35);
          const y = centerY + Math.sin(radian) * (radius - 35);
          markers.push(
            <text
              key={`num-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-base font-bold"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                textShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {i === 0 ? 12 : i}
            </text>
          );
        }

        if (clockFace === 'luxury' && i % 3 === 0) {
          const x = centerX + Math.cos(radian) * (radius - 32);
          const y = centerY + Math.sin(radian) * (radius - 32);
          markers.push(
            <g key={`luxury-${i}`}>
              <circle
                cx={x}
                cy={y}
                r="18"
                className="fill-card stroke-border stroke-1"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-sm font-bold"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
              >
                {i === 0 ? 12 : i}
              </text>
            </g>
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
          hour: 'stroke-[4px] stroke-foreground',
          minute: 'stroke-[3px] stroke-foreground',
          second: 'stroke-[2px] stroke-accent',
          hourShadow: 'stroke-[6px] stroke-black/10',
          minuteShadow: 'stroke-[5px] stroke-black/10',
          secondShadow: 'stroke-[4px] stroke-black/5'
        };
      case 'modern':
        return {
          hour: 'stroke-[5px] stroke-foreground',
          minute: 'stroke-[3px] stroke-foreground',
          second: 'stroke-[2px] stroke-accent',
          hourShadow: 'stroke-[7px] stroke-black/8',
          minuteShadow: 'stroke-[5px] stroke-black/8',
          secondShadow: 'stroke-[4px] stroke-black/5'
        };
      case 'minimal':
        return {
          hour: 'stroke-[3px] stroke-foreground/90',
          minute: 'stroke-[2px] stroke-foreground/90',
          second: 'stroke-[1px] stroke-accent/80',
          hourShadow: 'stroke-[4px] stroke-black/5',
          minuteShadow: 'stroke-[3px] stroke-black/5',
          secondShadow: 'stroke-[2px] stroke-black/3'
        };
      case 'classic':
        return {
          hour: 'stroke-[4px] stroke-foreground',
          minute: 'stroke-[3px] stroke-foreground',
          second: 'stroke-[1.5px] stroke-accent',
          hourShadow: 'stroke-[6px] stroke-black/8',
          minuteShadow: 'stroke-[5px] stroke-black/8',
          secondShadow: 'stroke-[3px] stroke-black/5'
        };
      default:
        return {
          hour: 'stroke-[3px] stroke-foreground',
          minute: 'stroke-[2px] stroke-foreground',
          second: 'stroke-[1px] stroke-accent',
          hourShadow: 'stroke-[5px] stroke-black/8',
          minuteShadow: 'stroke-[4px] stroke-black/8',
          secondShadow: 'stroke-[3px] stroke-black/5'
        };
    }
  };

  if (clockFace === 'digital') {
    return (
      <div 
        className="flex items-center justify-center bg-gradient-to-br from-card to-muted/20 border-2 rounded-xl shadow-lg backdrop-blur-sm"
        style={{ width: size, height: size }}
      >
        <div className="text-center p-4">
          <div className="text-4xl font-mono font-bold text-foreground tabular-nums tracking-tight mb-2"
               style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {timeInZone.toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {timeInZone.toLocaleDateString('en-US', {
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
  const hourHandLength = radius * 0.45;
  const minuteHandLength = radius * 0.65;
  const secondHandLength = radius * 0.75;

  const hourX = centerX + Math.cos((hourAngle * Math.PI) / 180) * hourHandLength;
  const hourY = centerY + Math.sin((hourAngle * Math.PI) / 180) * hourHandLength;

  const minuteX = centerX + Math.cos((minuteAngle * Math.PI) / 180) * minuteHandLength;
  const minuteY = centerY + Math.sin((minuteAngle * Math.PI) / 180) * minuteHandLength;

  const secondX = centerX + Math.cos((secondAngle * Math.PI) / 180) * secondHandLength;
  const secondY = centerY + Math.sin((secondAngle * Math.PI) / 180) * secondHandLength;

  // Create gradient definitions based on clock face
  const getClockGradient = () => {
    switch (clockFace) {
      case 'luxury':
        return (
          <defs>
            <radialGradient id="clockFace" cx="0.3" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="oklch(1 0 0)" />
              <stop offset="70%" stopColor="oklch(0.98 0.01 240)" />
              <stop offset="100%" stopColor="oklch(0.95 0.02 240)" />
            </radialGradient>
            <radialGradient id="centerDot" cx="0.3" cy="0.3" r="0.7">
              <stop offset="0%" stopColor="oklch(0.4 0.1 240)" />
              <stop offset="100%" stopColor="oklch(0.2 0.1 240)" />
            </radialGradient>
          </defs>
        );
      case 'modern':
        return (
          <defs>
            <radialGradient id="clockFace" cx="0.5" cy="0.5" r="0.8">
              <stop offset="0%" stopColor="oklch(1 0 0)" />
              <stop offset="100%" stopColor="oklch(0.97 0.01 240)" />
            </radialGradient>
            <radialGradient id="centerDot" cx="0.5" cy="0.5" r="0.6">
              <stop offset="0%" stopColor="oklch(0.7 0.15 195)" />
              <stop offset="100%" stopColor="oklch(0.5 0.15 195)" />
            </radialGradient>
          </defs>
        );
      default:
        return (
          <defs>
            <radialGradient id="clockFace" cx="0.4" cy="0.4" r="0.8">
              <stop offset="0%" stopColor="oklch(1 0 0)" />
              <stop offset="100%" stopColor="oklch(0.98 0.01 240)" />
            </radialGradient>
            <radialGradient id="centerDot" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="oklch(0.3 0.1 240)" />
              <stop offset="100%" stopColor="oklch(0.2 0.1 240)" />
            </radialGradient>
          </defs>
        );
    }
  };

  return (
    <div className="relative">
      <svg width={size} height={size} className="text-foreground">
        {getClockGradient()}
        
        {/* Outer ring for luxury style */}
        {clockFace === 'luxury' && (
          <circle
            cx={centerX}
            cy={centerY}
            r={radius - 2}
            className="fill-none stroke-border stroke-4"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
            }}
          />
        )}
        
        {/* Clock face background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius - (clockFace === 'luxury' ? 8 : 6)}
          fill="url(#clockFace)"
          className={`stroke-border ${clockFace === 'luxury' ? 'stroke-2' : 'stroke-1'}`}
          style={{
            filter: clockFace === 'luxury' ? 
              'drop-shadow(0 8px 25px rgba(0,0,0,0.15))' : 
              'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
          }}
        />
        
        {/* Inner decorative ring for luxury */}
        {clockFace === 'luxury' && (
          <circle
            cx={centerX}
            cy={centerY}
            r={radius - 20}
            className="fill-none stroke-border/30 stroke-1"
          />
        )}
        
        {/* Hour markers */}
        {renderHourMarkers()}
        
        {/* Clock hands with shadows */}
        {/* Hour hand shadow */}
        <line
          x1={centerX}
          y1={centerY}
          x2={hourX + 1}
          y2={hourY + 1}
          className={handStyles.hourShadow}
          strokeLinecap="round"
        />
        
        {/* Minute hand shadow */}
        <line
          x1={centerX}
          y1={centerY}
          x2={minuteX + 1}
          y2={minuteY + 1}
          className={handStyles.minuteShadow}
          strokeLinecap="round"
        />
        
        {/* Second hand shadow */}
        <line
          x1={centerX}
          y1={centerY}
          x2={secondX + 0.5}
          y2={secondY + 0.5}
          className={handStyles.secondShadow}
          strokeLinecap="round"
        />
        
        {/* Hour hand */}
        <line
          x1={centerX}
          y1={centerY}
          x2={hourX}
          y2={hourY}
          className={handStyles.hour}
          strokeLinecap="round"
        />
        
        {/* Minute hand */}
        <line
          x1={centerX}
          y1={centerY}
          x2={minuteX}
          y2={minuteY}
          className={handStyles.minute}
          strokeLinecap="round"
        />
        
        {/* Second hand */}
        <line
          x1={centerX}
          y1={centerY}
          x2={secondX}
          y2={secondY}
          className={handStyles.second}
          strokeLinecap="round"
          style={{
            transition: seconds === 0 ? 'none' : 'transform 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        />
        
        {/* Center dot with gradient */}
        <circle
          cx={centerX}
          cy={centerY}
          r={clockFace === 'luxury' ? 6 : clockFace === 'modern' ? 5 : 4}
          fill="url(#centerDot)"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
        />
        
        {/* Center highlight */}
        <circle
          cx={centerX - 1}
          cy={centerY - 1}
          r={clockFace === 'luxury' ? 2 : 1.5}
          className="fill-white/60"
        />
      </svg>
    </div>
  );
}