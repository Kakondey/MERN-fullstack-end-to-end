import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom"; import Layout from "./components/Layout";
import Events from "./pages/Events";
import Categories from "./pages/Categories";
import Locations from "./pages/Locations";
import Login from "./pages/Login";
import { useEffect, useState } from 'react';
// import jwt from "jwt-decode"
import DashboardLayoutRoute from './components/DashboardLayout';
import EventForm from './components/forms/EventForm';
import Home from './pages/Home';
import generalApi from './apis/generalApi';
import { EventsContext } from './contexts/EventsContext';
import EventDetails from './components/details/EventDetails';
import axiosInstance from './apis/authorizedApis';
import { categoriesContext, locationsContext } from './contexts/otherContext';

const RequireAuth = ({ children }) => {
  let auth = sessionStorage.getItem("token") ? true : false;
  let location = useLocation()



  return auth ? (children) : (<Navigate to="/login" state={{ from: location }} />);
}

function App() {
  // const user_id = jwt(sessionStorage.getItem("token"))
  // console.log(user_id.exp)
  // const now = Math.ceil(Date.now() / 1000);
  // console.log(user_id.exp > now)
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const eventsRes = await generalApi.get("/events")
        setEvents(eventsRes.data)

        const categoriesRes = await axiosInstance.get("/categories")
        setCategories(categoriesRes.data)

        const locationsRes = await axiosInstance.get("/locations")
        setLocations(locationsRes.data)


      } catch (err) {
        console.log(err)
      }

    })()

  }, [])


  return (
    <BrowserRouter>
      <EventsContext.Provider value={{ events, setEvents }}>
        <categoriesContext.Provider value={{ categories, setCategories }}>
          <locationsContext.Provider value={{ locations, setLocations }}>
            <Routes>
              <Route path="/login" element={<Login />} exact />
              <Route path='/' element={<Layout><Events /></Layout>} exact />
              <Route path='/dashboard' element={<RequireAuth><Home /></RequireAuth>} exact />
              <Route path="/event-details/:id" element={<Layout><EventDetails /></Layout>} exact />
              <Route path='/categories' element={<RequireAuth><Layout><Categories /></Layout></RequireAuth>} exact />
              <Route path='/locations' element={<RequireAuth><Layout><Locations /></Layout></RequireAuth>} exact />
            </Routes>
          </locationsContext.Provider>
        </categoriesContext.Provider>
      </EventsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
