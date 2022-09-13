import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "./screen/unauthenticated-app/index";
import { AuthenticatedApp } from "./screen/authenticated-app/index";
import { FullPageErrorFallback } from "components/lib";
import { ErrorBoundary } from "components/error-boundary";

const App = () => {
  const { token } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
};

export default App;
