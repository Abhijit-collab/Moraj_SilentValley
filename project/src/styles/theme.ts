export const colors = {
  primary: {
    main: '#1a1a1a',
    light: '#2a2a2a',
    dark: '#000000',
  },
  secondary: {
    main: '#ffffff',
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(255, 255, 255, 0.7)',
  },
  gradients: {
    hero: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
    heroOverlay: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)',
    darkSection: 'linear-gradient(to bottom, #0a0a0a 0%, #000000 100%)',
    lightSection: 'linear-gradient(to bottom, #333333 0%, #1a1a1a 100%)',
    feature: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
  },
};

export const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  stagger: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { staggerChildren: 0.2 },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    },
  },
  slideIn: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const spacing = {
  section: {
    padding: '8rem 0',
    margin: '0',
  },
};

export const transitions = {
  default: 'all 0.3s ease-in-out',
  slow: 'all 0.5s ease-in-out',
  fast: 'all 0.2s ease-in-out',
}; 