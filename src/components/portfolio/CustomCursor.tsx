import { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const crosshairRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const hoverState = useRef<'default' | 'link' | 'project'>('default');
  const frameRef = useRef<number>(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };
    const target = e.target as HTMLElement;
    const isLink = target.closest('a, button, [data-cursor="link"]');
    const isProject = target.closest('[data-cursor="project"]');
    hoverState.current = isProject ? 'project' : isLink ? 'link' : 'default';
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      innerPos.current.x += (pos.current.x - innerPos.current.x) * 0.18;
      innerPos.current.y += (pos.current.y - innerPos.current.y) * 0.18;
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.10;
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.10;

      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate(${innerPos.current.x}px, ${innerPos.current.y}px) translate(-50%, -50%)`;
      }

      const state = hoverState.current;
      if (outerRef.current) {
        const isLink = state === 'link';
        const isProject = state === 'project';
        
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) scale(${isProject ? 2.2 : isLink ? 1.5 : 1})`;
        outerRef.current.style.backgroundColor = isProject ? 'rgba(0,232,122,0.15)' : isLink ? 'rgba(0,232,122,0.08)' : 'transparent';
        outerRef.current.style.borderColor = isProject ? 'rgba(0,255,150,0.6)' : isLink ? 'rgba(0,255,150,0.4)' : 'rgba(0,255,150,0.1)';
        
        if (textRef.current) {
          textRef.current.style.opacity = isProject ? '1' : '0';
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [onMouseMove]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div
        ref={crosshairRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-[14px] h-[14px]">
          <div className="absolute top-1/2 left-0 w-full h-px bg-mint" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-mint" />
        </div>
      </div>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none border border-mint/40 transition-[width,height,background-color,border-color] duration-200 flex items-center justify-center text-mint font-mono text-[7px] font-bold tracking-widest uppercase overflow-hidden"
        style={{ width: 32, height: 32, willChange: 'transform' }}
      >
        <span className="opacity-0 transition-opacity duration-200" ref={textRef}>VIEW</span>
      </div>
    </>
  );
};

export default CustomCursor;
