import "./App.css";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./Routes";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
  const MUItheme = createTheme({
    typography: {},
    palette: {
      primary: {
        main: "#00416A",
        contrastText: "#fff",
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MUIThemeProvider theme={MUItheme}>
          <Routes />
        </MUIThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
