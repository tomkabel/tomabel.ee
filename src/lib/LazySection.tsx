import { useEffect, useRef, useState, ComponentType, createElement } from 'react';

interface LazySectionProps {
  loader: () => Promise<{ default: ComponentType }>;
  placeholder?: React.ReactNode;
  preloadMargin?: number;
  skeletonHeight?: number;
}

function SectionSkeleton({ height }: { height: number }) {
  return (
    <div
      className="bg-radar-bg animate-pulse"
      style={{ height }}
      aria-hidden="true"
    />
  );
}

export function LazySection({
  loader,
  placeholder,
  preloadMargin = 400,
  skeletonHeight,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [Module, setModule] = useState<ComponentType | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loader()
          .then((mod) => setModule(() => mod.default))
          .catch((err) => {
            console.error('Failed to load section:', err);
            setModule(null);
          });
      },
      { rootMargin: `${preloadMargin}px` },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loader, preloadMargin]);

  return (
    <div ref={ref}>
      {Module
        ? createElement(Module)
        : (placeholder ?? <SectionSkeleton height={skeletonHeight ?? 400} />)}
    </div>
  );
}
