import "./App.css";
import "./styles/evsStyle.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom"; // changed import statement
import MainContainer from "./MainContainer";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
