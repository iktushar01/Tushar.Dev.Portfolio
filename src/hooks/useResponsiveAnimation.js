import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useResponsiveAnimation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isReducedMotion = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });

  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    if (isMobile) setDeviceType('mobile');
    else if (isTablet) setDeviceType('tablet');
    else setDeviceType('desktop');
  }, [isMobile, isTablet]);

  const getResponsiveDelay = (baseDelay = 0, multiplier = 0.1) => {
    if (isReducedMotion) return 0;
    switch (deviceType) {
      case 'mobile': return baseDelay;
      case 'tablet': return baseDelay + (multiplier * 1);
      case 'desktop': return baseDelay + (multiplier * 2);
      default: return baseDelay;
    }
  };

  const getResponsiveStagger = (baseStagger = 0.05) => {
    if (isReducedMotion) return 0;
    switch (deviceType) {
      case 'mobile': return baseStagger * 0.5;
      case 'tablet': return baseStagger * 0.8;
      case 'desktop': return baseStagger;
      default: return baseStagger;
    }
  };

  const getResponsiveSpeed = (baseSpeed = 40) => {
    switch (deviceType) {
      case 'mobile': return baseSpeed * 0.7;
      case 'tablet': return baseSpeed * 0.85;
      case 'desktop': return baseSpeed;
      default: return baseSpeed;
    }
  };

  const getResponsiveScale = (baseScale = 1.05) => {
    if (isReducedMotion) return 1;
    switch (deviceType) {
      case 'mobile': return baseScale * 0.8;
      case 'tablet': return baseScale * 0.9;
      case 'desktop': return baseScale;
      default: return baseScale;
    }
  };

  const getResponsiveDuration = (baseDuration = 0.6) => {
    if (isReducedMotion) return 0;
    switch (deviceType) {
      case 'mobile': return baseDuration * 0.8;
      case 'tablet': return baseDuration * 0.9;
      case 'desktop': return baseDuration;
      default: return baseDuration;
    }
  };

  return { 
    deviceType, 
    isReducedMotion, 
    getResponsiveDelay, 
    getResponsiveStagger,
    getResponsiveSpeed,
    getResponsiveScale,
    getResponsiveDuration
  };
};
