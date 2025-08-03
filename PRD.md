# Timezone Converter App

Create an intuitive dual-clock timezone converter that helps users easily compare times across different timezones with beautiful, customizable clock faces.

**Experience Qualities**:
1. **Intuitive** - Users should instantly understand how to select timezones and read both clocks without confusion
2. **Elegant** - Clean, sophisticated design with beautiful clock faces that feel premium and delightful to use  
3. **Responsive** - Seamless experience across desktop and mobile with clocks that adapt gracefully to screen sizes

**Complexity Level**: Light Application (multiple features with basic state)
- Combines timezone detection, clock rendering, timezone selection, and visual customization with persistent user preferences

## Essential Features

**Automatic Timezone Detection**
- Functionality: Detect and display user's current timezone automatically on app load
- Purpose: Eliminates setup friction and provides immediate context for comparisons
- Trigger: App initialization
- Progression: App loads → Browser timezone detected → Current timezone displayed in left clock
- Success criteria: User's local timezone is correctly identified and labeled

**Dual Clock Display**
- Functionality: Show two synchronized analog clocks side-by-side displaying current time in different timezones
- Purpose: Visual time comparison without mental math or conversion
- Trigger: App load and timezone selection changes
- Progression: Timezone selected → Clock face updates → Time displays in real-time → Visual sync maintained
- Success criteria: Both clocks show accurate current time, update every second, remain synchronized

**Timezone Selection Interface**
- Functionality: Searchable dropdown with grouped major world timezones for easy selection
- Purpose: Quick access to commonly needed timezone conversions
- Trigger: User clicks timezone selector
- Progression: Click selector → Dropdown opens → Type to search or browse → Select timezone → Clock updates immediately
- Success criteria: Users can find any major timezone within 3 seconds, selection updates target clock instantly

**Clock Face Customization**
- Functionality: 5 distinct clock face styles (Classic, Modern, Minimal, Digital, Luxury)
- Purpose: Personalization and visual preference accommodation
- Trigger: User clicks style selector
- Progression: Click style button → Preview styles → Select preferred style → Both clocks update → Preference saved
- Success criteria: Style changes apply to both clocks immediately, preference persists between sessions

**Real-time Updates**
- Functionality: Clocks tick every second showing live current time
- Purpose: Always accurate time display for real-world usage
- Trigger: Continuous timer
- Progression: App starts → Timer initialized → Clocks update every second → Time stays current
- Success criteria: Time never appears stale, smooth second hand movement, no performance issues

## Edge Case Handling

- **Timezone Data Failure**: Fallback to UTC if timezone detection fails, show warning message
- **Invalid Selections**: Prevent selection of duplicate timezones, show helpful messaging
- **Performance**: Optimize clock rendering to prevent battery drain on mobile devices
- **Daylight Saving**: Handle DST transitions automatically with correct time adjustments
- **Network Issues**: App works offline once loaded, timezone data cached locally

## Design Direction

The design should feel sophisticated and trustworthy like a luxury timepiece - elegant, precise, and premium. Clean minimal interface that puts focus on the beautiful clocks while maintaining professional utility for business users.

## Color Selection

Analogous color scheme using deep blues and teals to evoke trust, precision, and professionalism while maintaining visual harmony.

- **Primary Color**: Deep Navy (oklch(0.25 0.1 240)) - Professional, trustworthy, main brand identity
- **Secondary Colors**: Steel Blue (oklch(0.45 0.08 235)) for backgrounds and Teal Accent (oklch(0.55 0.12 200)) for highlights
- **Accent Color**: Bright Teal (oklch(0.7 0.15 195)) - Attention-grabbing for interactive elements and clock hands
- **Foreground/Background Pairings**: 
  - Background (Light Gray oklch(0.98 0.01 240)): Dark Navy text (oklch(0.25 0.1 240)) - Ratio 12.8:1 ✓
  - Card (White oklch(1 0 0)): Dark Navy text (oklch(0.25 0.1 240)) - Ratio 15.2:1 ✓
  - Primary (Deep Navy oklch(0.25 0.1 240)): White text (oklch(1 0 0)) - Ratio 15.2:1 ✓
  - Accent (Bright Teal oklch(0.7 0.15 195)): White text (oklch(1 0 0)) - Ratio 8.1:1 ✓

## Font Selection

Typography should convey precision and clarity like technical instruments - clean, highly legible sans-serif that works well for both UI text and time displays.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Clock Labels): Inter Semibold/18px/normal spacing
  - Body (UI Text): Inter Regular/16px/relaxed line height
  - Time Display: Inter Medium/24px/tabular numbers for consistent digit width
  - Small Labels: Inter Regular/14px/subtle color

## Animations

Subtle, purposeful animations that enhance the premium timepiece feeling - smooth transitions that feel mechanical and precise rather than bouncy or playful.

- **Purposeful Meaning**: Smooth clock hand movements and gentle transitions reinforce the precision and quality of a fine timepiece
- **Hierarchy of Movement**: Clock hands have priority with smooth sweeping motion, UI transitions are subtle and quick to not distract from time reading

## Component Selection

- **Components**: 
  - Card components for clock containers with subtle shadows
  - Select component with search for timezone picker
  - Button variants for clock face selection
  - Badge components for timezone labels
  - Custom clock SVG components for the 5 different faces
- **Customizations**: 
  - Custom analog clock components with SVG rendering
  - Enhanced Select component with timezone search and grouping
  - Custom time display formatting for different regions
- **States**: 
  - Buttons: Subtle hover states with color shifts, pressed states with slight scale
  - Clocks: Smooth second hand animation, hover states showing timezone info
  - Selectors: Clear focus states, smooth dropdown animations
- **Icon Selection**: Clock icons for face selection, globe icon for timezone, settings gear for customization
- **Spacing**: Generous padding (p-6) around clocks, consistent gap-4 between elements, responsive margins
- **Mobile**: Stacked clock layout on mobile, larger touch targets for controls, simplified interface maintaining full functionality