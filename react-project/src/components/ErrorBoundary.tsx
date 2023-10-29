import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<{
  children: ReactNode;
}> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-8 flex flex-col gap-6 items-center bg-slate-300 h-screen">
          <h1 className="text-2xl font-bold">
            Something went wrong. Please try again later.
          </h1>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
