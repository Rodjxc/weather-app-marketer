import { QueryClient, QueryClientProvider } from "react-query";
import { Main } from "./components/Layout/Main";

export const App = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <div>
        <Main />
      </div>
    </QueryClientProvider>
  );
};
