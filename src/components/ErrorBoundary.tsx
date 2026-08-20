import React from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("💥 ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#080808",
            color: "#ece9e0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            padding: "2rem",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>💥</span>
          <h1 style={{ fontSize: "1.25rem", color: "#FF6B2B", margin: 0 }}>
            Something crashed
          </h1>
          <pre
            style={{
              fontSize: "0.75rem",
              color: "#888",
              maxWidth: "600px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "#111",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #222",
            }}
          >
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1.5rem",
              background: "#FF6B2B",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "0.85rem",
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
