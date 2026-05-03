import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          textAlign: 'center', 
          padding: '1rem',
          color: 'var(--text-secondary)'
        }}>
          <div>🎭</div>
          <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Image not available
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;