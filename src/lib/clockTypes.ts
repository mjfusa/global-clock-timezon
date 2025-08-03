export type ClockFaceType = 'classic' | 'modern' | 'minimal' | 'digital' | 'luxury';

export interface ClockFaceOption {
  id: ClockFaceType;
  name: string;
  description: string;
}

export const CLOCK_FACES: ClockFaceOption[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional Roman numerals'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean geometric design'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple dots and lines'
  },
  {
    id: 'digital',
    name: 'Digital',
    description: 'Digital time display'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Elegant with detailed markers'
  }
];