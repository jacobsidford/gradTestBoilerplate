import React from 'react';

type ErrorBoundaryState = { hasError: boolean; error?: Error };

export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error('App error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="bg-white border border-red-200 text-red-800 rounded p-6">
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <p className="text-sm mt-2">{this.state.error?.message}</p>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}
