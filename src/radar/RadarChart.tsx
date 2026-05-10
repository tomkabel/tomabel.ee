import { useEffect, useRef, useState } from 'react';
import type { CapabilityAxis } from './types';

interface Props {
  axes: CapabilityAxis[];
  size?: number;
  className?: string;
  onAxisFocus?: (id: string) => void;
}

export default function RadarChart({ axes, size = 400, className, onAxisFocus }: Props) {
  const [animated, setAnimated] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const polyRef = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;
  const labelRadius = radius + 28;

  const axisAngles = axes.map((_, i) => (Math.PI * (i * 60 - 90)) / 180);

  // Grid rings (3 rings: 33%, 66%, 100%)
  const rings = [0.33, 0.66, 1.0];

  // Compute polygon points
  const points = axes
    .map((axis, i) => {
      const angle = axisAngles[i];
      const r = (animated || reducedMotion) ? radius * axis.value : 0;
      return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Capability radar chart showing expertise across 6 domains"
    >
      {/* Grid rings */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={axes
            .map((_, i) => {
              const angle = axisAngles[i];
              const r = radius * ring;
              return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
            })
            .join(' ')}
          fill="none"
          stroke="#1a1a2e"
          strokeWidth={1}
        />
      ))}

      {/* Radial axis lines */}
      {axes.map((_, i) => {
        const angle = axisAngles[i];
        return (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={cx + radius * Math.cos(angle)}
            y2={cy + radius * Math.sin(angle)}
            stroke="#1a1a2e"
            strokeWidth={1}
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        ref={polyRef}
        points={points}
        fill="url(#radarGrad)"
        stroke="#00D4FF"
        strokeWidth={2}
        style={
          reducedMotion
            ? {}
            : {
                strokeDasharray: 1000,
                strokeDashoffset: animated ? 0 : 1000,
                transition: 'stroke-dashoffset 1.5s ease-out',
              }
        }
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.05} />
        </linearGradient>
      </defs>

      {/* Axis labels and interactive points */}
      {axes.map((axis, i) => {
        const angle = axisAngles[i];
        const lx = cx + labelRadius * Math.cos(angle);
        const ly = cy + labelRadius * Math.sin(angle);
        const px = cx + radius * axis.value * Math.cos(angle);
        const py = cy + radius * axis.value * Math.sin(angle);
        const isLeft = Math.cos(angle) < 0;

        return (
          <g key={axis.id}>
            {/* Interactive point */}
            <circle
              cx={px}
              cy={py}
              r={4}
              fill="#00D4FF"
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`${axis.label.en}, value ${Math.round(axis.value * 10)} out of 10`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onAxisFocus?.(axis.id); }}
              onClick={() => onAxisFocus?.(axis.id)}
            />
            {/* Label */}
            <text
              x={lx}
              y={ly}
              textAnchor={isLeft ? 'end' : 'start'}
              fill="#94A3B8"
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
              className="pointer-events-none"
            >
              {axis.label.en}
            </text>
          </g>
        );
      })}

      {/* Screen reader data table (hidden) */}
      <g aria-hidden="true" style={{ display: 'none' }}>
        <text>
          {axes.map((a) => `${a.label.en}: ${Math.round(a.value * 10)}/10`).join(', ')}
        </text>
      </g>
    </svg>
  );
}
