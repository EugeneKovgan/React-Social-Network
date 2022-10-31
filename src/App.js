import "normalize.css";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainBlock from "./components/MainBlock/MainBlock";
import { BrowserRouter } from "react-router-dom";
import { updateNewPostText } from "./components/redux/state";

const App = ({ dialogsData, addPost }) => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <MainBlock
          dialogsData={dialogsData}
          addPost={addPost}
          updateNewPostText={updateNewPostText}
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
