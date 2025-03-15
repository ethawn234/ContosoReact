import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

import Orders from "./pages/Orders"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Orders />
    </QueryClientProvider>
  )
}

export default App
