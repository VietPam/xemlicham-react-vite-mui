// src/react-app/App.tsx

// We will import these later once we set up the store and theme
// import { Provider } from "react-redux";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import { store } from "./app/store";
// import { theme } from "./theme/theme";

function App() {
  return (
    // <Provider store={store}>
      // <ThemeProvider theme={theme}>
        // <CssBaseline />
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <h1>Lunar Calendar Platform</h1>
          <p>MUI + Redux + Lunar Engine skeleton is ready.</p>
          
          {/* Example of how you'll call your Hono backend later in Phase 5 */}
          {/* <button onClick={() => fetch("/api/").then(res => res.json()).then(console.log)}>
            Test Hono API
          </button> 
          */}
        </div>
      // </ThemeProvider>
    // </Provider>
  );
}

export default App;