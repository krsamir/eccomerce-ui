import "./App.css";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
  const MUItheme = createTheme({
    typography: {},
    palette: {
      primary: {
        main: "#8844BB",
        contrastText: "#fff",
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MUIThemeProvider theme={MUItheme}></MUIThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
