import React from "react";
import ReactDom from "react-dom";
import "@fontsource/lato";

import App from "./App";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";

//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";

const THEME = createTheme({
  typography: {
    fontFamily: `"Lato", sans-serifs`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const AppWithTheme = () => (
  <MuiThemeProvider theme={THEME}>
    <App />
  </MuiThemeProvider>
);

// const store = createStore(reducers, compose(applyMiddleware(thunk)));

// const ReduxApp = () => (
//   <Provider store={store}>
//     <AppWithTheme />
//   </Provider>
// );

ReactDom.render(<AppWithTheme />, document.getElementById("app"));
