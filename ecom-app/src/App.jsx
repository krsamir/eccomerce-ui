import "./App.css";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./Routes";
import setupAxiosInterceptors from "./components/Authentication/interceptor";
import { GlobalProvider } from "@store";
import { ThemeProvider } from "@emotion/react";
import "./i18/Internationalization";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

setupAxiosInterceptors();

function App() {
  const MUItheme = createTheme({
    typography: {},
    palette: {
      primary: {
        main: "#58855C",
        contrastText: "#fff",
        // 00416a5d
      },
    },
  });

  const theme = {
    p: "#adebb3",
    p1: "#9EB8A0",
    p2: "#58855C",
    p4: "#0D3311",
  };

  return (
    <>
      <GlobalProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <MUIThemeProvider theme={MUItheme}>
              <ReactQueryDevtools initialIsOpen={false} />
              <Routes />
              <Toaster />
            </MUIThemeProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
