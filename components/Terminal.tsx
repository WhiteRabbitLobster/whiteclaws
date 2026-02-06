'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TerminalProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  className?: string;
  showLineNumbers?: boolean;
  language?: string;
}

export default function Terminal({
  value,
  onChange,
  label,
  placeholder = '// Paste your code here...',
  rows = 12,
  readOnly = false,
  className,
  showLineNumbers = true,
  language = 'solidity',
}: TerminalProps) {
  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, rows);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
      )}
      
      {/* Terminal Container */}
      <div className="relative rounded-lg overflow-hidden bg-gray-950 border border-gray-800 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-gray-500">
            {language.toLowerCase()}
          </span>
          <div className="w-16" />
        </div>

        {/* Terminal Body */}
        <div className="relative flex">
          {/* Line Numbers */}
          {showLineNumbers && (
            <div className="flex-none w-12 py-3 bg-gray-900/50 border-r border-gray-800 text-right select-none">
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i + 1}
                  className="px-2 text-xs font-mono text-gray-600 leading-6"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}

          {/* Code Editor */}
          <div className="flex-1 relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              readOnly={readOnly}
              spellCheck={false}
              className={cn(
                'w-full py-3 px-4 bg-gray-950 text-gray-300 font-mono text-sm',
                'resize-none focus:outline-none focus:ring-0',
                'placeholder-gray-600',
                'leading-6',
                readOnly && 'cursor-default'
              )}
              style={{
                minHeight: `${rows * 1.5}rem`,
                lineHeight: '1.5rem',
              }}
              rows={rows}
            />
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-gray-900/30 border-t border-gray-800 text-xs">
          <span className="text-gray-500 font-mono">
            {value.length} chars • {lines.length} lines
          </span>
          <span className="text-gray-600">
            {readOnly ? 'Read Only' : 'Editing'}
          </span>
        </div>
      </div>
    </div>
  );
}

// Read-only terminal for preview
interface TerminalPreviewProps {
  code: string;
  language?: string;
  className?: string;
  title?: string;
}

export function TerminalPreview({
  code,
  language = 'solidity',
  className,
  title = 'Proof of Concept',
}: TerminalPreviewProps) {
  const lines = code.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    return (
      <div className={cn(
        'relative rounded-lg overflow-hidden bg-gray-950 border border-gray-800',
        className
      )}>
        <div className="px-4 py-2 bg-gray-900 border-b border-gray-800">
          <span className="text-xs font-medium text-gray-400">{title}</span>
        </div>
        <div className="p-8 text-center text-gray-500 text-sm">
          <p>No code provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'relative rounded-lg overflow-hidden bg-gray-950 border border-gray-800',
      className
    )}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <span className="text-xs font-medium text-gray-400">{title}</span>
        <span className="text-xs font-mono text-gray-500">{language}</span>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
