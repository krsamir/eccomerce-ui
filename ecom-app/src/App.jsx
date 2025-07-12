import "./App.css";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./Routes";
import setupAxiosInterceptors from "./components/Authentication/interceptor";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});
setupAxiosInterceptors();
function App() {
  const MUItheme = createTheme({
    typography: {},
    palette: {
      primary: {
        main: "#00416A",
        contrastText: "#fff",
        // 00416a5d
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MUIThemeProvider theme={MUItheme}>
          <Routes />
          <Toaster />
        </MUIThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
