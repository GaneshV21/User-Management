import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import appRoutes from "./router/route";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>{appRoutes}</Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
