'use client';

import { cn } from '@/lib/utils';

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  selectable?: boolean;
  selected?: boolean;
  onClick?: (severity: SeverityLevel) => void;
  className?: string;
}

const severityConfig = {
  critical: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/50',
    text: 'text-red-400',
    ring: 'ring-red-500',
    shadow: 'shadow-red-500/20',
    label: 'Critical',
  },
  high: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/50',
    text: 'text-orange-400',
    ring: 'ring-orange-500',
    shadow: 'shadow-orange-500/20',
    label: 'High',
  },
  medium: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    text: 'text-yellow-400',
    ring: 'ring-yellow-500',
    shadow: 'shadow-yellow-500/20',
    label: 'Medium',
  },
  low: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/50',
    text: 'text-green-400',
    ring: 'ring-green-500',
    shadow: 'shadow-green-500/20',
    label: 'Low',
  },
  info: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/50',
    text: 'text-blue-400',
    ring: 'ring-blue-500',
    shadow: 'shadow-blue-500/20',
    label: 'Info',
  },
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

export default function SeverityBadge({
  severity,
  size = 'md',
  selectable = false,
  selected = false,
  onClick,
  className,
}: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <button
      type="button"
      onClick={() => onClick?.(severity)}
      disabled={!selectable}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-lg border transition-all duration-200',
        config.bg,
        config.border,
        config.text,
        sizes[size],
        selectable && 'cursor-pointer hover:scale-105',
        selectable && selected && `ring-2 ${config.ring} ${config.shadow} shadow-lg`,
        selectable && !selected && 'hover:brightness-125',
        !selectable && 'cursor-default',
        className
      )}
    >
      {config.label}
    </button>
  );
}

// Severity selector component for forms
interface SeveritySelectorProps {
  value: SeverityLevel;
  onChange: (severity: SeverityLevel) => void;
  label?: string;
  className?: string;
}

export function SeveritySelector({
  value,
  onChange,
  label = 'Severity',
  className,
}: SeveritySelectorProps) {
  const severities: SeverityLevel[] = ['critical', 'high', 'medium', 'low', 'info'];

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-3">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="flex flex-wrap gap-3">
        {severities.map((severity) => (
          <SeverityBadge
            key={severity}
            severity={severity}
            size="lg"
            selectable
            selected={value === severity}
            onClick={onChange}
          />
        ))}
      </div>
    </div>
  );
}
