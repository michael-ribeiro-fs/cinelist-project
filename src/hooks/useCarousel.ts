import { useState, useEffect, useCallback } from 'react';

interface UseCarouselOptions {
  total: number;
  interval?: number;       // em ms, se não fornecido não faz autoplay
  autoPlay?: boolean;     // se true e interval definido, começa automático
}

export function useCarousel({ total, interval = 60000, autoPlay = true }: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    // normaliza o índice para ficar dentro do range [0, total-1]
    const normalized = ((index % total) + total) % total;
    setCurrentIndex(normalized);
  }, [total]);

  const next = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || !interval || isPaused || total === 0) return;

    const timer = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, next, total]);

  return {
    currentIndex,
    goTo,
    next,
    prev,
    isPaused,
    setIsPaused,
  };
}