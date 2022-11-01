import "normalize.css";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainBlock from "./components/MainBlock/MainBlock";
import { BrowserRouter } from "react-router-dom";
import store from "./components/redux/state";

const App = ({ state, dispatch}) => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <MainBlock
            state={state}
            dispatch={dispatch}
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
