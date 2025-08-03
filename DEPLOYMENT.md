# Deployment Guide

## Pushing to Repository

### If you already have a Git repository:
```bash
git add .
git commit -m "Add timezone converter PWA with persistent state"
git push origin main
```

### If you need to initialize a new repository:
```bash
git init
git add .
git commit -m "Initial commit: timezone converter PWA"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## Deployment Options

### 1. Netlify (Recommended for PWAs)
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Netlify will automatically handle PWA features

### 2. Vercel
1. Connect your GitHub repository to Vercel
2. Framework preset: Vite
3. Automatic deployments on push

### 3. GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use GitHub Actions for automated builds
3. Deploy from `gh-pages` branch

## PWA Considerations
- Your app is already PWA-ready with manifest and service worker
- Icons are included in the public directory
- Offline functionality is enabled
- Install prompts are implemented

## Build Process
```bash
npm run build
```
This creates an optimized production build in the `dist` directory.