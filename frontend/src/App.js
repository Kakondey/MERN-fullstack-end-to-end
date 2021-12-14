import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";import Layout from "./components/Layout";
import Events from "./pages/Events";
import Categories from "./pages/Categories";
import Locations from "./pages/Locations";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={ <Layout><Events /></Layout>} />
          <Route path='/categories' element={<Layout><Categories /></Layout>} />
          <Route path='/locations' element={<Layout><Locations /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
