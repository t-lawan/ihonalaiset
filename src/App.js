import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { configureStore, createStore } from "redux";
import { reducer } from "./Store/reducer";
import Home from "./Components/Pages/Home";
import { Provider } from "react-redux";
const preloadedState = {};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
