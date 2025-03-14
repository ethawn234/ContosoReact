import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

import Orders from "./Pages/Orders"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Orders />
    </QueryClientProvider>
  )
}

export default App
