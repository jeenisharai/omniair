import { useEffect, useState, useRef, useCallback } from 'react';

export function useScrollDiscipline() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isFastScrolling, setIsFastScrolling] = useState<boolean>(false);
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set(['home']));

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const fastScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Monitor scroll velocity and position
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const timeDelta = Math.max(now - lastScrollTime.current, 1);
      const distDelta = Math.abs(currentScrollY - lastScrollY.current);
      const velocity = distDelta / timeDelta; // px per ms

      setIsScrolled(currentScrollY > 40);

      // Fast scroll threshold: 1.2 px/ms skips complex transitions
      if (velocity > 1.2) {
        setIsFastScrolling(true);
        document.body.classList.add('skip-motion');

        if (fastScrollTimer.current) clearTimeout(fastScrollTimer.current);
        fastScrollTimer.current = setTimeout(() => {
          setIsFastScrolling(false);
          document.body.classList.remove('skip-motion');
        }, 160);
      }

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (fastScrollTimer.current) clearTimeout(fastScrollTimer.current);
    };
  }, []);

  // IntersectionObserver to lock focus to only ONE section per viewport
  useEffect(() => {
    const sectionIds = [
      'home',
      'platform',
      'live-intelligence',
      'bio-mesh',
      'explainability',
      'impact'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible entries sorted by intersection ratio
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // Choose the one occupying the most viewport
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const currentId = visible[0].target.id;
          setActiveSection(currentId);

          // Rule 6: Latch revealed sections so animations never replay on reverse scroll
          setRevealedSections((prev) => {
            if (prev.has(currentId)) return prev;
            const next = new Set(prev);
            next.add(currentId);
            return next;
          });
        }
      },
      {
        root: null,
        rootMargin: '-10% 0px -25% 0px',
        threshold: [0.1, 0.3, 0.6]
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isRevealed = useCallback(
    (id: string) => revealedSections.has(id),
    [revealedSections]
  );

  return {
    activeSection,
    isScrolled,
    isFastScrolling,
    isRevealed
  };
}

