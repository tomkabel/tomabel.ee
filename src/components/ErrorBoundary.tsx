import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-[#030407] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--accent-magenta)] to-[var(--accent-cyan)] flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-white">⚠</span>
            </div>
            <h1 className="text-2xl text-white mb-4 font-bold" style={{ fontFamily: 'Unbounded, sans-serif' }}>System Error</h1>
            <p className="text-[var(--text-secondary)]">Please refresh the page</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
