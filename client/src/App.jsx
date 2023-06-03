import { useEffect, useState } from "react";
import "./css/Navbar.css";
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CircularProgress,
} from "@mui/material";

//redux
import { useSelector } from "react-redux";

/* toast */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/App.css";
import "./css/BCardFooter.css";

import useLoggedIn from "./hooks/useLoggedIn";
import Router from "./routes/Router";
import NavBar from "./components/Navbar/Navbar";
import BCardFooter from "./components/Footer/BCardFooter";

// import MuiNavbar from "./components/Navbar/MuiNavbar";
// import Router from "./routes/Router";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const loggedIn = useLoggedIn();

  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);

  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container>
        <header>
          <NavBar />
        </header>
        <main>{isLoading ? <CircularProgress /> : <Router />}</main>

        <footer>
          <BCardFooter />
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
