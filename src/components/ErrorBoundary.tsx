import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * A React Error Boundary component that intercepts unhandled exceptions in its child tree.
 * It isolates the failure and displays an elegant system fallback UI to the user.
 */
export class ErrorBoundary extends React.Component<Props, State> {

  public state: State = {
    hasError: false,
    error: null,
  };

  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.fallbackUI) {
        return this.fallbackUI;
      }
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <div className="w-full p-8 bg-error-container/10 border border-error text-error flex flex-col items-center justify-center text-center gap-4 my-8 rounded scanline-overlay">
          <span className="material-symbols-outlined text-4xl text-error animate-pulse">warning</span>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">SYSTEM FAULT DETECTED</h3>
            <p className="text-[10px] font-mono uppercase text-on-surface-variant/80 leading-tight max-w-md">
              An isolated operational component has experienced a critical runtime termination. Operational telemetry has been recorded.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest border border-error hover:bg-error/20 transition-colors"
          >
            REBOOT MODULE
          </button>
        </div>
      );
    }

    return this.props.children;
  }

  private get fallbackUI(): ReactNode {
    return null;
  }
}

export default ErrorBoundary;
