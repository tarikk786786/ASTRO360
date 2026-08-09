import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Error Boundary Exception:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] bg-[#0B1220] flex items-center justify-center p-6 text-left font-sans text-white">
          <div className="max-w-xl w-full p-8 rounded-3xl bg-[#111827] border border-amber-500/40 shadow-2xl space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Cosmic Alignment Recovered</h3>
                <p className="text-xs text-slate-400 font-mono pt-1">
                  An unexpected exception occurred in this view. The rest of your application state remains safe.
                </p>
              </div>
            </div>

            {this.state.error && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold">
                  <Terminal className="w-4 h-4" />
                  <span>{this.state.error.name || 'Error'}: {this.state.error.message}</span>
                </div>
                {this.state.errorInfo?.componentStack && (
                  <div>
                    <button
                      onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                      className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer pt-1"
                    >
                      {this.state.showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      {this.state.showDetails ? 'Hide Stack Trace' : 'View Stack Trace'}
                    </button>
                    {this.state.showDetails && (
                      <pre className="mt-2 p-3 rounded-xl bg-black/60 text-[10px] font-mono text-slate-300 overflow-x-auto max-h-48 border border-slate-800 leading-relaxed">
                        {this.state.error.stack || this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null, showDetails: false })}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <RefreshCw className="w-4 h-4" /> Reset View Telemetry
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-semibold transition-all cursor-pointer"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
