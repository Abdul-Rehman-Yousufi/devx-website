import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '../../lib/utils';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Magnetic = ({ children, className, disabled = false }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;

    const { current: el } = ref;
    if (!el) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    gsap.to(el, {
      x: deltaX * 0.3,
      y: deltaY * 0.3,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      className={cn('transition-transform duration-300 ease-out will-change-transform', className)}
    >
      {children}
    </div>
  );
};
