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
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">Something went wrong</h1>
            <p className="text-slate-400">Please refresh the page</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
