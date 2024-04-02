import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './assets/css/styles.css';
import './assets/css/generalComponents.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  /* Antes estaba el <> en <React.StrictMode></React.StrictMode> 
esto hace que se renderice dos la aplicacion */
  <>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>
);
