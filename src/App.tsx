import React, { useState, useEffect } from 'react';
import { Clock, ArrowCounterClockwise } from '@phosphor-icons/react';
import { AnimatePresence } from 'framer-motion';
import { useKV } from '@github/spark/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnalogClock } from '@/components/AnalogClock';
import { TimezoneSelect } from '@/components/TimezoneSelect';
import { ClockFaceSelector } from '@/components/ClockFaceSelector';
import { getCurrentTimezone, getFormattedTimezoneLabel } from '@/lib/timezone';
import { ClockFaceType } from '@/lib/clockTypes';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const detectedTimezone = getCurrentTimezone();
  const [userTimezone, setUserTimezone] = useKV('user-timezone', detectedTimezone);
  const [targetTimezone, setTargetTimezone] = useKV('target-timezone', 'UTC');
  const [clockFace, setClockFace] = useKV<ClockFaceType>('clock-face', 'classic');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Clock size={32} className="text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Timezone Converter</h1>
          </div>
          <p className="text-muted-foreground">
            Compare times across different zones with beautiful clock faces
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-6">
          {/* Timezone Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Your Timezone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <TimezoneSelect
                    value={userTimezone}
                    onValueChange={setUserTimezone}
                    placeholder="Choose your timezone..."
                  />
                  {userTimezone !== detectedTimezone && (
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Detected: {getFormattedTimezoneLabel(detectedTimezone)}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUserTimezone(detectedTimezone)}
                        className="h-7 px-2 text-xs"
                      >
                        <ArrowCounterClockwise size={12} className="mr-1" />
                        Reset
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Target Timezone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TimezoneSelect
                  value={targetTimezone}
                  onValueChange={setTargetTimezone}
                  placeholder="Choose a timezone to compare..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Clock Face Selector */}
          <Card>
            <CardContent className="pt-6">
              <ClockFaceSelector
                selectedFace={clockFace}
                onFaceChange={setClockFace}
              />
            </CardContent>
          </Card>
        </div>

        {/* Digital Time Display */}
        <div className="mb-8 grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Your Time
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {getFormattedTimezoneLabel(userTimezone)}
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-mono font-bold tabular-nums text-foreground">
                {currentTime.toLocaleTimeString('en-US', {
                  timeZone: userTimezone,
                  hour12: true,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {currentTime.toLocaleDateString('en-US', {
                  timeZone: userTimezone,
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Target Time
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {getFormattedTimezoneLabel(targetTimezone)}
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-mono font-bold tabular-nums text-foreground">
                {currentTime.toLocaleTimeString('en-US', {
                  timeZone: targetTimezone,
                  hour12: true,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {currentTime.toLocaleDateString('en-US', {
                  timeZone: targetTimezone,
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analog Clocks */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Local Clock */}
          <Card className="text-center">
            <CardContent className="flex justify-center pt-8 pb-8">
              <AnimatePresence mode="wait">
                <AnalogClock
                  key={`local-${clockFace}`}
                  time={currentTime}
                  timezone={userTimezone}
                  clockFace={clockFace}
                  size={240}
                />
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Target Clock */}
          <Card className="text-center">
            <CardContent className="flex justify-center pt-8 pb-8">
              <AnimatePresence mode="wait">
                <AnalogClock
                  key={`target-${clockFace}`}
                  time={currentTime}
                  timezone={targetTimezone}
                  clockFace={clockFace}
                  size={240}
                />
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;