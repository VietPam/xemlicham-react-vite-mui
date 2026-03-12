import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "@/app/store";
import { theme } from "@/theme/theme";
import { CalendarTable } from "@/features/calendar/components/CalendarTable";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CalendarTable />
      </ThemeProvider>
    </Provider>
  );
}

export default App;