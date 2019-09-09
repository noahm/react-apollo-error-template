import React from "react";

export class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>ErrorBoundary caught an error.</h1>
          <pre>
            <code>
              {this.state.error.message}
              <br />
              {this.state.error.stack}
            </code>
          </pre>
          <button
            type="button"
            onClick={() => {
              this.setState({ error: null });
            }}
          >
            Try again
          </button>
        </>
      );
    }

    return this.props.children;
  }
}
