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
        <div className="min-h-screen bg-radar-bg flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-radar-signal/30 to-radar-accent/30 border border-radar-grid flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl" role="img" aria-label="Warning">⚠</span>
            </div>
            <h1 className="text-xl font-display font-bold text-radar-text-primary mb-3">Something went wrong</h1>
            <p className="text-radar-text-muted text-sm mb-6">An unexpected error occurred. Please refresh the page to continue.</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-radar-signal text-radar-bg font-semibold rounded-xl hover:bg-radar-signal/90 transition-colors min-h-[48px] min-w-[48px]"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
