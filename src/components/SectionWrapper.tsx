import type { FC, ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  isRevealed?: boolean;
  snapZone?: boolean;
}

export const SectionWrapper: FC<SectionWrapperProps> = ({
  id,
  children,
  className = '',
  isActive = false,
  isRevealed = false,
  snapZone = true
}) => {
  return (
    <section
      id={id}
      data-section={id}
      className={`relative w-full ${
        snapZone ? 'min-h-[80vh] py-16 md:py-24' : ''
      } transition-all duration-1000 ease-out ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-85'
      } ${isActive ? 'ring-1 ring-emerald-500/10' : ''} ${className}`}
      style={{
        scrollMarginTop: '80px',
        contain: 'layout paint'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-0 pointer-events-none" aria-hidden="true" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0 pointer-events-none" aria-hidden="true" />
    </section>
  );
};

