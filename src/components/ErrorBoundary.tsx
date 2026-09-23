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
  override state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="grid min-h-screen place-items-center bg-background px-6">
          <div className="grid max-w-md gap-y-4">
            <p className="label text-danger">Runtime fault</p>
            <h1 className="font-display text-4xl text-foreground">Something went wrong</h1>
            <p className="mb-4 text-muted">An unexpected error occurred. Please refresh the page to continue.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-fit"
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
