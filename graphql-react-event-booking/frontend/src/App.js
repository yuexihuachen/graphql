import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavition from "./components/Navigation/MainNavigation";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavition />
        <main className="main-content">
          <Routes>
            <Route path="/" Component={AuthPage} />
            <Route path="/auth" Component={AuthPage} />
            <Route path="/events" Component={EventsPage} />
            <Route path="/bookings" Component={BookingsPage} />
          </Routes>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
