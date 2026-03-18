import { Component, type ErrorInfo, type ReactNode } from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[500px] w-full flex flex-col items-center justify-center p-8 text-center bg-white">
          <div className="bg-red-50 p-6 rounded-full mb-6">
            <FaExclamationTriangle className="text-red-500 text-6xl" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-poppins">
            Waduh, ada masalah teknis nih!
          </h1>
          <p className="text-gray-600 max-w-md mb-8">
            Terjadi kesalahan yang tidak terduga dalam aplikasi. Jangan khawatir, tim kami akan segera memperbaikinya.
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-teal-500/25 active:scale-95"
          >
            <FaRedo className="text-sm" />
            Muat Ulang Halaman
          </button>
          
          {process.env.NODE_ENV === 'development' && (
             <div className="mt-12 p-4 bg-gray-100 rounded text-left overflow-auto max-w-2xl w-full">
                <p className="font-mono text-xs text-red-600">{this.state.error?.toString()}</p>
             </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
