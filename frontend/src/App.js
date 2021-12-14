import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";import Layout from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Categories from "./pages/Categories";
import Locations from "./pages/Locations";

function App() {
  return (
    <BrowserRouter>
      <Layout>
          <Routes>
              <Route path='/' element={<Events />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/locations' element={<Locations />} />
          </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
