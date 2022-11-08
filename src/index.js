import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./components/redux/redux-store";
import StoreContext from "./StoreContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </React.StrictMode>
  );
};

renderEntireTree(store.getState());
store.subscribe(() => {
  let state = store.getState();
  renderEntireTree(state);
});

reportWebVitals();
