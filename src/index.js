import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter, Route, Routes,Link } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './Main';
import WelcomePage from './WelcomePage';
import { createTheme, ThemeProvider } from '@mui/material';
import { green, grey, orange, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    grey: {
      main: grey[700],
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = "DIPA Visualization";
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/DIPA_visualization' element={<WelcomePage/>}>
          </Route>
          <Route path='/DIPA_visualization/visualization' element={<Main/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
