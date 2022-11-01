import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./components/redux/state";

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App
          state={state}
        addPost={store.addPost.bind(store)}
        updateNewPostText={store.updateNewPostText.bind(store)}
      />
    </React.StrictMode>
  );
};

renderEntireTree(store.getState());
store.subscriber(renderEntireTree);

reportWebVitals();
