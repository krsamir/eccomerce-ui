import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb; /* gray-50 */
  padding: 1rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem;
  background: #ffffff;
  border-radius: 1rem; /* rounded-2xl */
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  margin: 0 auto 1rem;
  border-radius: 9999px;
  background-color: #fee2e2; /* red-100 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827; /* gray-900 */
`;

const Description = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563; /* gray-600 */
  line-height: 1.5;
`;

const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const BaseButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #2563eb; /* blue-600 */
  color: #ffffff;

  &:hover {
    background-color: #1d4ed8; /* blue-700 */
  }
`;

const SecondaryButton = styled(BaseButton)`
  background-color: #e5e7eb; /* gray-200 */
  color: #111827;

  &:hover {
    background-color: #d1d5db; /* gray-300 */
  }
`;

const Details = styled.details`
  margin-top: 1.5rem;
  text-align: left;

  summary {
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 500;
    color: #374151; /* gray-700 */
  }

  pre {
    margin-top: 0.5rem;
    padding: 0.75rem;
    font-size: 0.75rem;
    color: #b91c1c; /* red-700 */
    background-color: #f3f4f6; /* gray-100 */
    border-radius: 0.5rem;
    overflow-x: auto;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    console.log(
      "🚀 ~ ErrorBoundary ~ getDerivedStateFromError ~ error:",
      error
    );
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // Optional: send to logging service (Sentry, LogRocket, etc.)
    console.error("ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Wrapper>
        <Card>
          <IconWrapper>⚠️</IconWrapper>

          <Title>Something went wrong</Title>

          <Description>
            We encountered an unexpected issue while loading this page. This is
            on us — please try again or refresh the page.
          </Description>

          <Actions>
            <PrimaryButton onClick={this.handleRetry}>Try again</PrimaryButton>

            <SecondaryButton onClick={() => window.location.reload()}>
              Reload page
            </SecondaryButton>
          </Actions>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <Details>
              <summary>Technical details (dev only)</summary>
              <pre>
                {this.state.error.toString()}
                {"\n"}
                {this.state.errorInfo?.componentStack}
              </pre>
            </Details>
          )}
        </Card>
      </Wrapper>
    );
  }
}

export default ErrorBoundary;
