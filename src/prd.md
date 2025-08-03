# Timezone Converter - Product Requirements Document

## Core Purpose & Success
- **Mission Statement**: Enable users to easily compare times across different timezones with beautiful, customizable analog and digital clocks.
- **Success Indicators**: Users can quickly understand time differences, customize their experience, and use the tool efficiently for scheduling across timezones.
- **Experience Qualities**: Elegant, Intuitive, Precise

## Project Classification & Approach
- **Complexity Level**: Light Application (multiple features with basic state)
- **Primary User Activity**: Acting (selecting timezones and comparing times)

## Essential Features

### Timezone Selection & Override
- **User Timezone Override**: Users can override their detected timezone with manual selection
- **Target Timezone Selection**: Intuitive dropdown with search and categorization
- **Auto-detection Fallback**: Shows detected timezone when user overrides their selection
- **Reset Functionality**: Quick reset button to return to detected timezone
- **Persistent Preferences**: Timezone selections saved between sessions using hybrid KV + cookie storage

### Data Persistence & Reliability
- **Hybrid Storage**: Primary KV storage with cookie fallback for maximum reliability
- **Cross-Session Persistence**: User preferences maintained across browser sessions
- **PWA Support**: Full Progressive Web App capabilities with offline functionality
- **Service Worker Caching**: App works offline with cached resources and data
- **Install Prompts**: Smart installation suggestions for supported browsers
- **Graceful Degradation**: Continues working even if one storage method fails or offline

### Dual Clock Display
- **Digital Time Display**: Large, readable digital clocks with date information
- **Analog Clock Display**: Beautiful analog clocks with multiple face styles
- **Real-time Updates**: Clocks update every second automatically
- **Synchronized Display**: Both clocks always show the current moment in their respective timezones

### Clock Face Customization
- **5 Clock Face Options**: Classic, Modern, Minimal, Retro, and Elegant styles
- **Animated Transitions**: Smooth transitions when switching between clock faces
- **Persistent Selection**: User's preferred clock face saved between sessions

### Layout & Navigation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **PWA Installation**: Can be installed as a native-like app on mobile and desktop
- **Offline Functionality**: Core features work without internet connection
- **Network Status**: Visual feedback when offline with cached data notice
- **Clear Visual Hierarchy**: Digital clocks positioned above analog clocks for better readability
- **Intuitive Controls**: All timezone and style selections easily accessible

## Design Direction

### Visual Tone & Identity
- **Emotional Response**: Professional confidence with subtle elegance
- **Design Personality**: Clean, sophisticated, and functional
- **Visual Metaphors**: Traditional timepieces meet modern digital precision
- **Simplicity Spectrum**: Minimal interface that lets the clocks be the stars

### Color Strategy
- **Color Scheme Type**: Monochromatic with subtle blue accents
- **Primary Color**: Deep navy blue (oklch(0.25 0.1 240)) - conveys trust and precision
- **Secondary Colors**: Lighter blue tones for supporting elements
- **Accent Color**: Sky blue (oklch(0.7 0.15 195)) - highlights interactive elements
- **Color Psychology**: Blues evoke reliability and professionalism, perfect for time-critical tools
- **Foreground/Background Pairings**: 
  - Background (oklch(0.98 0.01 240)) with Foreground (oklch(0.25 0.1 240)) - 16.8:1 contrast
  - Card (oklch(1 0 0)) with Card Foreground (oklch(0.25 0.1 240)) - 17.9:1 contrast
  - Primary (oklch(0.25 0.1 240)) with Primary Foreground (oklch(1 0 0)) - 17.9:1 contrast

### Typography System
- **Font Pairing Strategy**: Inter for all text - clean, highly legible, and modern
- **Typographic Hierarchy**: Bold headings, medium body text, mono for time display
- **Font Personality**: Professional, clean, and internationally accessible
- **Which fonts**: Inter (400, 500, 600, 700 weights)
- **Legibility Check**: Inter is specifically designed for UI legibility at all sizes

### Visual Hierarchy & Layout
- **Attention Direction**: Digital times draw initial attention, analog clocks provide beautiful context
- **Grid System**: Card-based layout with consistent spacing and alignment
- **Responsive Approach**: Stacked mobile layout, side-by-side desktop layout
- **Content Density**: Generous white space allows focus on time information

### Animations
- **Purposeful Meaning**: Smooth transitions between clock faces create continuity
- **Hierarchy of Movement**: Clock face changes are the primary animated element
- **Contextual Appropriateness**: Subtle, functional animations that don't distract from time reading

### UI Elements & Component Selection
- **Component Usage**: Cards for organization, Select dropdowns for timezone selection, custom analog clocks
- **Component Customization**: Clean card styling with subtle shadows and rounded corners
- **Spacing System**: Consistent 8px grid system using Tailwind's spacing scale
- **Mobile Adaptation**: Cards stack vertically, maintain touch-friendly sizing

## Implementation Considerations
- **Scalability Needs**: Easy to add new clock faces and timezone features
- **Testing Focus**: Timezone accuracy, clock synchronization, responsive design
- **Critical Questions**: Are all timezone calculations accurate across DST transitions?

## Recent Updates
- Added ability for users to override their detected timezone with manual selection
- Shows detected timezone as reference when user overrides
- Maintains persistent timezone preferences across sessions
- Improved user control over their timezone display
- **Added Progressive Web App (PWA) support** with:
  - Service worker for offline functionality and caching
  - Web app manifest for native-like installation
  - Install prompts and update notifications
  - Network status indicators for offline mode
  - App icons and splash screen support